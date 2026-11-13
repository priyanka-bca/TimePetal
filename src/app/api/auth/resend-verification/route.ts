import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();

    // Rate limiting: 1 attempt per 60 seconds per email
    const rateLimit = await checkRateLimit(`resend:${cleanEmail}`, 1, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Please wait ${rateLimit.resetInSeconds} seconds before requesting another email.` },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // To prevent email enumeration, return generic success message even if email not found or already verified
    if (!user || user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "If an unverified account with that email exists, a verification link has been sent.",
      });
    }

    // Delete previous verification tokens for this user
    await prisma.authToken.deleteMany({
      where: {
        userId: user.id,
        type: "EMAIL_VERIFY",
      },
    });

    // Create new token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.authToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        type: "EMAIL_VERIFY",
        expiresAt,
      },
    });

    await sendVerificationEmail(cleanEmail, rawToken);

    return NextResponse.json({
      success: true,
      message: "If an unverified account with that email exists, a verification link has been sent.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to resend verification email." },
      { status: 500 }
    );
  }
}
