import {
  ActivateAccount,
  Animals,
  Home,
  Login,
  ResetPassword,
  ShelterPanel,
  Shelters,
  Signup,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout, PrivateRoute } from "./components";

import React from "react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Signup />} />
          <Route
            path="/aktywacja-konta/:uid/:token"
            element={<ActivateAccount />}
          />
          <Route
            path="/resetowanie-hasła/:uid/:token"
            element={<ResetPassword />}
          />
          <Route path="/zwierzęta" element={<Animals />} />
          <Route path="/schroniska" element={<Shelters />} />

          {/* User panel */}
          <Route path="/profil" element={<ShelterPanel />} />
        </Routes>
      </Layout>
      <ToastContainer position="top-center" closeOnClick />
    </BrowserRouter>
  );
}

export default App;
