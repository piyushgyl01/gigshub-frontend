import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import PostJob from "./pages/PostJob.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/:jobTitle/:jobID",
        element: <JobDetails />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
