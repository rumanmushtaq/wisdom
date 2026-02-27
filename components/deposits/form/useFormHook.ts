"use client";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import depositService from "@/services/deposit";
import {
  DepositFormData,
  DepositFormProps,
  depositSchema,
} from ".";

const useFormHook = ({ onSubmit }: DepositFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      transactionId: "",
      paymentProof: "",
    },
  });

  const removeFile = useCallback(
    (onChange: (file: File | undefined) => void) => {
      onChange(undefined);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    },
    [previewUrl]
  );

  const handleFormSubmit = async (data: DepositFormData) => {
    let iconUrl = data.paymentProof; // keep existing default or previous value

    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      // upload only if user selected a new file
      iconUrl = await depositService.uploadImage(selectedFile, "Purchase");
    }
    const finalData = {
      ...data,
      paymentProof: iconUrl, // updated with uploaded file URL
    };
    onSubmit(finalData);
    setIsSubmitted(true);
    setTimeout(() => {
      reset();
      setPreviewUrl(null);
      setSelectedFile(null);
      setIsSubmitted(false);
    }, 2000);
  };
  return {
    isSubmitted,
    isSubmitting,
    handleFormSubmit,
    handleSubmit,
    errors,
    control,
    previewUrl,
    setPreviewUrl,
    setSelectedFile,
    removeFile,
  };
};

export default useFormHook;
