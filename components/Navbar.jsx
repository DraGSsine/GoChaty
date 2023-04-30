import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/public/GoChatyLogo.png";
import Link from "next/link";
import { Heart, Home, Messages, Notificaion, Search } from "@/public/Icons";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/Firebase/firebase";
import AddFriend from "./AddFriend";

function Navbar() {
  const [searchInput,setSearchInput]=useState('')
  const [users, setUsers] = useState([]);
  const [IsLoading, setIsloading] = useState(false);
  const HandleSearchForFriends = async (e) => {
    setSearchInput(e.target.value)
    setIsloading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      allUsers.push(doc.data());
    });
    setUsers(
      allUsers.filter((user) => user.userName.startsWith(e.target.value||' ') && user.uuid != auth.currentUser.uid)
    );
    setIsloading(false);
  }
  return (
    <nav className=" bg-[#1A1A1A] flex-col gap-5 md:flex-row justify-center flex md:justify-between h-[13vh] px-5 items-center">
      <div className="w-[33%] hidden md:inline-flex">
        <Image alt="logo" src={Logo} width={100} height={100} />
      </div>
      <ul className="flex space-x-5 w-[33%] justify-center">
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
          <Link href="/notification">
            <Notificaion />
          </Link>
        </li>
        <li className="h-10 w-8 cursor-pointer text-[#5b2dc3]">
          <Link href="/Save">
            <Heart />
          </Link>
        </li>
      </ul>
      <div className=" w-full md:w-[33%] relative flex justify-center md:justify-end">
        <div className=" flex items-center px-3 border-2 w-4/6  rounded-xl overflow-hidden border-[#5b2dc3]">
          <i className=" inline-block w-7 text-[#5b2dc3]">
            <Search />
          </i>
          <input
            onChange={HandleSearchForFriends}
            type="text"
            placeholder="Search For Friend"
            className="px-3 outline-none w-full py-2 bg-inherit text-white"
          />
        </div>
        {searchInput && (
          <div className="absolute top-12 space-y-4 p-2 rounded-xl bg-white w-4/6">
            {
              users.length ? users.map((user,index) =>
              IsLoading ? (
                <div key={index} className="flex items-center">
                  <div className="w-[60px] h-[60px] mr-2 bg-gray-500 rounded-full"></div>
                  <div className="flex-grow bg-gray-500 rounded-lg h-[50px]"></div>
                </div>
              ) : (
                <AddFriend
                  key={user.uuid}
                  userName={user.userName}
                  uuid={user.uuid}
                  photoUrl={''}
                  IsLoading={IsLoading}
                />
              )
            ): <h1 className=" text-center font-semibold py-5">No results</h1>
          }
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;