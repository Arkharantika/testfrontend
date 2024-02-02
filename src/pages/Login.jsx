import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/AuthSlice";
import { getMe } from "../features/AuthSlice";

// >>> IMPORT MATERIAL ITEMS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// >>> COPYRIGHT ITEM
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Rifqi Paradisa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/home");
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [isError, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    console.log("hello login!");
    dispatch(LoginUser({ email, password }));
  };

  // const Auth = async (e) => {
  //   // var axios = require("axios");

  //   e.preventDefault();
  //   try {
  //     // // var axios = require('axios');
  //     // var data = JSON.stringify({
  //     //   email: email,
  //     //   password: password,
  //     // });

  //     // var config = {
  //     //   method: "post",
  //     //   url: "http://localhost:5000/login",
  //     //   headers: {
  //     //     "User-Agent": "Apidog/1.0.0 (https://www.apidog.com)",
  //     //     "Content-Type": "application/json",
  //     //     Accept: "*/*",
  //     //     Host: "localhost:5000",
  //     //     Connection: "keep-alive",
  //     //   },
  //     //   data: data,
  //     // };

  //     // axios(config)
  //     //   .then(function (response) {
  //     //     console.log(JSON.stringify(response.data));
  //     //     return history("/dashboard");
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.log(error);
  //     //   });

  //     const masuk = await axios.post("http://localhost:5000/login", {
  //       email: email,
  //       password: password,
  //     });
  //     if (masuk) return navigate("/home");
  //     navigate("/home");
  //   } catch (error) {
  //     if (error.response) {
  //       setMsg(error.response.data.msg);
  //     }
  //   }
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            PPG Alkarima
          </Typography>
          <Box component="form" onSubmit={Auth} noValidate sx={{ mt: 1 }}>
            {isError && <p className="text-danger text-center">{message}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ID"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? "Loading..." : "Sign in "}
              Masuk
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
