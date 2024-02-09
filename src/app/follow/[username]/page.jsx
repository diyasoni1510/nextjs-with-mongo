"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Follow = () => {
  const params = useParams();
  const FollowOf = params.username;
  const router = useRouter();
  const [followers, setFollowers] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);
  const [allFolllowings, setAllFolllowings] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isMyProfile,setIsMyProfile] = useState()
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);

  const getUserInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromusername", {
        username: user,
      });
      console.log(response);
      setFollowers(response.data.data.followers);
      setFollowing(response.data.data.following);
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowerInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: user,
      });
      console.log(response);
      setAllFollowers((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const getFolloweingInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: user,
      });
      console.log(response);
      setAllFolllowings((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFollowers = async(follow) => {
    try {
      const response = await axios.post("/api/users/removefollower",{_id:localStorage?.getItem("userId"),follow})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const UnfollowUser = async (user) => {
    try {
      const response = await axios.post("/api/users/updatefollowers", {
        _id: localStorage?.getItem("userId"),
        follow:user,
        add: false,
      });
      toast.success("User Unfollowed successfully")
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (FollowOf === localStorage?.getItem("username")) ?
    setIsMyProfile(true)
    :
    setIsMyProfile(false)
    getUserInfo(FollowOf);
  }, []);

  useEffect(() => {
    followers &&
      followers.map((follower, index) => {
        console.log(follower, index);
        getFollowerInfo(follower);
      });
  }, [followers]);

  useEffect(() => {
    following &&
      following.map((following, index) => {
        console.log(following, index);
        getFolloweingInfo(following);
      });
  }, [following]);
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-2 space-x-4 shadow">
          <IoIosArrowBack className="text-2xl" onClick={() => router.back()} />
          <p>{FollowOf}</p>
        </div>
        <div className="flex items-center justify-around py-4">
          <div>
            <p className="cursor-pointer" onClick={()=>{
              setShowFollowing(!showFollowing)
              setShowFollowers(!showFollowers)
            }}>
              <span></span>followers
            </p>
            {showFollowers && <div className="border border-black"></div>}
          </div>
          <div>
            <p className="cursor-pointer" onClick={()=>{
              setShowFollowing(!showFollowing)
              setShowFollowers(!showFollowers)
            }}>
              <span></span>following
            </p>
            {showFollowing && <div className="border border-black"></div>}
          </div>
        </div>
        {showFollowers && (
          <div className="followers-list text-center">
            {followers &&
              allFollowers && 
              allFollowers?.map((follower, index) => {
                return (
                  <div
                    className="flex p-4 justify-between items-center"
                    key={index}
                  >
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src={follower.pic}
                          className="w-10 h-10 rounded-full object-cover"
                        ></img>
                      </div>
                      <div className="text-sm">
                        <p className="cursor-pointer" onClick={()=>router.push(`/profilepage/${follower.username}`)}>{follower.username}</p>
                        <p>{follower.name}</p>
                      </div>
                    </div>
                    <div>
                      { isMyProfile ? <button onClick={()=>removeFollowers(follower._id)} className="bg-pink-300 text-white font-semibold py-1 px-5 text-sm rounded-md">
                        Remove
                      </button> : <button className="bg-pink-300 text-white font-semibold py-1 px-5 text-sm rounded-md">
                        Follow
                      </button> }
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {showFollowing && (
          <div className="followings-list text-center">
            {following &&
              allFolllowings && 
              allFolllowings?.map((following, index) => {
                return (
                  <div
                    className="flex p-4 justify-between items-center"
                    key={index}
                  >
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src={following.pic}
                          className="w-10 h-10 rounded-full object-cover"
                        ></img>
                      </div>
                      <div className="text-sm">
                        <p className="cursor-pointer" onClick={()=>router.push(`/profilepage/${following.username}`)}>{following.username}</p>
                        <p>{following.name}</p>
                      </div>
                    </div>
                    <div>
                    { isMyProfile ? <button onClick={()=>UnfollowUser(following._id)} className="bg-pink-300 text-white font-semibold py-1 px-5 text-sm rounded-md">
                        Unfollow
                      </button> : <button className="bg-pink-300 text-white font-semibold py-1 px-5 text-sm rounded-md">
                        Follow
                      </button> }
                    </div>
                  </div>
                );
              }) }
          </div>
        )}
      </div>
      <Toaster/>
    </>
  );
};

export default Follow;
