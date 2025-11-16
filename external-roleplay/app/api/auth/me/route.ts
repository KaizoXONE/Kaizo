import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const connection = await pool.getConnection();

    try {
      const [users] = await connection.query(
        `SELECT id, username, email, character_name, money, bank_money, level, exp, 
         playtime, admin_level, vip_level, vip_expire, skin_id, job, faction, 
         phone_number, last_login, created_at 
         FROM users WHERE id = ?`,
        [session.id]
      );

      if (!Array.isArray(users) || users.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        user: users[0],
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
