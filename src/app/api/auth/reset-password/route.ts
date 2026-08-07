import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password, confirmPassword } = body;

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Token, new password, and password confirmation are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character.",
        },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const authToken = await prisma.authToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    if (!authToken || authToken.type !== "PASSWORD_RESET") {
      return NextResponse.json(
        { error: "Invalid or expired password reset link." },
        { status: 400 }
      );
    }

    if (new Date() > authToken.expiresAt) {
      await prisma.authToken.delete({ where: { id: authToken.id } });
      return NextResponse.json(
        { error: "Password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(password, 12);

    // Update user password and mark provider if needed
    await prisma.user.update({
      where: { id: authToken.userId },
      data: {
        passwordHash: newPasswordHash,
        provider: authToken.user.provider === "google" ? "both" : authToken.user.provider,
      },
    });

    // Invalidate reset token and user sessions
    await prisma.authToken.delete({ where: { id: authToken.id } });
    await prisma.session.deleteMany({ where: { userId: authToken.userId } });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while resetting your password." },
      { status: 500 }
    );
  }
}
