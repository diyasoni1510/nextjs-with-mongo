"use client";
import React, { useEffect, useState } from "react";
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
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const PostSection = () => {
  const [sharePost, setSharePost] = useState(false);
  const [showComments, setShowComments] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [postSentTo,setPostSentTo] = useState("")
  const [comment,setComment] = useState("")

  const getAllPosts = async () => {
    try {
      const posts = await axios.get("/api/posts/getallposts");
      setAllPosts(posts.data.data);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/users/allusers");
      setAllUsers([response.data.data][0]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async(_id,like,add) => {
    console.log(_id,like)
    const response = await axios.post("/api/posts/updatelike",{_id,like,add})
    console.log(response)
  }

  const sendComment = async(e,postId) => {
    if(e.key === "Enter"){
      console.log(postId)
      console.log("send comment",comment)
      const response = await axios.post("/api/posts/updatecomment",{_id:postId,user:localStorage.getItem("username"),comment})
      console.log(comment)
    }
  }

  useEffect(() => {
    getAllPosts();
    getAllUsers()
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mb-10">
      {allPosts &&
        allPosts.map((post, index) => {
          return (
            <div
              className="mt-2 md:border border-gray-400 rounded-md p-3 flex flex-col justify-center items-center"
              key={index}
            >
              <div className=" w-full rounded-sm md:border border-gray-200 md:p-2">
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-3 md:space-x-4 items-center">
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat">
                      <img
                        src={post.userDetails[0].pic}
                        className="w-full h-full object-cover rounded-full"
                      ></img>
                    </div>
                    <div>
                      <Link href="/UserProfile" className="font-semibold">
                        {post.username}
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
                    src={post.post}
                    className="object-fill min-w-full h-[300px]"
                  ></img>
                </div>

                <div className="post-icons flex justify-between items-center mt-3 md:px-2">
                  <div className="flex space-x-4">
                    {post.likes.includes(localStorage.getItem("username")) === false ? (
                      <FaRegHeart
                        className="text-2xl md:text-3xl"
                        onClick={() => {
                          updateLikes(post._id,localStorage.getItem("username"),true)
                        }}
                      />
                    ) : (
                      <FaHeart
                        className="text-red-500 text-2xl md:text-3xl"
                        onClick={() => {
                          updateLikes(post._id,localStorage.getItem("username"),false)
                        }}
                      />
                    )}
                    <FaRegComment
                      className="text-2xl md:text-3xl cursor-pointer"
                      onClick={() => {
                        setShowComments(post._id);
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
                  <div className="text-sm">{post.likes.length} likes</div>
                  <div>
                    <span className="font-semibold mr-1 text-sm md:text-base">
                      {post.username}
                    </span>
                    <span className="text-sm md:text-base">{post.caption}</span>
                  </div>
                  {post.comments.length > 0 && (
                    <div
                      className="text-gray-400 text-xs md:text-sm mt-2 cursor-pointer"
                      onClick={() => {
                        setShowComments(true);
                      }}
                    >
                      View all {post.comments.length} comments
                    </div>
                  )}
                  <div className="text-gray-400 text-xs md:text-sm mt-1">
                    {formatDate(post.createdAt)}
                  </div>

                  <div className="mt-4 flex justify-between pb-2">
                    <div className="flex space-x-4 items-center ">
                      <div
                        className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${post.userDetails[0].pic})`,
                        }}
                      ></div>
                      <div>
                        <input
                          type="text"
                          className="font-semibold w-100 outline-none"
                          placeholder="Add a comment.."
                          onChange={(e)=>setComment(e.target.value)}
                          onKeyUp={(e) => {sendComment(e,post._id)}}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <FaRegSmileBeam className="text-2xl " />
                    </div>
                  </div>
                </div>
                {showComments === post._id && (
                  <dialog
                    id="my_modal_1"
                    className="modal fixed top-0 bg-black bg-opacity-20 w-screen h-screen z-50 block md:hiden"
                    open
                  >
                    <div className="modal-box w-full h-full flex flex-col justify-center items-center relative">
                      <div className="w-full absolute bottom-0">
                        <div className=" border-white border-2 w-full h-full flex">
                          <div className=" bg-pink-50 w-full">
                            <div className="userInfo  border border-b-gray-300 flex justify-start  items-center py-3 ">
                              <div>
                                <IoIosArrowBack
                                  className="text-black text-2xl float-end cursor-pointer mb-2"
                                  onClick={() => {
                                    setShowComments("");
                                  }}
                                />
                              </div>
                              <div className="w-full text-center">
                                <Link
                                  href="/UserProfile"
                                  className="font-semibold"
                                >
                                  Comments
                                </Link>
                              </div>
                            </div>
                            <div className="post-caption px-2">
                              <div className="flex space-x-3 md:space-x-4 items-center mt-3">
                                <div
                                  className="w-[30px] h-[30px] flex-shrink-0 rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                                  style={{
                                    backgroundImage: `url(${post.userDetails[0].pic})`,
                                  }}
                                ></div>
                                <div>
                                  <p className="text-sm">
                                    <Link
                                      href="/UserProfile"
                                      className="font-semibold"
                                    >
                                      {post.username}
                                    </Link>
                                    <span className="ml-2">{post.caption}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="all-comments px-2 h-[400px] overflow-y-scroll">
                              {console.log(post.comments.length)}
                              {post.comments.length > 0 ? (
                                post.comments.map((comments, index) => {
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
                                            {comments.user}
                                          </span>
                                          <span className="ml-2">{comments.comment}</span>
                                        </p>
                                        <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                                          <span className="cursor-pointer">
                                            {comments.day}d
                                          </span>
                                          <span className="cursor-pointer">
                                            {comments.like} likes
                                          </span>
                                          <span className="cursor-pointer">
                                            Reply
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="flex h-full items-center justify-center w-full">
                                  No comments here
                                </div>
                              )}
                            </div>
                            <div className=" flex justify-between items-center h-[55px] px-2">
                              <div className="flex space-x-4">
                                <div
                                  className="w-[20px] h-[20px] rounded-full ring-2 ring-offset-2 ring-pink-300 bg-cover bg-center bg-no-repeat"
                                  style={{
                                    backgroundImage: `url(${post.userDetails[0].pic}})`,
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
                                <MdGif className="text-2xl cursor-pointer border-2 border-black" />
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
                  className="modal bg-pink-100 py-5  z-40 fixed top-[40%] shadow-lg bg-opacity-20 w-[300px] "
                  open
                >
                  <div className="modal-box">
                    <div className="w-full  rounded-md ">
                      <div className="flex p-3 space-x-6 overflow-x-scroll">
                        {allusers.map((user) => {
                          return (
                            <div key={user.id} onClick={()=>setPostSentTo(user.username)}>
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
                    <div className="modal-action py-4 flex justify-between px-2">
                      <button
                        className="btn bg-pink-400 text-white px-4 py-2 rounded-md font-semibold transform transition hover:bg-white hover:text-pink-400 disabled:bg-pink-300 hover:scale-95"
                        onClick={() => {
                          setSharePost(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        disabled={ postSentTo !== "" ? false : true }
                        className="btn bg-pink-400 text-white px-4 py-2 rounded-md font-semibold transform transition hover:bg-white hover:text-pink-400 disabled:bg-pink-300 hover:scale-95"
                        onClick={() => {
                          toast.success(`Post sent to ${postSentTo}`);
                          setPostSentTo("")
                          setSharePost(false)
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </dialog>
              )}
              <Toaster />
            </div>
          );
        })}
    </div>
  );
};

export default PostSection;
