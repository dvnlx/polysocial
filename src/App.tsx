import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn, SignOut } from "./components/AuthSys";
import { ImageMenu } from "./components/mainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { VideoMenu } from "./components/mainMenu";
import "firebase/firestore";
import "firebase/auth";
import React from "react";
import { TOS } from "./pages/tos";
import { auth } from "./firebase-config";
import { NvgUI } from "./pages/novagon_ui";
import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Profile } from "./pages/profile";
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
          <button onClick={() => {
            setAppMenuOpen(appMenuOpen => !appMenuOpen)
          }}>
            <img src="https://novagoncdn.netlify.app/img/nvgweb/Project%20Novagon%20Logo%403x.png" alt="" className="w-16 rounded-lg" />
          </button>
          <h1 className='text-xl font-bold font-albertsans md:block hidden'>Novagon Web</h1>
        </div>
        <SignOut auth={auth} />
      </header>
      <AppMenu appMenuOpen={appMenuOpen} closeAppMenu={() => setAppMenuOpen(false)} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageUI />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/ui" element={<NvgUI />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

interface appMenuProps {
  appMenuOpen: Boolean,
  closeAppMenu: () => void
}
function AppMenu({ appMenuOpen, closeAppMenu }: appMenuProps) {
  const [user] = useAuthState(auth);
   if (!appMenuOpen) {
   return null;
   }
  return (
    <div className="fixed z-50 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-lg flex md:justify-start md:items-start justify-center items-center">
      <div className="dark:bg-gray-secondary bg-white h-screen m-4 md:w-96 w-screen rounded-lg p-4 space-y-4">
        <button onClick={closeAppMenu}>
          <XMarkIcon className="w-8 hover:stroke-primaryBlue-primary hover:stroke-2 stroke-1 transition" />
        </button>
        {user ?
          <h1 className="items-center flex gap-1 text-3xl">Hello, <div className="inline-flex justify-center items-center gap-2">{user.photoURL && <img src={user.photoURL} alt="User Photo" className="w-8 h-8 rounded-full "/>}{user.displayName ? <h1>{user.displayName}!</h1> : <h1>Guest</h1>}</div></h1> : <h1>Hello!</h1>}
        <div className="block space-y-2">
          <a href="/" className="block">Images</a>
          <a href="/videos" className="block">Videos</a>
          <a href="/wip" className="block"> [WIP] Chat</a>
          <a href="/wip" className="md:hidden block">[WIP] QuiShots</a>
          <a href="/profile" className="block">[WIP]You</a>
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
function ProfileInit() {
  const [user] = useAuthState(auth);

  return (
    <>
      <section className="p-6">
        {user ? <Profile /> : <SignIn />}
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
        {user ? <VideoMenu user={user} /> : <SignIn />}
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
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3 text-center">
          <div>
            <QuestionMarkCircleIcon className="w-9" />
          </div>
          <div>
            <h1 className="text-4xl font-bold transition-all hover:text-primaryBlue-primary">503</h1>
            <p>Hey There! Novagon Web is temporarely down for maintenance.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
