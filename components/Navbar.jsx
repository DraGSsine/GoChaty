import React, {  useContext, useState } from "react";
import Image from "next/image";
import Logo from "/public/GoChatyLogo.png";
import Link from "next/link";
import { Heart, Home, Messages } from "@/public/Icons";
import Search from "./Search";
import BurgerBtn from "./BurgerBtn";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import SideBar from "./LeftSideBar/SideBar";

function Navbar() {
  const {ShowSideBar,setShowSideBar}=useContext(SelectedChatContext)

  return (
    <nav className="bg-[#1A1A1A] gap-5 md:flex-row flex justify-between h-[8vh] border-b lg:border-none md:h-[13vh] px-10 items-center">
      <BurgerBtn/>
      <div className="w-[33%] hidden md:inline-flex">
        <Link href="/">
          <Image alt="logo" src={Logo} width={85} height={85} />
        </Link>
      </div>
      <ul className="flex md:mr-4 lg:space-x-5 space-x-5 lg:w-[33%]">
        <li className="h-10 w-8 cursor-pointer text-[#5b2dc3]">
          <Link href="/">
            <Home />
          </Link>
        </li>
        <li className="h-10 w-8 cursor-pointer text-[#5b2dc3]">
          <Link href="/messages">
            <Messages />
          </Link>
        </li>
        <li className="h-10 w-8 cursor-pointer text-[#5b2dc3]">
          <Link href="/save">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#5b2dc3"
              className="h-8 w-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </Link>
        </li>
      </ul>
      <div className=" hidden md:flex">
      <Search/>
      </div>

      <div className=" md:hidden">
            {
        ShowSideBar&&<SideBar/>
      }
      
      </div>

    </nav>
  );
}

export default Navbar;
