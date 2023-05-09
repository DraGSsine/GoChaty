import Link from "next/link";
import React, { useState } from "react";
import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@/Firebase/firebase";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import uploadImage from "../public/DefUaltImage.jpg"
import Image from "next/image";
function Register() {
  const defualtImage =
    "https://firebasestorage.googleapis.com/v0/b/chat-app-7884d.appspot.com/o/DefUaltImage.jpg?alt=media&token=b4ea5395-70a7-4fc8-97a0-a2b0a32732b0";
  const router = useRouter();
  const { setdata } = useContext(SelectedChatContext);
  const [IsPassordMatch, setIsPasswordMatch] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [PreviewProfile, setPreviewProfile] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });
  const HandleSingUp = async (e) => {
    e.preventDefault();
    setdata({});
    const file = e.target[0].files[0];
    const fullName = e.target[1].value;
    const userName = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    const confirmPassword = e.target[5].value;
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      e.target[3].value = "";
      e.target[4].value = "";
    } else {
      try {
        const currentUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        let urlPhoto = null;
        if (file) {
          const storageRef = ref(storage, currentUser.user.uid);
          const uploadTask = uploadBytesResumable(storageRef, file);
          const snapshot = await uploadTask;
          const downloadURL = await getDownloadURL(snapshot.ref);
          urlPhoto = downloadURL;
        } 

        try {
          await updateProfile(currentUser.user, {
            displayName: userName,
            photoURL: file ? urlPhoto : defualtImage,
          });
          await setDoc(doc(db, "users", currentUser.user.uid), {
            userName: userName,
            uuid: currentUser.user.uid,
            photoUrl: file ? urlPhoto : defualtImage,
            online:true
          })
          localStorage.setItem(
            "currentUserUid",
            JSON.stringify({uid:currentUser.user.uid,userName,fullName,photoUrl: file ? urlPhoto : defualtImage})
          );
        } catch (error) {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        }

        // await uploadBytesResumable(storageRef, file).then(()=>{
        //   getDownloadURL(storageRef).then(async (downloadURL) => {
        //     try {
        //       await updateProfile(currentUser.user, {
        //         displayName: userName,
        //         photoURL:  file ? downloadURL :defualtImage,
        //       });
        //       await setDoc(doc(db, "users",currentUser.user.uid), {
        //         userName: userName,
        //         uuid: currentUser.user.uid,
        //         photoUrl: file ? downloadURL :defualtImage
        //       });
        //     } catch (error) {
        //       const errorCode = error.code;
        //       setErrorMessage(errorCode);
        //     }
        //   })
        // });
      } catch (error) {
        const errorCode = error.code;
        setErrorMessage(errorCode);
      }
    }
  };
  const HandleAddPreviewProfile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setPreviewProfile(event.target.result) 
    })

    reader.readAsDataURL(file);
  };
  return (
    <div>
      {ErrorMessage && (
        <div
          id="alert-border-2"
          className="flex absolute z-30 p-6 mb-4 w-full text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium">{ErrorMessage}</div>
          <button
            onClick={() => setErrorMessage(null)}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}

      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">GoChaty</h1>
            <p className="text-white mt-1">
              used by millions of users every day, is the most popular chat app
              in the world.
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-3 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form
            onSubmit={HandleSingUp}
            className=" justify-center items-center bg-white grid-cols-2 w-5/6 space-y-5"
          >
            <h1 className="text-gray-800 font-bold text-4xl mb-1">welcome !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Create an Account{" "}
            </p>
            <div className=" flex justify-center">
              <input
                onChange={HandleAddPreviewProfile}
                className=" hidden"
                type="file"
                id="ProfileImg"
              />
              <label className=" border-4 w-30 h-30 rounded-full flex items-center justify-center border-[#5C2CC3] cursor-pointer" htmlFor="ProfileImg">
                <Image
                className=" rounded-full w-[120px] max-h-[120px]"
                  src={!PreviewProfile?uploadImage:PreviewProfile}
                  width={100}
                  height={100}
                  alt="profile"
                />
              </label>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4 w-3/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  defaultValue="yassine ouchen"
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Full name"
                />
              </div>
              <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4 w-3/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Username"
                  defaultValue="dragssine"
                />
              </div>
            </div>
            <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name=""
                id=""
                placeholder="Email Address"
              />
            </div>
            <div className="flex justify-between gap-5">
              <div
                className={`flex items-center border-2 py-3 px-3 rounded-2xl w-3/6 ${
                  !IsPassordMatch && " border-red-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill={!IsPassordMatch ? "red" : "currentColor"}
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className={`'pl-2 outline-none border-none'${
                    !IsPassordMatch && " placeholder:text-red-600"
                  }`}
                  type="password"
                  name=""
                  id=""
                  defaultValue="123456"
                  placeholder={
                    !IsPassordMatch ? "passords are not match" : "Password"
                  }
                />
              </div>
              <div
                className={`flex items-center border-2 py-3 px-3 rounded-2xl w-3/6 ${
                  !IsPassordMatch && " border-red-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill={!IsPassordMatch ? "red" : "currentColor"}
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  formNoValidate
                  className={`'pl-2 outline-none border-none'${
                    !IsPassordMatch && " placeholder:text-red-600"
                  }`}
                  type="password"
                  name=""
                  id=""
                  defaultValue="123456"
                  placeholder={
                    !IsPassordMatch ? "passords are not match" : "Password"
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-3 rounded-2xl text-white font-semibold mb-2"
            >
              Sign Up
            </button>
            <div className="text-center">
              <p className="mb-6 text-base text-[#adadad]">Connect With</p>
              <ul className="-mx-2 mb-8 flex justify-between">
                <li className="w-full px-2">
                  <a className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90">
                    <svg
                      width={10}
                      height={20}
                      viewBox="0 0 10 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-full px-2">
                  <a className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90">
                    <svg
                      width={22}
                      height={16}
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5516 2.75538L20.9 1.25245C21.2903 0.845401 21.3968 0.53229 21.4323 0.375734C20.3677 0.939335 19.3742 1.1272 18.7355 1.1272H18.4871L18.3452 1.00196C17.4935 0.344423 16.429 0 15.2935 0C12.8097 0 10.8581 1.81605 10.8581 3.91389C10.8581 4.03914 10.8581 4.22701 10.8935 4.35225L11 4.97847L10.2548 4.94716C5.7129 4.82192 1.9871 1.37769 1.38387 0.782779C0.390323 2.34834 0.958064 3.85127 1.56129 4.79061L2.76774 6.54403L0.851613 5.6047C0.887097 6.91977 1.45484 7.95303 2.55484 8.7045L3.5129 9.33072L2.55484 9.67515C3.15806 11.272 4.50645 11.9296 5.5 12.18L6.8129 12.4932L5.57097 13.2446C3.58387 14.4971 1.1 14.4031 0 14.3092C2.23548 15.6869 4.89677 16 6.74194 16C8.12581 16 9.15484 15.8748 9.40322 15.7808C19.3387 13.7143 19.8 5.8865 19.8 4.32094V4.10176L20.0129 3.97652C21.2194 2.97456 21.7161 2.44227 22 2.12916C21.8935 2.16047 21.7516 2.22309 21.6097 2.2544L19.5516 2.75538Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li className="w-full px-2">
                  <a className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90">
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Forgot Password ?
              </span>
              <span className="text-sm ml-2 cursor-pointer">
                Already have an account?
                <Link
                  href="/singin"
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                >
                  {" "}
                  Login!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
