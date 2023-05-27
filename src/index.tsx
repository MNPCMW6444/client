import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(() => {
    console.log("PWA Service Worker Registered");
  });
}

// Code to handle install prompt on desktop

// let deferredPrompt: any;
//const addBtn: any = document.querySelector(".add-button");
//addBtn.style.display = "none";      //////     CAN BE USED TO IMPROVE iOS UX

window.addEventListener("beforeinstallprompt", (e) => {
  //////     CAN BE USED TO IMPROVE iOS UX
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  // deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  //addBtn.style.display = "block";      //////     CAN BE USED TO IMPROVE iOS UX

  /*addBtn.addEventListener("click", () => {    
    // hide our user interface that shows our A2HS button
    //addBtn.style.display = "none";      
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });*/ /////     CAN BE USED TO IMPROVE iOS UX
});
