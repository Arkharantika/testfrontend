import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const RegistrasiMurid = () => {
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
        {/* <div className="text-center">
          <h3>Pilih kelas untuk masukan murid : </h3>
        </div> */}
        <div className="text-center mt-2">
          <hr />
          <h3>Pilih kelas untuk masukan murid :</h3>
          <hr />
        </div>
        <div class="list-group">
          {kelas.map((parameter) => {
            return (
              <div class="list-group-item list-group-item-action list-group-item-primary">
                <Link
                  to={`${parameter.id}`}
                  class="card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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

export default RegistrasiMurid;
