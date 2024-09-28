"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { startProgress } from "../Core/signalRService";
import Map from "@/components/map";
import { useAppContext } from "../providers/app.provider";

export default function ProgressPage() {
  const appContext = useAppContext();

  return (
    <>
      <Map  locations={appContext.locations}/>
    </>
  );
}
