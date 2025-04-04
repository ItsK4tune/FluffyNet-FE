import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/reset-password";
import { Index } from "./pages";
import { App } from "./app";
import { Setting } from "./pages/setting";
import { VerifyEmail } from "./pages/verify-email";
import { Callback } from "./pages/callback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Index /> },
      { path: "setting", element: <Setting /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify", element: <VerifyEmail /> }, 
      { path: "google/callback", element: <Callback />},
    ],
  },
]);
