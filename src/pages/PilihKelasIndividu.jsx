import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const PilihKelasIndividu = () => {
  let [kelas, setKelas] = useState([]);
  const [siswanya, setSiswanya] = useState("");
  const { id } = useParams();
  useEffect(() => {
    getKelas();
    getSiswa();
    // RefreshToken();
  }, []);

  const getKelas = async () => {
    const response = await axios.get(`http://localhost:5000/cekkelas/${id}`);
    console.log(response.data);
    setKelas(response.data);
  };

  const getSiswa = async () => {
    const response = await axios.get(`http://localhost:5000/siswa/${id}`);
    console.log(response.data);
    setSiswanya(response.data.nama_lengkap);
  };
  return (
    <Layout>
      <div class="container">
        <div className="text-center mt-2">
          <hr />
          <h3>
            Pilih Kelas Untuk Lihat Statistik <b>{siswanya}</b>
          </h3>
          <hr />
        </div>
        <div class="row">
          {kelas.map((parameter) => {
            return (
              <div class="col-md-4 mb-3">
                <Link
                  to={`/statistik/individu/${id}/${parameter.id}`}
                  class="card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card-header bg-success"></div>
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

export default PilihKelasIndividu;
