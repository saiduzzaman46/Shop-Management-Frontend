import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json(); // Use JSON, not formData
    // body should have oldPassword, newPassword, confirmPassword

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/password/update`,
      body,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err: any) {
    console.error(
      "PATCH /api/seller/updatepassword error:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { message: err.response?.data?.message || "Internal Server Error" },
      { status: err.response?.status || 500 }
    );
  }
}
