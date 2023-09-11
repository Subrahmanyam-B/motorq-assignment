"use client"

import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Products from "/public/assets/category.svg";
import Home from "/public/assets/home.svg";
import Category from "/public/assets/dashboard.svg";
import Subject from "/public/assets/subject.svg";
import HomeActive from "/public/assets/home-active.svg";
import ProductsActive from "/public/assets/products-active.svg";
import CategoryActive from "/public/assets/categories-active.svg";
import SubjectActive from "/public/assets/subcategories-active.svg";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";

const Sidebar = () => {

  const menu = [
    {
      name: "Home",
      icon: Home,
      iconActive: HomeActive,
      link: "/",
    },
    {
      name: "Vehicles",
      icon: Products,
      iconActive: ProductsActive,
      link: "/vehicles",
    },
    {
      name: "Enrollments",
      icon: Category,
      iconActive: CategoryActive,
      link: "/category",
    },
    {
      name: "Customers",
      icon: Subject,
      iconActive: SubjectActive,
      link: "/customers",
    },
  ];


  const [showSubMenu, setShowSubMenu] = useState(true);

  let menuRef = useRef(null);



  const pathname = usePathname();
  const [currentUrl , setCurrentUrl] = useState("")

  useEffect(()=>{
   setCurrentUrl(pathname);
   console.log(pathname);
  })

  return (
    <div className="bg-white   border-r">
      <aside className="w-20 2xl:w-24">
        <div className="p-6 mb-5">
          <Image alt="image" src={Logo} />
        </div>
        <div className="px-4">
          {menu.map((item, index) => (
            <div
              key={index}
              className={`p-[12px] 2xl:p-5 flex items-center justify-center ${
                currentUrl === item.link
                  ? "bg-primary transition-all duration-300 ease-in-out rounded-lg"
                  : ""
              }`}
            >
              <Link href={item.link}>
                {currentUrl === item.link ? (
                  <Tooltip tooltip={item.name}>
                    <Image alt="image" src={item.iconActive} />
                  </Tooltip>
                ) : (
                  <Tooltip tooltip={item.name}>
                    <Image alt="image" src={item.icon} />
                  </Tooltip>
                )}
              </Link>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
