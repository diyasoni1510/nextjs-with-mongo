"use client";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { MdGif } from "react-icons/md";
import Link from "next/link";
import {toast, Toaster } from "react-hot-toast";

const Users = [
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
];

const allComments = [
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
  {
    userIamge: "/images/users/user-1.jpg",
    name: "user-1",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    day: "2",
    like: "6",
  },
];

const PostSection = () => {
  const [likePost, setLikePost] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-2 mb-10 md:border border-gray-400 rounded-md p-3 flex flex-col justify-center items-center">
      <div className=" w-full rounded-sm md:border border-gray-200 md:p-2">
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-3 md:space-x-4 items-center">
            <div
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/images/users/user-5.jpg)` }}
            ></div>
            <div>
              <Link href="/UserProfile" className="font-semibold">
                Name Here
              </Link>
            </div>
          </div>
          <div>
            <button className="text-sm md:text-base bg-pink-400 text-white px-2 py-1 rounded-md font-semibold transform transition hover:bg-white hover:text-pink-400 disabled:bg-pink-300 hover:scale-95">
              Follow
            </button>
          </div>
        </div>

        <div className="mt-3">
          <img
            src="/images/posts/instameme.jpg"
            className="object-fill min-w-full md:h-[500px]"
          ></img>
        </div>

        <div className="post-icons flex justify-between items-center mt-3 md:px-2">
          <div className="flex space-x-4">
            {likePost === false ? (
              <FaRegHeart
                className="text-2xl md:text-3xl"
                onClick={() => {
                  setLikePost(true);
                }}
              />
            ) : (
              <FaHeart
                className="text-red-500 text-2xl md:text-3xl"
                onClick={() => {
                  setLikePost(false);
                }}
              />
            )}
            <FaRegComment
              className="text-2xl md:text-3xl cursor-pointer"
              onClick={() => {
                showComments === false
                  ? setShowComments(true)
                  : setShowComments(false);
              }}
            />
            <FaRegShareFromSquare
              className="text-2xl md:text-3xl cursor-pointer"
              onClick={() => setSharePost(true)}
            />
          </div>
          <div>
            <MdOutlineSaveAlt
              className="text-2xl md:text-3xl cursor-pointer"
              onClick={() => {
                toast.success("Your Post is saved !");
              }}
            />
          </div>
        </div>

        <div className="mt-3 md:px-2">
          <div className="text-sm">415,120 likes</div>
          <div>
            <span className="font-semibold mr-1 text-sm md:text-base">
              Name Here
            </span>
            <span className="text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex amet
              ut similique fugit expedita! Perspiciatis?
            </span>
          </div>
          <div
            className="text-gray-400 text-xs md:text-sm mt-2 cursor-pointer"
            onClick={() => {
              setShowComments(true);
            }}
          >
            View all 303 comments
          </div>
          <div className="text-gray-400 text-xs md:text-sm mt-1">
            5 January 2023
          </div>

          <div className="mt-4 flex justify-between pb-2">
            <div className="flex space-x-4 items-center ">
              <div
                className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(/images/users/user-5.jpg)` }}
              ></div>
              <div>
                <input
                  type="text"
                  className="font-semibold w-100 outline-none"
                  placeholder="Add a comment.."
                ></input>
              </div>
            </div>
            <div>
              <FaRegSmileBeam className="text-2xl " />
            </div>
          </div>
        </div>

        {showComments === true && (
          <dialog
            id="my_modal_1"
            className="modal fixed top-0 bg-black bg-opacity-50 w-screen h-screen z-50 hidden md:block"
            open
          >
            <div className="modal-box w-full h-full flex flex-col justify-center items-center">
              <div className="w-4/5 h-4/5">
                <div>
                  <ImCross
                    className="text-white text-2xl float-end cursor-pointer mb-2"
                    onClick={() => {
                      setShowComments(false);
                    }}
                  />
                </div>
                <div className="border border-white boredr-2 w-full h-full flex">
                  <div className="w-3/5">
                    <div className="h-full">
                      <img
                        src="/images/posts/instameme.jpg"
                        className="object-fill min-w-full h-full"
                      ></img>
                    </div>
                  </div>
                  <div className="w-2/5 bg-pink-50">
                    <div className="userInfo px-2 border border-gray-300 border-1 pb-4">
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-3 md:space-x-4 items-center">
                          <div
                            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(/images/users/user-5.jpg)`,
                            }}
                          ></div>
                          <div>
                            <Link href="/UserProfile" className="font-semibold">
                              Name Here
                            </Link>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm md:text-base bg-pink-400 text-white px-2 py-1 rounded-md font-semibold transform transition hover:bg-white hover:text-pink-400 disabled:bg-pink-300 hover:scale-95">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="post-caption px-2">
                      <div className="flex space-x-3 md:space-x-4 items-center mt-3">
                        <div
                          className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(/images/users/user-5.jpg)`,
                          }}
                        ></div>
                        <div>
                          <p className="text-sm">
                            <Link href="/UserProfile" className="font-semibold">
                              Name here{" "}
                            </Link>
                            <span>
                              this is the whole caption with lots of hashtags
                              #this #that
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="all-comments px-2 h-[400px] overflow-y-scroll">
                      {allComments.map((comments, index) => {
                        return (
                          <div
                            className="flex space-x-3 md:space-x-4 items-center mt-3"
                            key={index}
                          >
                            <div
                              className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${comments.userIamge})`,
                              }}
                            ></div>
                            <div>
                              <p className="text-sm">
                                <span className="font-semibold">
                                  {comments.name}
                                </span>
                                <span>{comments.comment}</span>
                              </p>
                              <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                                <span className="cursor-pointer">
                                  {comments.day}d
                                </span>
                                <span className="cursor-pointer">
                                  {comments.like} likes
                                </span>
                                <span className="cursor-pointer">Reply</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="post-icons flex justify-between items-center h-[55px] md:px-2">
                      <div className="flex space-x-4">
                        {likePost === false ? (
                          <FaRegHeart
                            className="text-2xl"
                            onClick={() => {
                              setLikePost(true);
                            }}
                          />
                        ) : (
                          <FaHeart
                            className="text-red-500 text-2xl"
                            onClick={() => {
                              setLikePost(false);
                            }}
                          />
                        )}
                        <FaRegComment
                          className="text-2xl cursor-pointer"
                          onClick={() => {
                            showComments === false
                              ? setShowComments(true)
                              : setShowComments(false);
                          }}
                        />
                        <FaRegShareFromSquare
                          className="text-2xl cursor-pointer"
                          onClick={() => setSharePost(true)}
                        />
                      </div>
                      <div className="pr-3">
                        <MdOutlineSaveAlt
                          className="text-2xl cursor-pointer"
                          onClick={() => {
                            toast.success("Your Post is saved !");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}
        {showComments === true && (
          <dialog
            id="my_modal_1"
            className="modal fixed top-0 bg-black bg-opacity-50 w-screen h-screen z-50 block md:hiden"
            open
          >
            <div className="modal-box w-full h-full flex flex-col justify-center items-center relative">
              <div className=" absolute bottom-0">
                <div className=" border-white border-2 w-full h-full flex">
                  <div className=" bg-pink-50">
                    <div className="userInfo  border border-b-gray-300 flex justify-start  items-center py-3 ">
                      <div>
                        <IoIosArrowBack
                          className="text-black text-2xl float-end cursor-pointer mb-2"
                          onClick={() => {
                            setShowComments(false);
                          }}
                        />
                      </div>
                      <div className="w-full text-center">
                        <Link href="/UserProfile" className="font-semibold">
                          Comments
                        </Link>
                      </div>
                    </div>
                    <div className="post-caption px-2">
                      <div className="flex space-x-3 md:space-x-4 items-center mt-3">
                        <div
                          className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(/images/users/user-5.jpg)`,
                          }}
                        ></div>
                        <div>
                          <p className="text-sm">
                            <Link href="/UserProfile" className="font-semibold">
                              Name here{" "}
                            </Link>
                            <span>
                              this is the whole caption with lots of hashtags
                              #this #that
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="all-comments px-2 h-[400px] overflow-y-scroll">
                      {allComments.map((comments, index) => {
                        return (
                          <div
                            className="flex space-x-3 md:space-x-4 items-center mt-3"
                            key={index}
                          >
                            <div
                              className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${comments.userIamge})`,
                              }}
                            ></div>
                            <div>
                              <p className="text-sm">
                                <span className="font-semibold">
                                  {comments.name}
                                </span>
                                <span>{comments.comment}</span>
                              </p>
                              <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                                <span className="cursor-pointer">
                                  {comments.day}d
                                </span>
                                <span className="cursor-pointer">
                                  {comments.like} likes
                                </span>
                                <span className="cursor-pointer">Reply</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className=" flex justify-between items-center h-[55px] px-2">
                      <div className="flex space-x-4">
                        <div
                          className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(/images/users/user-5.jpg)`,
                          }}
                        ></div>
                        <div>
                          <input
                            type="text"
                            className="font-semibold w-100 outline-none bg-transparent text-sm"
                            placeholder="Add a comment.."
                          ></input>
                        </div>
                      </div>
                      <div className="pr-3">
                        <MdGif 
                          className="text-2xl cursor-pointer border-2 border-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
      {sharePost === true && (
        <dialog
          id="share-post"
          className="modal bg-pink-100 py-5 md:p-5 z-40 fixed top-[40%] shadow-lg bg-opacity-80 w-[300px] "
          open
        >
          <div className="modal-box">
            <div className="w-full  rounded-md ">
              <div className="flex p-3 space-x-6 overflow-x-scroll">
                {Users.map((user) => {
                  return (
                    <div key={user.id}>
                      <div
                        className="w-[50px] h-[50px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat cursor-pointer "
                        style={{ backgroundImage: `url(${user.pic})` }}
                        id={user.id}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-action py-4 flex justify-center md:justify-end">
              <button
                className="btn bg-pink-400 text-white px-4 py-2 rounded-md font-semibold transform transition hover:bg-white hover:text-pink-400 disabled:bg-pink-300 hover:scale-95"
                onClick={() => {
                  setSharePost(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
      <Toaster/>
    </div>
  );
};

export default PostSection;
