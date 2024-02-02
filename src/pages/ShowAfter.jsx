// import Layout from "../components/Layout";
import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const ShowAfter = () => {
  let [students, setStudents] = useState([]);
  let [namaKelas, setNamaKelas] = useState("");
  const { id } = useParams();
  const { datenya } = useParams();

  const columns = [
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
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="action">
            <button
              className="btn btn-sm btn-success "
              onClick={() => {
                isiHadir(params.row.id);
              }}
            >
              Hadir
            </button>
            <button
              className="btn btn-sm btn-warning "
              onClick={() => {
                isiIzin(params.row.id);
              }}
            >
              Izin
            </button>
            <button
              className="btn btn-sm btn-danger "
              onClick={() => {
                console.log(params.row.id);
              }}
            >
              Alfa
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
    const response = await axios.get(`http://51.120.7.180:5000/kelas/${id}`);
    console.log(response.data);
    setNamaKelas(response.data.nama_kelas);
    return response;
  };

  const getMurid = async () => {
    const response = await axios.get(
      `http://51.120.7.180:5000/showafter/${id}/${datenya}`
    );
    console.log("response");
    console.log(response);
    // console.log("http://51.120.7.180:5000/muridkelas/", id);
    setStudents(response.data);
  };

  const isiHadir = async (meong) => {
    const response = await axios.patch(`http://51.120.7.180:5000/isipresensi`, {
      statusnya: "hadir",
      idPresensi: meong,
    });
    getMurid();
    console.log(meong);
  };

  const isiIzin = async (meong) => {
    const response = await axios.patch(`http://51.120.7.180:5000/isipresensi`, {
      statusnya: "izin",
      idPresensi: meong,
    });
    getMurid();
    console.log(meong);
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>
            Isi Absensi {namaKelas} tanggal {datenya}
          </h3>
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

export default ShowAfter;
