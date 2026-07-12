"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/profile">Profile</Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link href="/account">Account</Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link href="/orders">Orders</Link>
        </MenuItem>

        <MenuItem
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}