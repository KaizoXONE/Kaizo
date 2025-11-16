import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { createToken, setSession } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6),
  character_name: z.string().min(3).max(100),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const connection = await pool.getConnection();

    try {
      const [existingUsers] = await connection.query(
        'SELECT id FROM users WHERE username = ? OR email = ?',
        [validatedData.username, validatedData.email]
      );

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return NextResponse.json(
          { error: 'Username atau email sudah terdaftar' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const [result] = await connection.query(
        `INSERT INTO users (username, password, email, character_name, money, level, created_at) 
         VALUES (?, ?, ?, ?, 5000, 1, NOW())`,
        [
          validatedData.username,
          hashedPassword,
          validatedData.email,
          validatedData.character_name,
        ]
      );

      const insertResult = result as any;
      const userId = insertResult.insertId;

      await connection.query(
        'INSERT INTO logs (user_id, action, description, ip_address, created_at) VALUES (?, ?, ?, ?, NOW())',
        [userId, 'register', 'User registered successfully', request.ip || 'unknown']
      );

      const token = await createToken({
        id: userId,
        username: validatedData.username,
        email: validatedData.email,
        admin_level: 0,
      });

      await setSession(token);

      return NextResponse.json({
        success: true,
        message: 'Registrasi berhasil! Selamat datang di EXTERNAL RP',
        user: {
          id: userId,
          username: validatedData.username,
          email: validatedData.email,
          character_name: validatedData.character_name,
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

    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}
