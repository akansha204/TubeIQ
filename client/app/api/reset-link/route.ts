import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import sendEmail from '@/app/utils/emailService';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, token, newPassword } = body;

        if (email && !token && !newPassword) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (!existingUser) {
                return NextResponse.json({ message: 'Email not found' }, { status: 404 });
            }

            const token = jwt.sign(
                { email: existingUser.email },
                process.env.JWT_USER_SECRET!,
                { expiresIn: '15m' }
            );

            const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

            await sendEmail(
                email,
                'Reset your TubeIQ Password',
                `
          <p>Hello,</p>
          <p>Click here to reset your password:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>This link will expire in 15 minutes.</p>
        `
            );

            return NextResponse.json({ message: 'Reset link sent to email.' }, { status: 200 });
        }

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
