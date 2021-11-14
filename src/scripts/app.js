import { createGUI } from "./helpers.js";

const supportedMethods = ["get", "post", "put", "delete"];

const body = document.body;

body.appendChild(createGUI(supportedMethods));
