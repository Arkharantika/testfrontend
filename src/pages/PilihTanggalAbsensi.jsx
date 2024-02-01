import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const PilihTanggalAbsensi = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const { id } = useParams();
  // const hai = "2000-11-11";

  const newAbsensi = async (e) => {
    e.preventDefault();
    console.log(tanggal);
    try {
      await axios
        .post(`http://localhost:5000/checkuntukabsen`, {
          kelaId: id,
          tanggal: tanggal,
        })
        .then((response) => {
          console.log(response);
          if (response.data.msg) {
            setMsg(response.data.msg);
          } else {
            history(`/showafter/${id}/${tanggal}`);
          }
        })
        .catch((error) => {
          setMsg(error.response.data.msg);
          console.error("Axios Error:", error);
        });
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="text-center mt-2">
          <hr />
          <h3>Buat Absensi Baru </h3>
          <hr />
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="mt-4">Pilih Tanggal</h3>
            <form onSubmit={newAbsensi}>
              <span className="text-danger">{msg}</span>
              <div className="form-group mt-1">
                <label>Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
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

export default PilihTanggalAbsensi;
