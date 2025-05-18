import { NextResponse } from "next/server"; // helps sending JSON responses
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid';


// Step 1: Define Zod schema for input validation
const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Step 2: POST request handler
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Step 3: Validate input using zod
        const parsed = signupSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, password } = parsed.data;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Step 4: Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists." },
                { status: 400 }
            );
        }

        // Step 5: Hash password securely
        const hashedPassword = await hash(password, 12);

        // Step 6: Create user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                accounts: {
                    create: {
                        type: 'credentials',
                        provider: 'email',
                        providerAccountId: uuidv4(),
                    }
                }
            },
            include: {
                accounts: true,
            }
        });

        // Step 7: Return success
        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("[SIGNUP_ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
