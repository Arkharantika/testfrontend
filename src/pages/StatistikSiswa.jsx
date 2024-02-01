import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const StatistikSiswa = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const [namaSiswa, setNamaSiswa] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [pie, setPie] = useState([]);
  const [Stat, setStat] = useState([]);
  const [endDate, setEndDate] = useState("");
  const { id, kelasnya } = useParams();
  useEffect(() => {
    checkKelas();
    checkDia();
    // checkListAbsensi();
  }, []);

  const getStat = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`http://localhost:5000/statperson`, {
      //   startDate: startDate,
      //   endDate: endDate,
      //   kelaId: kelasnya,
      //   siswaId: id,
      // });
      // console.log("response.data");
      // setStat(response.data); // Assuming the response is an array
      // console.log(Stat); // Assuming the response is an array

      const pieResponse = await axios.post(`http://localhost:5000/statperson`, {
        startDate: startDate,
        endDate: endDate,
        kelaId: kelasnya,
        siswaId: id,
      });
      console.log("pie data");
      setPie(pieResponse.data[0]);
      console.log(pieResponse.data[0]);
      console.log("meong");

      const response = await axios.post(
        `http://localhost:5000/statperson/${id}/${kelasnya}`,
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      console.log(response.data);
      setStat(response.data);
      //   console.log(pie.total)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkDia = async () => {
    // console.log(idnya);
    const response = await axios.get(`http://localhost:5000/siswa/${id}`);
    console.log(response.data);
    setNamaSiswa(response.data.nama_lengkap);
    // setDeskripsi(response.data.deskripsi);
    return response;
  };
  const checkKelas = async () => {
    // console.log(idnya);
    const response = await axios.get(`http://localhost:5000/kelas/${kelasnya}`);
    console.log(response.data);
    setNamaKelas(response.data.nama_kelas);
    setDeskripsi(response.data.deskripsi);
    return response;
  };

  const checkListAbsensi = async () => {
    const response = await axios.get(
      `http://localhost:5000/statperson/${id}/${kelasnya}`
    );
    console.log(response.data);
    setStat(response.data);
    // setDeskripsi(response.data.deskripsi);
    return response;
  };
  const pieChartData = {
    series: [
      pie.hadir ? pie.hadir : 0,
      pie.izin ? pie.izin : 0,
      pie.alfa ? pie.alfa : 0,
    ],
    labels: ["Total Hadir", "Izin", "Alfa/tanpa keterangan"],
  };
  const column = [
    { field: "tanggal", headerName: "Tanggal", width: 150 },
    { field: "status", headerName: "Keterangan", width: 150 },
  ];
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>
            Statistik <b> {namaSiswa}</b> di Kelas <b>{namaKelas} </b>
          </h3>
          <hr />
        </div>

        <div className="card mb-2">
          <div className="card-body">
            <form className="d-flex" onSubmit={getStat}>
              <div className="form-group mt-1">
                <label>Tanggal Mulai</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-sm-3 mb-2 mt-1">
                <label>Tanggal Akhir</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-sm-3 mb-2 mt-1">
                <label></label>
                <button
                  type="submit"
                  className="form-control bg-primary text-white"
                >
                  Check
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-body text-center">
            Total Persentase
            <div className="mt-4">
              <Chart
                options={{ labels: pieChartData.labels }}
                series={pieChartData.series}
                type="pie"
              />
              {/* <Chart options={options} series={series} type="pie" width="380" /> */}
            </div>
          </div>
        </div>
        <div className="card mt-2">
          <Grid item xs={12}>
            <div className="text-center mt-2">
              <h5> Presensi</h5>
            </div>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Datatable columns={column} rows={Stat} />
            </Paper>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default StatistikSiswa;
