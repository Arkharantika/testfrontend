// import Layout from "../components/Layout";
import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const DaftarMuridKelas = () => {
  let [students, setStudents] = useState([]);
  let [namaKelas, setNamaKelas] = useState("");
  const { id } = useParams();

  const columns = [
    { field: "nama_lengkap", headerName: "Nama Lengkap", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <button
              className="btn btn-sm btn-success "
              onClick={() => {
                daftarkan(params.row.id);
              }}
            >
              Masukan Murid ini
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getMurid();
    checkKelas();
  }, []);

  const checkKelas = async () => {
    // console.log(idnya);
    const response = await axios.get(`http://localhost:5000/kelas/${id}`);
    console.log(response.data);
    setNamaKelas(response.data.nama_kelas);
    return response;
  };

  const daftarkan = async (idnya) => {
    console.log(idnya);
    const response = await axios.patch(`http://localhost:5000/masukanmurid/`, {
      siswaId: idnya,
      kelaId: id,
    });
    console.log(response.data);
    getMurid();
  };

  const getMurid = async () => {
    const response = await axios.get(`http://localhost:5000/muridkelas/${id}`);
    console.log("murid kelas");
    console.log("http://localhost:5000/muridkelas/", id);
    setStudents(response.data);
  };
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Masukan Murid Untuk Kelas {namaKelas}</h3>
          <hr />
        </div>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={columns} rows={students} />
          </Paper>
        </Grid>
      </div>
    </Layout>
  );
};

export default DaftarMuridKelas;
