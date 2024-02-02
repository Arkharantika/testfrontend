// import React from "react";
// import LayoutLayer from "./LayoutLayer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const TambahSiswa = () => {
  const [namalengkap, setNamalengkap] = useState("");
  const [name, setName] = useState("");
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");
  const [daerah, setDaerah] = useState("");
  const [desa, setDesa] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [preview, setPreview] = useState("");
  const [gender, setGender] = useState("");
  const [alamat, setAlamat] = useState("");
  const [file, setFile] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const history = useNavigate();

  useEffect(() => {
    console.log("kentang");
    RefreshToken();
  }, []);

  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://51.120.7.180:5000/token");
      setToken(response.data.newAccessToken);
      const decoded = jwtDecode(response.data.newAccessToken);
      console.log(decoded);
    } catch (error) {
      if (error.response) {
        history("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const response = await axios.get("http://51.120.7.180:5000/token");
      const decoded = jwtDecode(response.data.newAccessToken);
      config.headers.Authorization = `Bearer ${response.data.newAccessToken}`;
      setToken(response.data.newAccessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      console.log(decoded);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addSiswa = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_lengkap", namalengkap);
    formData.append("tempat_lahir", tempatLahir);
    formData.append("tanggal_lahir", tanggalLahir);
    formData.append("gender", gender);
    formData.append("nama_ayah", ayah);
    formData.append("nama_ibu", ibu);
    formData.append("kelompok", kelompok);
    formData.append("desa", desa);
    formData.append("daerah", daerah);
    formData.append("alamat", alamat);
    formData.append("no_telp", noTelp);
    formData.append("file", file);
    try {
      await axios.post("http://51.120.7.180:5000/siswa", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      history("/siswa");
    } catch (error) {
      console.log(error);
    }
  };
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  return (
    <Layout>
      <div className="container">
        <div className="card">
          <div className="container">
            <h1 className="mt-4">Tambah Siswa</h1>
            <form onSubmit={addSiswa}>
              <span className="text-danger"></span>

              <div className="form-group mt-1">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  value={namalengkap}
                  onChange={(e) => setNamalengkap(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Tanggal Lahir</label>
                <input
                  type="text"
                  className="form-control"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Tempat Lahir</label>
                <input
                  type="text"
                  className="form-control"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Gender</label>
                <input
                  type="text"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Nama Ayah</label>
                <input
                  type="text"
                  className="form-control"
                  value={ayah}
                  onChange={(e) => setAyah(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Nama Ibu</label>
                <input
                  type="text"
                  className="form-control"
                  value={ibu}
                  onChange={(e) => setIbu(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Alamat</label>
                <input
                  type="text"
                  className="form-control"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Kelompok Sambung</label>
                <input
                  type="text"
                  className="form-control"
                  value={kelompok}
                  onChange={(e) => setKelompok(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Desa Sambung</label>
                <input
                  type="text"
                  className="form-control"
                  value={desa}
                  onChange={(e) => setDesa(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Daerah Sambung</label>
                <input
                  type="text"
                  className="form-control"
                  value={daerah}
                  onChange={(e) => setDaerah(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Nomor Telepon</label>
                <input
                  type="text"
                  className="form-control"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-1">
                <label>Upload Foto</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={loadImage}
                  required
                />
              </div>
              {preview ? (
                <figure className="mt-1">
                  <img
                    className="img-thumbnail"
                    src={preview}
                    alt="Preview Image"
                    style={{ maxWidth: "500px" }}
                  />
                </figure>
              ) : (
                <></>
              )}
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

export default TambahSiswa;
