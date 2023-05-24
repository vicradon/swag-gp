import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./custom-bootstrap.scss";
import Levels from "pages/Levels/Levels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Levels />,
  },
  {
    path: "/levels",
    element: <Levels />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
