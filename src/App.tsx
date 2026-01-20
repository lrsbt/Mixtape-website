import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import "@app/assets/css/styles.css";

import { queryClient } from "@app/hooks/query/queryClient";
import { ProtectedRoute } from "@app/components";
import { persister } from "@app/hooks/query";

import { Signup } from "@app/screens/auth/Signup";
import Login from "@app/screens/auth/Login";
import { Logout } from "@app/screens/auth/Logout";
import { MyProfile } from "@app/screens/myProfile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistQueryClientProvider>
  </StrictMode>,
);
