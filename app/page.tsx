"use client";

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/main/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  // const createUser = async () => {
  //   await prismadb.user.create({
  //     data: {
  //       userName: 'Subbu',
  //       password: '123456',
  //       role : 'admin'
  //     }
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // createUser();
  const { data: session, status } = useSession();

  if(session?.user?.role !== 'admin') redirect('/enrollments')


  return (
    <main className="flex w-full ">
        <div>Home</div>
    </main>
  );
}
