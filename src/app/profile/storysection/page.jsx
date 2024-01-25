"use client";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";


const userStory = [
  {
    pic: "/images/users/user-1.jpg",
    id: "user-1",
  },
  {
    pic: "/images/users/user-2.jpg",
    id: "user-2",
  },
  {
    pic: "/images/users/user-3.jpg",
    id: "user-3",
  },
  {
    pic: "/images/users/user-4.jpg",
    id: "user-4",
  },
  {
    pic: "/images/users/user-5.jpg",
    id: "user-5",
  },
  {
    pic: "/images/users/user-6.jpg",
    id: "user-6",
  },
  {
    pic: "/images/users/user-7.webp",
    id: "user-7",
  },
  {
    pic: "/images/users/user-8.webp",
    id: "user-8",
  },
  {
    pic: "/images/users/user-9.jpeg",
    id: "user-9",
  },
  {
    pic: "/images/users/user-10.jpg",
    id: "user-10",
  },
  {
    pic: "/images/users/user-11.avif",
    id: "user-11",
  },
];

const StorySection = () => {
  const [openModal, setopenModal] = useState(null);
  return (
    <div className="w-full border border-b-gray-400 md:border-gray-400 md:rounded-md overflow-x-scroll">
      <div className="flex p-3 space-x-6">
        {userStory.map((user) => {
          return (
            <div key={user.id}>
              <div
                className="w-[50px] h-[50px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat cursor-pointer "
                style={{ backgroundImage: `url(${user.pic})` }}
                id={user.id}
                onClick={() => setopenModal(user.id)}
              ></div>
              {openModal === user.id && (
                <dialog
                  id={user.id}
                  className="modal z-40 w-full flex justify-center  bg-black bg-opacity-50 h-screen absolute top-0 md:top-[-40px]"
                >
                  <div className="modal-box">
                    <div className="h-[70vh] w-[300px]">
                    <ImCross className="float-end my-5" onClick={()=>{setopenModal(null)}} />
                      <img
                        className="object-cover w-full h-full"
                        src={user.pic}
                      ></img>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorySection;
