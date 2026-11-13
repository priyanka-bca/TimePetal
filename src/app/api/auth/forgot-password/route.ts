import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();

    // Rate limiting: 3 attempts per 15 mins per IP/email
    const rateLimit = await checkRateLimit(`forgot:${cleanEmail}:${ip}`, 3, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Too many password reset requests. Please try again in ${rateLimit.resetInSeconds} seconds.` },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // Always return generic message to prevent email enumeration
    const genericSuccess = {
      success: true,
      message: "If an account exists with that email, we have sent instructions to reset your password.",
    };

    if (!user) {
      return NextResponse.json(genericSuccess);
    }

    // Delete existing password reset tokens for this user
    await prisma.authToken.deleteMany({
      where: {
        userId: user.id,
        type: "PASSWORD_RESET",
      },
    });

    // Generate 1-hour expiration token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.authToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        type: "PASSWORD_RESET",
        expiresAt,
      },
    });

    await sendPasswordResetEmail(cleanEmail, rawToken);

    return NextResponse.json(genericSuccess);
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "An error occurred processing your password reset request." },
      { status: 500 }
    );
  }
}
