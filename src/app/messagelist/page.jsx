"use client"
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import Link from "next/link";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const MessageList = () => {
  const currentUser = localStorage.getItem("username")

  
  const { data, error } = useSWR('/api/users/allusers', fetcher)

  if(error) return <div>Failed to load</div>
  return (
    <div>
      <div className="flex justify-between items-center py-4 px-2  shadow">
        <div className="flex justify-center items-center space-x-4">
          <Link href={`/profile/${currentUser}`}>
            <IoIosArrowBack className="text-2xl" />
          </Link>
          <p className="font-semibold">User name</p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <RiVideoAddLine className="text-2xl" />
          <FaEdit className="text-2xl" />
        </div>
      </div>
      <div className="flex space-x-2 bg-gray-200 p-2 rounded-md m-2">
        <label>
          <IoIosSearch className="text-2xl" />
        </label>
        <input placeholder="Search" className="bg-transparent" />
      </div>
      <div className="flex p-2 justify-between m-2">
        <div>Message</div>
        <div className="text-pink-400">Requests</div>
      </div>
      <div className="p-2 m-2 font-semibold">All users</div>
      <div className="m-2">
        {data && data.data.map((user, index) => {
          return (
            <div className="flex p-2 justify-between items-center " key={index}>
              <Link href={`/messagepage/${user.username}`}>
                <div className="flex space-x-4">
                  <div>
                    <img
                      src={user.pic}
                      className="w-[40px] h-[40px] rounded-full object-cover ring-1 ring-offset-2 ring-pink-300"
                    />
                  </div>
                  <div className="text-sm">
                    <p>{user.name}</p>
                    {/* <p className="text-gray-400">
                      {user.lastMessage}
                    </p> */}
                  </div>
                </div>
              </Link>
              <div>
                <CiCamera className="text-2xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
