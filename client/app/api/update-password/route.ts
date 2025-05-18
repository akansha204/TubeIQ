import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { token, newPassword } = body;

        // Validate input
        if (!token || !newPassword) {
            return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_USER_SECRET!);
        } catch (err) {
            console.error('Token verification error:', err);
            return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
        }

        if (!decoded.email) {
            return NextResponse.json({ message: 'Invalid token format' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: decoded.email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email: decoded.email },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password reset successful.' }, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


