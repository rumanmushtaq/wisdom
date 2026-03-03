"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import packageService from "@/services/packages";
import { setPackages } from "@/store/slices/package";
import { useRouter } from "next/navigation";

const useDashboard = () => {
  const router = useRouter();

  const { accessToken, refreshToken, user } = useSelector(
    (state: RootState) => state.auth,
  );
  console.log("user", user);

  return {accessToken, refreshToken, user};
};

export default useDashboard;
