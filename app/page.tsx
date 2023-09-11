import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/main/Navbar";

export default async function Home() {
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

  const session = await getServerSession(options);

  return (
    <main className="flex w-full">
      <div className="w-full">
        <Navbar user={session?.user} />
        <div>{session?.user?.role ? session?.user?.role : "None"}</div>
      </div>
    </main>
  );
}
