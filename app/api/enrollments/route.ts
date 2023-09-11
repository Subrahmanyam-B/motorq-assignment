import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(options);

    const user = await prismadb.user.findUnique({
      where: {
        userName: session?.user?.userName,
      },
    });

    const userId = user?.id;

    const role = user?.role;

    if (session?.user?.userName && role === "customer") {
      const enrollments = await prismadb.enrollment.findMany({
        where: {
          createdBy: userId,
        },
        include: {
          vehicle: true,
        },
      });
      return NextResponse.json(enrollments);
    } else if (session?.user?.userName && role === "admin") {
      const enrollments = await prismadb.enrollment.findMany({
        include: {
          vehicle: true,
        },
      });
      return NextResponse.json(enrollments);
    }
  } catch (error) {
    console.log("[ENROLLMENT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    const session = await getServerSession(options);
    if (session?.user?.userName && session?.user?.role === "admin" && id) {
      const deleteEnrollment = await prismadb.enrollment.delete({
        where: {
          id,
        },
      });
      return NextResponse.json(deleteEnrollment);
    }
  } catch (error) {
    console.log("[ENROLLMENT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { vehicleId, createdBy } = await request.json();

    const session = await getServerSession(options);
    // if (session?.user?.userName && session?.user?.role === "customer") {
      const createEnrollment = await prismadb.enrollment.create({
        data: {
          vehicleId,
          createdBy,
          status: "pending",
        },
      });
      return NextResponse.json(createEnrollment);
    // }
  } catch (error) {
    console.log("[ENROLLMENT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
