"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button"; // Adjust based on your setup

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-md animate-fadeIn">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <input
            type="number"
            id="duration"
            placeholder="Enter duration (sec)"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-lg px-4 py-2"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 shadow-md"
          >
            Set
          </Button>
        </div>
        <div className="text-7xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-10 text-center transition-all duration-500">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 py-3 shadow-md transition-all duration-300"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg px-6 py-3 shadow-md transition-all duration-300"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-6 py-3 shadow-md transition-all duration-300"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
