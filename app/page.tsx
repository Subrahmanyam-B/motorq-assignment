import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";


export default async function  Home() {

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
  console.log("Session" , session)


  return (
    <main>This is the Home page

      <button className='bg-gray-600 p-4 rounded-lg' >Sign Out</button>
      <div>{session?.user?.role ? session?.user?.role : "None"}</div>
    </main>
  )
}
