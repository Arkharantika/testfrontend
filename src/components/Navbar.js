// import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// >>> IMPORT MATERIAL ITEMS
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Divider from "@mui/material/Divider";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Navbar = () => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();

  useEffect(() => {
    RefreshToken();
  }, []);

  // >>> REFRESH TOKEN
  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      const decoded = jwtDecode(response.data.newAccessToken);
      console.log(decoded);
      setToken(response.data.newAccessToken);
      setRole(decoded.role);
    } catch (error) {
      if (error.response) {
        history("/login");
      }
      console.log(error);
    }
  };

  // >>> LOGOUT FUNCTIONALITY
  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton href="/home">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItemButton>

      <ListItemButton href="/pilihkelasabsen">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Absensi KBM" />
      </ListItemButton>

      <ListItemButton href="/siswa">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Database Siswa" />
      </ListItemButton>

      {/* <ListItemButton href="/buatkelas">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Buat Kelas" />
      </ListItemButton> */}

      <ListItemButton href="/daftarkanmurid">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Masukan Murid" />
      </ListItemButton>

      <ListItemButton href="/daftarkelas">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Daftar Kelas" />
      </ListItemButton>

      <ListItemButton href="/statistik">
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Statistik " />
      </ListItemButton>

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        Keluar
      </ListSubheader>
      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default Navbar;
