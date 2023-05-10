import React,{useState} from 'react'
import { Heart, Home, Messages, SearchIcon } from "@/public/Icons";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/Firebase/firebase";
import AddFriend from "./AddFriend";
function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [IsLoading, setIsloading] = useState(false);
    const HandleSearchForFriends = async (e) => {
      setSearchInput(e.target.value);
      setIsloading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push(doc.data());
      });
      setUsers(
        allUsers.filter(
          (user) =>
            user.userName.startsWith(e.target.value || " ") &&
            user.uuid != auth.currentUser.uid
        )
      );
      setIsloading(false);
    };
  return (
    <div
    onMouseLeave={() =>
      setTimeout(() => {
        setSearchInput("");
      }, 500)
    }
    className=" w-full relative justify-center md:justify-end"
  >
    <div className=" w-full flex items-center px-3 border-2  rounded-xl overflow-hidden border-[#5b2dc3]">
      <i className=" inline-block w-7 text-[#5b2dc3]">
        <SearchIcon />
      </i>
      <input
        onChange={HandleSearchForFriends}
        type="text"
        placeholder="Search For Friend"
        className="px-3 outline-none w-full py-2 bg-inherit text-white"
      />
    </div>
    {searchInput && (
      <div className=" z-50 min-[40vh]: absolute top-11 space-y-4 p-2 rounded-xl bg-white w-full md:w-4/6">
        {users.length ? (
          users.map((user, index) =>
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
                photoUrl={user.photoUrl}
                IsLoading={IsLoading}
              />
            )
          )
        ) : (
          <h1 className=" text-center font-semibold py-5">No results</h1>
        )}
      </div>
    )}
  </div>
  )
}

export default Search