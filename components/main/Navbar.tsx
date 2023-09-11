import Link from "next/link"

interface Props {
  user : Object
}

const Navbar = ({user} : Props) => {
  return (
    <div className='bg-blue-300 p-7 text-xl flex justify-between'>Navbar <Link className='bg-gray-600 p-2 text-white text-sm rounded-lg' href='/api/auth/signout'>Sign Out</Link></div>
  )
}

export default Navbar