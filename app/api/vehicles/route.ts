import { getServerSession } from "next-auth";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequestWithAuth) {
  try {
    const { VIN, Make, Model, Year } = await request.json();

    const session = await getServerSession(options);
    if (session?.user?.userName && session?.user?.role === "admin") {
      const createVehicle = await prismadb.vehicle.create({
        data: {
          VIN,
          Make,
          Model,
          Year,
        },
      });
      return NextResponse.json(createVehicle);
    }
  } catch (error) {
    console.log("[VEHICLES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(options);

    if (session?.user?.userName) {
      const vehicles = await prismadb.vehicle.findMany();
      return NextResponse.json(vehicles);
    }
  } catch (error) {
    console.log("[VEHICLES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    const session = await getServerSession(options);
    if (session?.user?.userName && session?.user?.role === "admin" && id) {
      const deleteVehicle = await prismadb.vehicle.delete({
        where: {
          id,
        },
      });
      return NextResponse.json(deleteVehicle);
    }
  } catch (error) {
    console.log("[VEHICLES_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
