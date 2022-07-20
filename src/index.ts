const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const path = require("path");
const { app, BrowserWindow } = require("electron");

const eApp = app
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

eApp.whenReady().then(() => {
  createWindow();

  eApp.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

eApp.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    eApp.quit();
  }
});