"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { startProgress } from "../Core/signalRService";
import { useAppContext } from "../providers/app.provider";

export default function ProgressPage() {
  const appContext = useAppContext();

  return (
    <>
      <Progress
        aria-label="Downloading..."
        size="md"
        value={appContext.progress}
        color="primary"
        showValueLabel={true}
        className="max-w-md"
      />
      <Button className="mt-5" onClick={() => startProgress()}>
        Start Long Running Process
      </Button>
    </>
  );
}
