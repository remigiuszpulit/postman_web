import { createGUI } from "./helpers.js";

const supportedMethods = ["get", "post"];

const body = document.body;

body.appendChild(createGUI(supportedMethods));
