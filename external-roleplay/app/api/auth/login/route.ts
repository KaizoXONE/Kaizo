import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { createToken, setSession } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const connection = await pool.getConnection();

    try {
      const [users] = await connection.query(
        'SELECT id, username, email, password, admin_level FROM users WHERE username = ?',
        [validatedData.username]
      );

      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        );
      }

      const user = users[0] as any;

      const isPasswordValid = await bcrypt.compare(
        validatedData.password,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        );
      }

      await connection.query(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );

      await connection.query(
        'INSERT INTO logs (user_id, action, description, ip_address, created_at) VALUES (?, ?, ?, ?, NOW())',
        [user.id, 'login', 'User logged in successfully', request.ip || 'unknown']
      );

      const token = await createToken({
        id: user.id,
        username: user.username,
        email: user.email,
        admin_level: user.admin_level,
      });

      await setSession(token);

      return NextResponse.json({
        success: true,
        message: 'Login berhasil!',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          admin_level: user.admin_level,
        },
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
