import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/reset-password";
import { AuthCallback } from "./pages/call-back";
import { Index } from "./pages";
import { App } from "./app";
import { Setting } from "./pages/setting";
import { VerifyEmail } from "./pages/verify-email";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Index /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "auth/callback", element: <AuthCallback /> }, 
  { path: "verify", element: <VerifyEmail /> }, 
]);
