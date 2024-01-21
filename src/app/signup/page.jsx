"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
});
const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ username, password, email }) => {
      try {
        setLoading(true);
        await axios
          .post("/api/users/signup", { username, password, email })
          .then((res) => {
            console.log(res);
            setLoading(false);

            if (res.data.status === 201) {
              toast.success("User Signed up succesfully");
              router.push("/login");
            } else toast.error("User already exists");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
          });
      } catch (error) {
        toast.error(error.mesaage);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (
      values.username.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <div className="w-full  h-screen flex items-center justify-center ">
        <div className="flex flex-col  items-center justify-center px-4 py-4 ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-gray-600 font-semibold">
              Username:
            </label>
            <br />
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              className="p-2 rounded-md outline-none placeholder:text-sm bg-pink-50 focus:bg-white hover:bg-white placeholder:text-gray-600 focus:placeholder:text-transparent hover:placeholder:text-transparent ring-1 ring-offset-2 ring-pink-400 my-2 "
            ></input>
            <br></br>
            {errors.username && touched.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
            <br />
            <label htmlFor="email" className="text-gray-600 font-semibold">
              email:
            </label>
            <br />
            <input
              name="email"
              id="email"
              type="text"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              className="p-2 rounded-md outline-none placeholder:text-sm bg-pink-50 focus:bg-white hover:bg-white placeholder:text-gray-600 focus:placeholder:text-transparent hover:placeholder:text-transparent ring-1 ring-offset-2 ring-pink-400 my-2 "
            ></input>
            <br></br>
            {errors.email && touched.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <br />
            <label htmlFor="password" className="text-gray-600 font-semibold">
              Password:
            </label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              className="p-2 rounded-md outline-none placeholder:text-sm bg-pink-50 focus:bg-white hover:bg-white placeholder:text-gray-600 focus:placeholder:text-transparent hover:placeholder:text-transparent ring-1 ring-offset-2 ring-pink-400 mt-2 "
            ></input>
            <br></br>
            {errors.password && touched.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <br />
            <div className="mt-5">
              <button
                disabled={buttonDisabled}
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-2">
            <Link href="/" className="text-pink-400 font-semibold">
              Forget password?
            </Link>
          </div>
          <div className="mt-2  flex space-x-2">
            <span className="font-semibold text-gray-600">
              Already have an account ?
            </span>
            <Link href="/login" className="text-pink-400 font-semibold">
              Log In
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignupPage;
