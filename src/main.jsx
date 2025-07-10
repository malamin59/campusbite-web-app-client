import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/router.jsx";
import AuthProvider from "./Providers/AuthProviders.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);

/* https://docs.google.com/document/d/1M_GXG7kZsX8Ewz51CMj2IphMxdBVmMRX3NiQypS6jQA/edit?tab=t.0#heading=h.gyz005tzx4ih */

// @headlessui/react