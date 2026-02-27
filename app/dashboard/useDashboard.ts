"use client";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const useDashboard = () => {
      const { user } = useSelector((state: RootState) => state.auth);
  return {user}
}

export default useDashboard
