import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/reset-password";
import { Index } from "./pages";
import { App } from "./app";
import { Setting } from "./pages/setting";
import { VerifyEmail } from "./pages/verify-email";
import { Callback } from "./pages/callback";
import { Friend } from "./pages/friends";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Index /> },
      { path: "login", element: <Login /> },
      { path: "setting", element: <Setting /> },
      { path: "callback", element: <Callback />},
      { path: "friends", element: <Friend />}, 
    ],
  },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "verify", element: <VerifyEmail /> }, 
]);
