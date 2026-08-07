import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const authToken = await prisma.authToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    if (!authToken || authToken.type !== "EMAIL_VERIFY") {
      return NextResponse.json(
        { error: "Invalid or expired verification token." },
        { status: 400 }
      );
    }

    if (new Date() > authToken.expiresAt) {
      // Clean up expired token
      await prisma.authToken.delete({ where: { id: authToken.id } });
      return NextResponse.json(
        { error: "Verification token has expired. Please request a new verification email." },
        { status: 400 }
      );
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: authToken.userId },
      data: { emailVerified: new Date() },
    });

    // Invalidate / delete used token
    await prisma.authToken.delete({ where: { id: authToken.id } });

    return NextResponse.json({
      success: true,
      message: "Email address verified successfully! You can now log in to your account.",
    });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during email verification." },
      { status: 500 }
    );
  }
}
