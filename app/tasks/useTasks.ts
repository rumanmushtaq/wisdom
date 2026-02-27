"use client";
import { setMyTasks, updateTaskStatus } from "@/store/slices/tasks";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tasksService from "@/services/tasks";
const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myTasks, user } = useSelector((state: RootState) => {
    return {
      myTasks: state.tasks.myTasks,
      user: state.auth.user
    };
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [loader, setLoader] = useState<{
    data: boolean;
    start: {
      load: boolean;
      id: string | null;
    };
  }>({
    data: false,
    start: {
      load: false,
      id: null,
    },
  });
  const handleToGetAllMyTasks = async () => {
    setLoader((prev) => ({ ...prev, data: true }));
    try {
      const { data } = await tasksService.getMyTasks();
      console.log("data", data);
      dispatch(setMyTasks(data.data));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader((prev) => ({ ...prev, data: false }));
    }
  };

  const handleTaskAction = (taskId: string, stage: string) => {
    if (stage === "start") {
      handleStartTaskAction(taskId, "IN_PROGRESS");
    } else if (stage === "complete") {
      handleStartTaskAction(taskId, "COMPLETED");
    }
  };
  const handleStartTaskAction = async (taskId: string, status: string) => {
    // setLoader((prev) => ({ ...prev, start: true }));
    try {
      const { data } = await tasksService.getStartTask(taskId);
      dispatch(updateTaskStatus({ taskId, userStatus: status }));
      if (status === "IN_PROGRESS") {
        startTimer(taskId);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  // ============================
  // TIMER LOGIC
  // ============================
  const startTimer = (taskId: string) => {
    setTimeLeft(30);
    setLoader((prev) => ({
      ...prev,
      start: {
        load: true,
        id: taskId,
      },
    }));

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;

          setLoader((prev) => ({
            ...prev,
            start: {
              load: false,
              id: null,
            },
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleToAddCreditsOfUser = async () => {
    console.log("asdcasd");
    try {
      const { data } = await tasksService.addCredits();
    } catch (error) {
      console.log("adciasohcvlkasdncvioadsn4t");
    }
  };

  useEffect(() => {
    handleToGetAllMyTasks();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  return {
    loader,user,
    myTasks,
    timeLeft,
    handleTaskAction,
    handleToAddCreditsOfUser,
  };
};

export default useTasks;
