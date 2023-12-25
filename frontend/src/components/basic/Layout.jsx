import { Footer, Header } from "..";

import React from "react";
import { loadUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[min-content,1fr,min-content] bg-cream font-sans">
      <Header />
      <div className="flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
