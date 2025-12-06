import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params first
    const { id } = await params;

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/product/deleteproduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: res.status }
    );
  } catch (err: any) {
    console.error("Delete proxy error:", err.response?.data || err.message);

    return NextResponse.json(
      { message: err.response?.data?.message || "Delete failed" },
      { status: err.response?.status || 500 }
    );
  }
}
