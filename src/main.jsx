import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import About from "./Pages/About.jsx";
import Admin from "./Pages/Admin.jsx";
import History from "./Pages/History.jsx";
import Contact from "./Pages/Contact.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import AdminRoute from "./Pages/AdminRoute.jsx";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <h1>Page not found Please check your url</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routerVariables} />
  </StrictMode>
);
