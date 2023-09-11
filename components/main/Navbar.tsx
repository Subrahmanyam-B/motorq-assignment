import Link from "next/link";

interface User {
  role: string;
  userName: string;
}

interface Props {
  user: User;
}

const Navbar = ({ user }: Props) => {
  console.log(user);

  return (
    <div className="p-7 text-xl flex justify-between">
      {user.role === "admin" ? (
        <div>Admin Dashboard</div>
      ) : (
        <div>Customer Dashboard</div>
      )}

      <div className="text-sm flex itmes-center justify-center"><span className="font-bold my-auto px-2">Hey 👋, </span><span className="font-bold my-auto pr-4">{user.userName}</span>  <Link href="/api/auth/signout" className="p-2 rounded-lg bg-primary text-white"> logout</Link></div>
    </div>
  );
};

export default Navbar;
