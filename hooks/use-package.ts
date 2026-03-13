"use client";
import { setPackages } from '@/store/slices/package';
import { AppDispatch } from '@/store/store';
import React from 'react'
import { useDispatch } from 'react-redux';
import packageService from "@/services/packages";


const usePackage = ({ setLoader }: { setLoader: React.Dispatch<React.SetStateAction<any>> }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleToGetAllPackages = async () => {
        setLoader((prev: any) => ({ ...prev, packages: true }));
        try {
            const { data } = await packageService.getAllPackages({});
            dispatch(setPackages(data?.data));
        } catch (error) {
            console.log("error:::::", error);
        } finally {
            setLoader((prev: any) => ({ ...prev, packages: false }));
        }
    };
    return { handleToGetAllPackages }
}

export default usePackage