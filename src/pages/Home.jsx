// import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const Home = () => {
  const [role, setRole] = useState("");
  const [nama, setNama] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();

  useEffect(() => {
    RefreshToken();
  }, []);

  // >>> REFRESH TOKEN
  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://51.120.7.180:5000/token");
      const decoded = jwtDecode(response.data.newAccessToken);
      console.log(decoded);
      setToken(response.data.newAccessToken);
      setRole(decoded.role);
      setNama(decoded.name);
    } catch (error) {
      if (error.response) {
        history("/login");
      }
      console.log(error);
    }
  };
  return (
    
      <Layout>
        <div>
        Wellcome To Information System Alkarima {nama}
        </div>
      </Layout>
  );
};

export default Home;
