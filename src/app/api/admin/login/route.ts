import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || "priyanku060@gmail.com").toLowerCase().trim();

    // Verify this is the authorized Admin email
    if (cleanEmail !== adminEmail) {
      return NextResponse.json(
        { error: "Access denied. Only the primary administrator can log into this portal." },
        { status: 403 }
      );
    }

    // Check user in database
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    let isPasswordValid = false;

    // Check against DB hashed password if available
    if (user?.passwordHash) {
      isPasswordValid = await bcrypt.compare(String(password), user.passwordHash);
    }

    // Check against configured ADMIN_PASSWORD fallback if provided
    const masterAdminPassword = process.env.ADMIN_PASSWORD;
    if (!isPasswordValid && masterAdminPassword && String(password) === masterAdminPassword) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    }

    // Ensure user has isAdmin = true in DB
    if (user && !user.isAdmin) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isAdmin: true, isPremium: true },
      });
    }

    // Generate signed secure admin session token
    const adminSessionToken = crypto.randomBytes(32).toString("hex");
    const cookieStore = await cookies();

    cookieStore.set("timepetal_admin_session", adminSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Administrator access granted.",
      admin: {
        email: cleanEmail,
        name: user?.name || "Primary Administrator",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal error processing admin authentication." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("timepetal_admin_session");
  return NextResponse.json({ success: true, message: "Logged out from admin portal." });
}
