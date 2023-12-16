import { useDispatch, useSelector } from "react-redux";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { isAuthenticated } from "../../utils/auth";
import { logout } from "../../features/user/userSlice";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const guestLinks = () => {
    return (
      <ul className="flex gap-3">
        <li className="btn border-2 border-solid border-cherry bg-cherry text-cream">
          <Link to="/logowanie">Zaloguj się</Link>
        </li>
        <li className="btn border-2 border-solid border-cherry text-cherry">
          <Link to="/rejestracja">Zarejestruj się</Link>
        </li>
      </ul>
    );
  };
  const authLinks = () => {
    return (
      <div>
        <IconButton onClick={handleClick}>
          <Avatar alt="user image" src={user?.profile?.image} />
          <ArrowDropDownIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link to="/profil">Profil</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <header className="sticky left-0 top-0 flex h-[80px] w-full items-center bg-rosewater px-10 py-3">
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
