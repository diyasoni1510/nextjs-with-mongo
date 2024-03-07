"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Index from "./index";

const Page = () => {
  return (
    <>
      <Provider store={store}>
        <Index />
      </Provider>
    </>
  );
};

export default Page;
