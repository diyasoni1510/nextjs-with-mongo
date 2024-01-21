"use client";
import React, { useEffect, useState } from "react";
import ProfileFooter from "../profile/profilefooter/page";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const SearchPage = () => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [searchVal,setSearchVal] = useState("")

  const searchUser = async () =>{
    try {
        const response = await axios.post("/api/users/searchuser",{username:searchVal})
        console.log(response)
        router.push(`/profilepage/${response.data.data.username}`)
    } catch (error) {
        console.log(error)
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users/allusers");
      console.log(response.data.data);
      setAllUsers(response.data.data);
    } catch (error) {
      console.log(error);
      console.log(error.mesage);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div>
        <div className="flex items-center space-x-4 py-4 px-2 border-b">
          <IoIosArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
          <p>Search</p>
        </div>
        <div className="flex justify-between bg-gray-200 p-2 m-2 rounded-md">
          <div className="flex">
            <label htmlFor="search">
              <CiSearch className="text-2xl" />
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="text-sm bg-transparent outline-none w-full"
              value={searchVal}
              onChange={(e)=>{setSearchVal(e.target.value)}}
            />
          </div>
          <div>
            <button onClick={searchUser}>Search</button>
          </div>
        </div>

        <div className="all-users-list p-2">
          {allUsers.map((user, id) => {
            return (
              <div className="flex space-x-3 mb-2" key={user._id}>
                <div>
                  <img src="/images/user-dp.png" className="w-12"></img>
                </div>
                <div className="text-sm">
                  <p>{user.username}</p>
                  <p className=" text-gray-500">name</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ProfileFooter />
    </>
  );
};

export default SearchPage;
