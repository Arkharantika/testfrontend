import Layout from "../components/Layout";
import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DaftarSiswa = () => {
  let [students, setStudents] = useState([]);
  let nomor = 0;

  const columns = [
    // {
    //   field: "no",
    //   headerName: "no",
    //   width: 50,
    //   renderCell: (params) => {
    //     nomor = (nomor +0.5);
    //     // console.log("iteratornya =", params.row);
    //     return <>{nomor-2}</>;
    //   },
    // },
    { field: "nama_lengkap", headerName: "Nama Lengkap", width: 150 },
    { field: "gender", headerName: "Gender", width: 125 },
    { field: "kelompok", headerName: "Kelompok", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <Link
              to={`/editsiswa/${params.row.id}`}
              onClick={() => {
                console.log(params.row.nama_lengkap);
              }}
              className="btn btn-sm btn-warning "
            >
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                deleteStudent(params.row.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getStudents();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://51.120.7.180:5000/siswa");
  //     setStudents(response.data);
  //   };

  //   fetchData(); // Call the fetchData function directly
  // }, []); 

  const deleteStudent = async (idnya) => {
    console.log(idnya);
    const response = await axios.delete(`http://51.120.7.180:5000/siswa/${idnya}`);
    console.log(response.data);
    getStudents();
  };

  const getStudents = async () => {
    const response = await axios.get("http://51.120.7.180:5000/siswa");
    console.log(response.data);
    setStudents(response.data);
  };
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Database Siswa</h3>
          <hr />
        </div>
        <Grid item xs={12}>
          <Link to="/addsiswa" className="btn btn-sm btn-success mb-3">
            Tambah Siswa
          </Link>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Datatable columns={columns} rows={students} />
          </Paper>
        </Grid>
      </div>
    </Layout>
  );
};

export default DaftarSiswa;
