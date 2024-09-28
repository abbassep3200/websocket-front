/* eslint-disable prettier/prettier */
import * as signalR from "@microsoft/signalr";
import { Location } from "../providers/app.provider";

export let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  setProgress: (value: number) => void,
  addLocation: (location: Location) => void
) => {
  if (connection) return;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://websocket-api.classbon.com/hub") // API URL endpoint for SignalR
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Error)
    .build();

  try {
    await connection.start();
    console.log("SignalR connected.");
  } catch (err) {
    console.error("SignalR connection error:", err);
  }

  // Handle received messages
  connection.on("ReceiveProgress", (message: string) => {
    const progressValue = parseInt(message, 10);
    setProgress(progressValue);
  });

  connection.on("ReceiveLocation", (message: any) => {
    try {
      console.log(message);
      const location = message as Location;
      addLocation(location);
    } catch (error) {
      console.error("Error parsing location message:", error);
    }
  });

  // Handle connection closed
  connection.onclose(async () => {
    console.log("SignalR disconnected. Reconnecting...");
    await reconnect();
  });
};

const reconnect = async () => {
  if (connection) {
    try {
      await connection.start();
      console.log("SignalR reconnected.");
    } catch (err) {
      console.error("SignalR reconnection error:", err);
    }
  }
};

export const startProgress = async () => {
  console.log('start')
  if (connection?.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke("StartLongRunningTask");
    } catch (err) {
      console.error("SignalR send message error:", err);
    }
  }
};

export const startTracking = async () => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke("startTracking");
    } catch (err) {
      console.error("SignalR send message error:", err);
    }
  }
};
