import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/reset-password";
import { AuthCallback } from "./pages/call-back";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    //   { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "auth/callback", element: <AuthCallback /> }, 
    ],
  },
]);
