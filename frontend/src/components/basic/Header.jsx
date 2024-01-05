import { Avatar, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import React from "react";
import { isAuthenticated } from "../../utils/auth";
import { logout } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const guestLinks = () => {
    return (
      <div className="flex items-center gap-3">
        <p className="font-bold">Dla schronisk</p>
        <Link to="/logowanie" className="btn btn-primary">
          Zaloguj się
        </Link>
      </div>
    );
  };

  const authLinks = () => {
    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="profil">
              <Link to="/profil">Profil</Link>
            </Menu.Item>
            <Menu.Item key="dodane zwierzęta">
              <Link to="/dodane-zwierzęta">Dodane zwierzęta</Link>
            </Menu.Item>
            <Menu.Item key="aplikacje">
              <Link to="/aplikacje">Aplikacje o adopcję</Link>
            </Menu.Item>
            <Menu.Item key="wyloguj" onClick={handleLogout}>
              Wyloguj się
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
        className="h-full"
        arrow
      >
        <div className="flex cursor-pointer items-center justify-center gap-2">
          <Avatar
            alt="user"
            src={
              user?.profile?.image
                ? user?.profile?.image
                : require("../../assets/user_placeholder.jpg")
            }
            size={50}
            className="flex items-center justify-center"
          />
          <IoIosArrowDown size="20px" />
        </div>
      </Dropdown>
    );
  };

  return (
    <header className="sticky left-0 top-0 z-10 flex h-[80px] w-full items-center bg-rosewater px-10 py-3">
      <div className="container flex justify-between">
        <div className="flex items-center gap-5">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={require("../../assets/logo.png")}
                alt="logo"
                className="h-12"
              />
              <h1 className="text-2xl font-bold leading-none text-cherry">
                Adoptable
              </h1>
            </div>
          </Link>
          <ul className="flex">
            <li className="p-2 font-bold text-black">
              <Link to="/zwierzęta">Zwierzęta</Link>
            </li>
            <li className="p-2 font-bold text-black">
              <Link to="/schroniska">Schroniska</Link>
            </li>
          </ul>
        </div>
        <div className="">{isAuthenticated() ? authLinks() : guestLinks()}</div>
      </div>
    </header>
  );
};

export default Header;
