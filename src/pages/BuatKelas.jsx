import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const BuatKelas = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const history = useNavigate();

  const newKelas = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/kelas`, {
        nama_kelas: namaKelas,
        deskripsi: deskripsi,
      });
      history("/daftarkelas");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
      <div className="text-center mt-2">
          <hr />
          <h3>Buat Kelas Baru</h3>
          <hr />
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="mt-4">Buat Kelas Baru</h3>
            <form onSubmit={newKelas}>
              <span className="text-danger"></span>

              <div className="form-group mt-1">
                <label>Nama Kelas</label>
                <input
                  type="text"
                  className="form-control"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Deskripsi</label>
                <input
                  type="text"
                  className="form-control"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3 mb-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuatKelas;
