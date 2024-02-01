import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const PilihKelasAbsen = () => {
  let [kelas, setKelas] = useState([]);
  useEffect(() => {
    getKelas();
    // RefreshToken();
  }, []);

  const getKelas = async () => {
    const response = await axios.get("http://localhost:5000/kelas");
    console.log(response.data);
    setKelas(response.data);
  };
  return (
    <Layout>
      <div class="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Pilih Kelas Untuk Absen </h3>
          <hr />
        </div>
        <div class="row">
          {kelas.map((parameter) => {
            return (
              <div class="col-md-4 mb-3">
                <Link
                  to={`/pilihtanggalabsen/${parameter.id}`}
                  class="card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card-header bg-warning"></div>
                  <div class="card-body">
                    <h5 class="card-title mb-1">{parameter.nama_kelas}</h5>
                    {/* <p class="card-text"></p> */}
                    <h6 class="card-subtitle mb-2 text-muted">
                      {parameter.deskripsi}
                    </h6>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default PilihKelasAbsen;
