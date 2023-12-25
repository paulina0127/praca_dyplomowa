import React from "react";

const Footer = () => {
  return (
    <footer className="sticky left-0 top-0 w-full bg-rosewater px-10 py-5">
      <div className="container flex items-center justify-center gap-5">
        <img
          src={require("../../assets/logo.png")}
          alt="logo"
          className="mb-2 h-12"
        />
        <div>
          <p>+48 000 000 000</p>
          <p>kontakt@adoptable.pl</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
