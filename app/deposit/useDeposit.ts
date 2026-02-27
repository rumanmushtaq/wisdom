"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDeposit = () => {
      const { packages } = useSelector((state: RootState) => state.packages);
      const [selectedPackage, setSelectedPackage] = useState("")
  return {packages, selectedPackage, setSelectedPackage}
}

export default useDeposit
