import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth-config";

export async function GET() {
  try {
    const session = await auth();
    const isNextAuthAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin === true;

    const cookieStore = await cookies();
    const adminSessionCookie = cookieStore.get("timepetal_admin_session");

    if (isNextAuthAdmin || !!adminSessionCookie?.value) {
      return NextResponse.json({
        authorized: true,
        email: session?.user?.email || process.env.ADMIN_EMAIL || "priyanku060@gmail.com",
      });
    }

    return NextResponse.json({ authorized: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authorized: false }, { status: 500 });
  }
}
