"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { type } from "os";

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("type of reader result", typeof reader.result);
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file as data URL"));
    };

    reader.readAsDataURL(file);
  });
};

const schema = Yup.object().shape({
  name: Yup.string(),
  bio: Yup.string(),
  pic: Yup.string(),
});

const SetDeatil = () => {
  const pathname = usePathname();
  const username = pathname.split("setdetails/").pop();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      pic: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, bio, pic }) => {
      var base64String;
      console.log(name, bio, pic);
      if (pic) {
        base64String = await readFileAsDataURL(pic);
        console.log("Base64:", typeof base64String);
      }
      try {
        let response = await axios.post("/api/users/updatemoredetails", {
          username,
          name,
          bio,
          pic: base64String,
        });
        console.log(response);
        toast.success(response.data.message);
        router.push(`/profilepage/${localStorage.getItem("username")}`);
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-11/12 h-fit shadow-md p-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="pic">Profile photo</label>
              <input
                type="file"
                name="pic"
                id="pic"
                className="outline-none"
                placeholder="Your name"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("pic", e.currentTarget.files[0]);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-b-2 outline-none"
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
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
                value={values.bio}
                onChange={handleChange}
              />
            </div>
            {/* <div className="flex flex-col space-y-2">
                <label htmlFor="anyLink">Add link</label>
                <input
                  type="text"
                  name="anyLink"
                  id="anyLink"
                  className="border-b-2 outline-none"
                  placeholder="link?"
                  value={values.anyLink}
                  onChange={handleChange}
                />
              </div> */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-300 text-white font-semibold py-1 px-4 rounded-md"
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
