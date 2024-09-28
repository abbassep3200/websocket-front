// components/SignalRProvider.tsx

"use client";


import { startSignalRConnection } from "../Core/signalRService";
import { useEffect } from "react";
import { useAppContext } from "./app.provider";

const SignalRProvider = () => {
  const app = useAppContext();
  useEffect(() => {
    startSignalRConnection(app.setProgress, app.addLocation);
  }, []);

  return null; // No UI needed
};

export default SignalRProvider;
