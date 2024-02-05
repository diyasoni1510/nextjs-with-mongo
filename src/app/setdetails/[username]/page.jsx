"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FiUpload } from "react-icons/fi";

const SetDeatil = () => {
  const inputFileRef  = useRef()
  const [buttonDisabled,setButtonDisabled] = useState(true)
  const pathname = usePathname();
  const [name,setName] = useState("")
  const [bio,setBio] = useState("")
  const [pic,setPic] = useState()
  const [picName,setPicName] = useState()

  const username = pathname.split("setdetails/").pop();
  const router = useRouter();
  useEffect(()=>{
    if(pic || name.length > 0 || bio.length > 0)
    setButtonDisabled(false)
  })
  const postPic = (pic) => {
    console.log(pic);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "gupshup");
    data.append("cloud_name", "dp2bxtrpy");
    fetch("https://api.cloudinary.com/v1_1/dp2bxtrpy/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
      });
  };

  const submitForm = async(e) => {
    e.preventDefault();
    console.log(username, name,bio,pic);
        try {
        const response = await axios.post("/api/users/updatemoredetails", { username, name,bio,pic})
        console.log(response)
        toast.success(response.data.message);
        router.push(`/profilepage/${localStorage.getItem("username")}`);
      } catch (error) {
        toast.error(error.mesaage);
        console.log(error);
      } finally {
      }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-11/12 h-fit shadow-md p-4">
          <form className="flex flex-col justify-center items-center space-y-5">
            <div className="flex flex-col justify-center items-center space-y-2">
              <label htmlFor="pic">Profile photo</label>
              <input
                type="file"
                name="pic"
                id="pic"
                className="hidden"
                placeholder="Your name"
                onChange={(e) => {
                  postPic(e.currentTarget.files[0]);
                  setPicName(e.currentTarget.files[0])
                }}
                ref={inputFileRef}
              />
              <button
                type="button"
                className="w-[70px] h-[70px] rounded-full bg-gray-200 flex justify-center items-center"
                onClick={() => {
                  inputFileRef.current.click();
                }}
              >
                <FiUpload className="text-3xl text-gray-400" />
              </button>
              {picName ? picName.name : ""}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-b-2 outline-none"
                placeholder="Your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                id="bio"
                className="border-b-2 outline-none"
                placeholder="Anything you wnat to put in bio"
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
              onClick={submitForm}
              disabled={buttonDisabled}
                type="submit"
                className="bg-pink-400 text-white font-semibold py-1 px-4 rounded-md disabled:bg-pink-300"
              >
                Submit
              </button>
            </div>
          </form>
          <button
            className="mt-2"
            onClick={() => {
              router.push(`/profile/${localStorage.getItem("username")}`);
            }}
          >
            Skip
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SetDeatil;
