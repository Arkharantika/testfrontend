import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const InfoKelas = () => {
  let [students, setStudents] = useState([]);
  let [daftar, setDaftar] = useState([]);
  let [namaKelas, setNamaKelas] = useState("");
  let [deskripsi, setDeskripsi] = useState("");
  const { id } = useParams();

  const columns = [
    { field: "nama_lengkap", headerName: "Nama Lengkap", width: 200 },
    { field: "gender", headerName: "Gender", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <button
              className="btn btn-sm btn-danger "
              onClick={() => {
                // daftarkan(params.row.id);
                alert("apakah anda yakin ?");
              }}
            >
              keluarkan dari kelas ini
            </button>
          </div>
        );
      },
    },
  ];

  const column2 = [
    {
      field: "name",
      headerName: "Nama Lengkap",
      width: 150,
      renderCell: (params) => {
        const name = params.row.siswa.nama_lengkap;
        return <>{name}</>;
      },
    },
    {
      field: "status",
      headerName: "Keterangan",
      width: 200,
      renderCell: (params) => {
        const statusnya = params.row.status;
        return <>{statusnya}</>;
      },
    },
    { field: "tanggal", headerName: "Tanggal", width: 200 },
    // { field: "tanggal", headerName: "Tanggal", width: 200 },
  ];

  useEffect(() => {
    getMurid();
    checkKelas();
    getListAbsen();
  }, []);

  const checkKelas = async () => {
    // console.log(idnya);
    const response = await axios.get(`http://51.120.7.180:5000/kelas/${id}`);
    console.log(response.data);
    setNamaKelas(response.data.nama_kelas);
    setDeskripsi(response.data.deskripsi);
    return response;
  };

  const daftarkan = async (idnya) => {
    console.log(idnya);
    const response = await axios.patch(`http://51.120.7.180:5000/masukanmurid/`, {
      siswaId: idnya,
      kelaId: id,
    });
    console.log(response.data);
    getMurid();
  };

  const getMurid = async () => {
    const response = await axios.get(
      `http://51.120.7.180:5000/listmuridkelas/${id}`
    );
    console.log("murid kelas");
    console.log("http://51.120.7.180:5000/muridkelas/", id);
    setStudents(response.data);
  };

  const getListAbsen = async () => {
    const datanya = await axios.get(
      `http://51.120.7.180:5000/daftarpresensi/${id}`
    );
    setDaftar(datanya.data);
    console.log("datanya");
    console.log(datanya);
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Info Kelas {namaKelas}</h3>
          <hr />
        </div>
        <div className="card mb-3">
          <div className="card-header"></div>
          <div className="card-body">{deskripsi}</div>
        </div>
        <div className="text-center mb-3">
          <h5>Daftar Murid Kelas Ini :</h5>
        </div>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={columns} rows={students} />
          </Paper>
        </Grid>
        <div className="text-center mt-3 mb-3">
          <h5>Daftar Presensi :</h5>
        </div>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={column2} rows={daftar} />
          </Paper>
        </Grid>
      </div>
    </Layout>
  );
};

export default InfoKelas;
