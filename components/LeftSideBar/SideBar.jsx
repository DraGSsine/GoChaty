import React from "react";
import SignOut from "./SignOut";
function SideBar() {
  return (
    <div
      onScroll={(e) => console.log(e)}
      className="h-screen w-[20%] hidden md:block sticky top-0 rounded-3xl bg-[#282828]"
    >
      <SignOut />
    </div>
  );
}

export default SideBar;
