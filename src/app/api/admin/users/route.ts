import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin;
    const adminKey = req.headers.get("x-admin-key");
    const validKey = process.env.ADMIN_SECRET_KEY || "timepetal-master-admin-key";

    if (!isAdmin && adminKey !== validKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const users = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { email: { contains: search } },
              { name: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        isPremium: true,
        isAdmin: true,
        createdAt: true,
        _count: {
          select: { entries: true, moods: true, letters: true },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to query users" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin;
    const adminKey = req.headers.get("x-admin-key");
    const validKey = process.env.ADMIN_SECRET_KEY || "timepetal-master-admin-key";

    if (!isAdmin && adminKey !== validKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, isPremium, isAdmin: targetAdmin } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(typeof isPremium === "boolean" ? { isPremium } : {}),
        ...(typeof targetAdmin === "boolean" ? { isAdmin: targetAdmin } : {}),
      },
      select: { id: true, email: true, isPremium: true, isAdmin: true },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin;
    const adminKey = req.headers.get("x-admin-key");
    const validKey = process.env.ADMIN_SECRET_KEY || "timepetal-master-admin-key";

    if (!isAdmin && adminKey !== validKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
