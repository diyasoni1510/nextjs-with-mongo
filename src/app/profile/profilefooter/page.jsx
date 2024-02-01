"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {mutate} from "swr";
import toast, { Toaster } from "react-hot-toast";

const schema = Yup.object().shape({
  post: Yup.string().required(),
  caption: Yup.string(),
});

const ProfileFooter = () => {
  const router = useRouter();
  const [isUpload, setIsUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const pathname = usePathname();
  const username = pathname.split("profile/").pop();
  const [footerSlider, openFooterSlider] = useState(false);
  // const storedUserInfo = localStorage.getItem("user")
  // const userInfo = JSON.parse(localStorage.getItem("user"));
  const logout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      localStorage.removeItem("username");
      localStorage.removeItem("user");
      setLogoutLoading(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      console.log(error.mesage);
    }
  };
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file as data URL"));
      };

      reader.readAsDataURL(file);
    });
  };
  const formik = useFormik({
    initialValues: {
      post: "",
      caption: "",
    },
    validationSchema: schema,
    onSubmit: async ({ post, caption }) => {
      setLoading(true);
      const base64String = await readFileAsDataURL(post);
      const uploadPost = await axios.post("/api/users/uploadpost", {
        post: base64String,
        caption,
        userId: JSON.parse(localStorage.getItem("user"))._id,
        username: localStorage.getItem("username"),
      });
      setLoading(false);
      setIsUpload(false);
      toast.success("Post uploaded successfully");
      mutate('/api/posts/getallposts');
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  const inputFileRef = useRef();
  return (
    <>
      {isUpload && (
        <dialog className="modal mt-16 z-40 w-full flex justify-center  bg-black bg-opacity-20 h-[620px] fixed top-0 md:top-[-40px]">
          <div className="modal-box w-full flex  justify-center items-center">
            <form
              className="flex space-y-3 flex-col justify-center items-center bg-white px-2 py-5 w-5/6"
              onSubmit={handleSubmit}
            >
              <input
                type="file"
                name="post"
                id="post"
                onChange={(e) => {
                  formik.setFieldValue("post", e.currentTarget.files[0]);
                }}
                accept="image/*"
                className="hidden"
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
              {values.post ? values.post.name : ""}
              <label htmlFor="caption">Caption</label>
              <textarea
                name="caption"
                id="caption"
                rows={5}
                value={values.caption}
                onChange={handleChange}
                className="border border-gray-500 rounded-md w-full"
              />
              <button
                type="submit"
                className="flex justify-center items-center  text-center bg-pink-400 text-white w-[235px] py-2 rounded-md font-semibold transform transition disabled:bg-pink-300 "
              >
                {loading === true && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}
                Post
              </button>
            </form>
          </div>
        </dialog>
      )}
      <div className="header-icons space-x-4 items-center justify-around flex md:hidden fixed bg-white py-2 bottom-0 w-full">
        <FaHome
          className="text-2xl cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        />
        <IoSearch
          className="text-2xl cursor-pointer"
          onClick={() => {
            router.push("/searchpage");
          }}
        />
        <FiPlusCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            isUpload === false ? setIsUpload(true) : setIsUpload(false);
          }}
        />
        <FaVideo className="text-2xl cursor-pointer" />

        <IoPersonCircle
          className="text-2xl cursor-pointer"
          onClick={() => {
            footerSlider === true
              ? openFooterSlider(false)
              : openFooterSlider(true);
          }}
        />
      </div>
      {footerSlider === true && (
        <div className="fixed bottom-10 border-t-2 w-full bg-white flex flex-col space-y-3 py-2 ">
          <button onClick={() => router.push(`/setdetails/${username}`)}>
            Edit profile
          </button>
          <button
            onClick={() =>
              router.push(`/profilepage/${localStorage.getItem("username")}`)
            }
          >
            Profile
          </button>
          <button className="text-red-500" onClick={logout}>
            {logoutLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default ProfileFooter;
