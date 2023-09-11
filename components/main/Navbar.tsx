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

      <div className="text-sm flex itmes-center justify-center">Hey 👋, <span className="font-bold">{user.userName}</span> </div>
    </div>
  );
};

export default Navbar;
