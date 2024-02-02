// import Layout from "../components/Layout";
import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const DashboardStatistik = () => {
  let [siswa, setSiswa] = useState([]);
  let [kelas, setKelas] = useState([]);

  const getStudents = async () => {
    const response = await axios.get("http://51.120.7.180:5000/siswa");
    console.log(response.data);
    setSiswa(response.data);
  };

  const getKelas = async () => {
    const response = await axios.get("http://51.120.7.180:5000/kelas");
    console.log(response.data);
    setKelas(response.data);
  };

  const column1 = [
    { field: "nama_lengkap", headerName: "Nama Lengkap", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link
              className="btn btn-sm btn-info "
              to={`individu/${params.row.id}`}
            >
              lihat Statistik
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getKelas();
    getStudents();
  }, []);

  const column2 = [
    { field: "nama_kelas", headerName: "Nama Lengkap", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link
              className="btn btn-sm btn-info "
              to={`kelas/${params.row.id}`}
            >
              lihat Statistik
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>HALAMAN DASHBOARD STATISTIK</h3>
          <hr />
        </div>
        <Grid item xs={12}>
          <div className="text-center">
            <h5>Pilih Siswa :</h5>
          </div>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={column1} rows={siswa} />
          </Paper>
        </Grid>
        <div>
          <hr />
        </div>
        <Grid item xs={12}>
          <div className="text-center">
            <h5> Pilih Kelas :</h5>
          </div>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={column2} rows={kelas} />
          </Paper>
        </Grid>
      </div>
    </Layout>
  );
};

export default DashboardStatistik;
