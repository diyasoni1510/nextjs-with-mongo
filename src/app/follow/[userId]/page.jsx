"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const Follow = () => {
  const params = useParams();
  const FollowOf = params.userId;
  const router = useRouter();
  const [followers, setFollowers] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);

  const [following, setFollowing] = useState([]);

  const getUserInfo = async (user) => {
    try {
      const response = await axios.post("/api/users/getuserfromid", {
        _id: user,
      });
      console.log(response);
      setFollowers(response.data.data.followers);
      setFollowing(response.data.data.following);
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowInfo = async (user) => {
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
  useEffect(() => {
    getUserInfo(FollowOf);
  }, []);

  useEffect(() => {
    followers &&
      followers.map((follower, index) => {
        console.log(follower, index);
        getFollowInfo(follower);
      });
  }, [followers]);
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-2 space-x-4 shadow">
          <IoIosArrowBack className="text-2xl" onClick={() => router.back()} />
          <p>User username</p>
        </div>
        <div className="flex items-center justify-around py-4">
          <div>
            <p className="cursor-pointer">
              <span></span>followers
            </p>
            <div className="border border-black"></div>
          </div>
          <div>
            <p className="cursor-pointer">
              <span></span>following
            </p>
            <div className="border border-black"></div>
          </div>
        </div>
        <div className="followers-list">
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
                      <p>{follower.username}</p>
                      <p>{follower.name}</p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-pink-300 text-white font-semibold py-1 px-5 text-sm rounded-md">
                      Follow
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Follow;
