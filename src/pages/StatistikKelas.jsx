import Datatable from "../components/Datatable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const StatistikKelas = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [pie, setPie] = useState([]);
  const [Stat, setStat] = useState([]);
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    checkKelas();
  }, []);
  const checkKelas = async () => {
    // console.log(idnya);
    const response = await axios.get(`http://localhost:5000/kelas/${id}`);
    console.log(response.data);
    setNamaKelas(response.data.nama_kelas);
    setDeskripsi(response.data.deskripsi);
    return response;
  };
  const { id } = useParams();

  const getStat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/statkelas`, {
        startDate: startDate,
        endDate: endDate,
        kelaId: id,
      });
      console.log("response.data");
      setStat(response.data); // Assuming the response is an array
      console.log(Stat); // Assuming the response is an array

      const pieResponse = await axios.post(
        `http://localhost:5000/percentkelas`,
        {
          startDate: startDate,
          endDate: endDate,
          kelaId: id,
        }
      );
      console.log("pie data");
      setPie(pieResponse.data[0]);
      console.log(pieResponse.data[0]);
      console.log("meong");
      //   console.log(pie.total)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const chartData = {
    labels: Stat.map((entry) => entry.date),
    series: [
      //   {
      //     name: "Total",
      //     data: Stat.map((entry) => entry.total),
      //   },
      {
        name: "Hadir",
        data: Stat.map((entry) => entry.hadir),
      },
      {
        name: "Izin",
        data: Stat.map((entry) => entry.izin),
      },
      {
        name: "Alfa",
        data: Stat.map((entry) => entry.alfa),
      },
    ],
  };

  const pieChartData = {
    series: [
      pie.hadir ? pie.hadir : 0,
      pie.izin ? pie.izin : 0,
      pie.alfa ? pie.alfa : 0,
    ],
    labels: ["Total Hadir", "Izin", "Alfa/tanpa keterangan"],
  };

  const chartOptions = {
    xaxis: {
      categories: Stat.map((entry) => entry.date),
    },
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Statistik Kelas {namaKelas}</h3>
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
        <div className="card">
          <div className="card-body text-center">
            Akumulasi Harian / Tanggal
            <div className="mt-4">
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="bar"
              />
            </div>
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
      </div>
    </Layout>
  );
};

export default StatistikKelas;
