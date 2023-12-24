import {
  ActivateAccount,
  Animal,
  Animals,
  Application,
  Applications,
  Home,
  Login,
  ResetPassword,
  Shelter,
  ShelterAnimal,
  ShelterAnimals,
  ShelterProfile,
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
          <Route
            path="/zwierzęta"
            element={<Animals title="Znalezione zwierzęta" />}
          />
          <Route path="/zwierzęta/:id" element={<Animal />} />
          <Route path="/schroniska" element={<Shelters />} />
          <Route path="/schroniska/:id" element={<Shelter />} />
          <Route
            path="/schroniska/:id/zwierzęta"
            element={<Animals title="Znalezione zwierzęta w schronisku" />}
          />

          {/* User panel */}
          <Route
            path="/profil"
            element={
              <PrivateRoute>
                <ShelterProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dodane-zwierzęta"
            element={
              <PrivateRoute>
                <ShelterAnimals />
              </PrivateRoute>
            }
          />
          <Route
            path="/dodane-zwierzęta/nowe"
            element={
              <PrivateRoute>
                <ShelterAnimal type="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/zwierzęta/:id/edycja"
            element={
              <PrivateRoute>
                <ShelterAnimal type="update" />
              </PrivateRoute>
            }
          />
          <Route
            path="/aplikacje"
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/aplikacje/:id"
            element={
              <PrivateRoute>
                <Application />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
      <ToastContainer position="top-center" closeOnClick />
    </BrowserRouter>
  );
}

export default App;
