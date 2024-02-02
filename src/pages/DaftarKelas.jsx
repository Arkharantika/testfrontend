import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const DaftarKelas = () => {
  let [kelas, setKelas] = useState([]);
  useEffect(() => {
    getKelas();
    // RefreshToken();
  }, []);

  const getKelas = async () => {
    const response = await axios.get("http://51.120.7.180:5000/kelas");
    console.log(response.data);
    setKelas(response.data);
  };
  return (
    <Layout>
      <div class="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Daftar Kelas </h3>
          <hr />
        </div>
        <Link to={"/buatkelas"} className="mb-2 btn btn-xl btn-success">Tambah Kelas Baru</Link>
        <div class="row">
          {kelas.map((parameter) => {
            return (
              <div class="col-md-4 mb-3">
                <Link
                  to={`/infokelas/${parameter.id}`}
                  class="card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card-header bg-info"></div>
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

export default DaftarKelas;
