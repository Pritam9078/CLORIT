import "./crypto-polyfill";
import "./polyfills";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enhanced error handling for wallet-related errors
const originalError = console.error;
console.error = (...args) => {
  const message = args[0]?.toString() || '';
  
  // Filter out specific wallet extension errors that don't affect functionality
  if (
    message.includes('crypto.randomUUID is not a function') ||
    message.includes('Cannot redefine property: ethereum') ||
    message.includes('Unable to set window.solana') ||
    message.includes('Unable to set window.phantom') ||
    message.includes('evmAsk.js') ||
    message.includes('inpage.js') ||
    message.includes('contentscript.js')
  ) {
    return; // Suppress these specific errors
  }
  
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
