import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
   request: Request,
){
   try {

      const body = await request.json();

      const {userName , password , role} = body;

      const user = await prismadb.user.create({
         data : {
            userName,
            password,
            role,
         }
      })

      return NextResponse.json(user);


   }catch(error){
      console.log('[VEHICLES_POST]', error);
      return new NextResponse(`Internal Server Error ${error}`, {status: 500})
   }
}

export async function GET(
   request: Request,
){
   try {

      const users = await prismadb.user.findMany();

      return NextResponse.json(users);

   }catch(error){
      console.log('[USERS_GET]', error);
      return new NextResponse(`Internal Server Error ${error}`, {status: 500})
   }
}

