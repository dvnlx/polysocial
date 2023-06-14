import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { ImageMenu } from "./components/mainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { VideoMenu } from "./components/mainMenu";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import "./App.css";
import { TOS } from "./pages/tos";
import { auth } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { useState } from "react";
//// import { ChatRoom } from "./components/chat/chatRoom";

// Initialize Firebase
// TODO: fix this shit
console.log("%cStop!",
"color:red;font-family:'Albert Sans', sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
console.log("This is a Browser Featuer made for Developers. \nif someone asks you to copy-paste something here, then is its a %c100%",
"font-weight: 700;",
"scam."
)
function App() {
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  return (
    <>
      <header className='sticky top-0 flex items-center justify-between gap-0 p-4 dark:bg-zinc-900 bg-zinc-50'>
        <div className="flex items-center space-x-4">
          <button onClick={(e) =>{  
            e.preventDefault();
            setAppMenuOpen(!appMenuOpen) }}>
          <img src="https://novagoncdn.netlify.app/img/nvgweb/Project%20Novagon%20Logo%403x.png" alt="" className="w-16 rounded-lg" />
          </button>
          <h1 className='text-xl font-bold font-albertsans md:block hidden'>The Novagon App</h1>
        </div>
        <SignOut auth={auth} />
      </header>
      <AppMenu appMenuOpen={appMenuOpen} closeAppMenu={() => setAppMenuOpen(false)}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageUI />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/chat" element={<WorkInProgress/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/maintenance" element={<Maintenance/>} />
          <Route path="/ui" element={<NvgUI/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

interface appMenuProps {
  appMenuOpen: Boolean,
  closeAppMenu: () => void
}
function AppMenu({appMenuOpen, closeAppMenu}: appMenuProps){
  if (!appMenuOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 left-0 top-0 w-full h-full flex sm:items-center sm:p-0 p-4 items-end justify-center bg-black bg-opacity-50 backdrop-blur-lg">
    <div className="space-y-2">
      <div className="flex items-center justify-between dark:bg-zinc-800 bg-zinc-300 rounded-full space-x-16 p-2">
      <h2 className="text-2xl font-bold self-center ml-2">Account Banned</h2>
        <button onClick={closeAppMenu} className="w-16 h-8 text-sm font-bold transition-all rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-500">
          Close
        </button>
      </div>
      <div className="dark:bg-zinc-800 bg-zinc-300 rounded-3xl p-4">
      <p>Hello. Your account has been banned.</p>
      <p>Reason: Unknown.</p>
      <p>If you think its a mistake, or have any questions, <a href="mailto:contactnovagon@gmail.com" className="underline">Contact Us.</a></p>
      </div>

    </div>
  </div>
  )
}
function ImageUI() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-6">
        {user ? <ImageMenu user={user} /> : <SignIn />}
      </section>
    </>
  );
}
function Videos() {
  const [user] = useAuthState(auth);
  return (
    <>
      <section className="p-6">
        {user ? <VideoUI /> : <SignIn />}
      </section>
    </>
  );
}
function VideoUI() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-6">
        {user ? <VideoMenu user={user}/> : <SignIn/> }
      </section>
    </>
  )
}
function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">404</h1>
            <p>Not Found</p>
            <a href="/" className="transition hover:underline text-primaryBlue-primary">Go Back</a>
          </div>
        </div>
      </div>
    </>
  )
}
function WorkInProgress() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">501</h1>
            <p>Work in progress</p>
            <a href="/" className="transition hover:underline text-primaryBlue-primary">Go Back</a>
          </div>
        </div>
      </div>
    </>
  )
}
function Maintenance() { 
  return(
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-3 text-center">
        <div>
          <QuestionMarkCircleIcon className="w-9" />
        </div>
        <div>
          <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">503</h1>
          <p>Hey There! The novagon app is temporarely down for maintenance.</p>
        </div>
      </div>
    </div>
  </>
  )
}
export default App;
