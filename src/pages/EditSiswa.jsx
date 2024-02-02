import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

const EditSiswa = () => {
  const [namalengkap, setNamalengkap] = useState("");
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");
  const [daerah, setDaerah] = useState("");
  const [desa, setDesa] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [preview, setPreview] = useState("");
  const [gender, setGender] = useState("");
  const [alamat, setAlamat] = useState("");
  const [file, setFile] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userID, setUserID] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    RefreshToken();
    getSpecificStudent();
  }, []);

  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://51.120.7.180:5000/token");
      setToken(response.data.newAccessToken);
      const decoded = jwtDecode(response.data.newAccessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
      setUserID(decoded.userId);
    } catch (error) {
      if (error.response) {
        history("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      //   const currentDate = new Date();
      //   if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get("http://51.120.7.180:5000/token");
      const decoded = jwtDecode(response.data.newAccessToken);
      config.headers.Authorization = `Bearer ${response.data.newAccessToken}`;
      console.log(decoded);
      setToken(response.data.newAccessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      //   }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addSiswa = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama_lengkap", namalengkap);
    formData.append("tanggal_lahir", tanggalLahir);
    formData.append("tempat_lahir", tempatLahir);
    formData.append("nama_ayah", ayah);
    formData.append("nama_ibu", ibu);
    formData.append("gender", gender);
    formData.append("kelompok", kelompok);
    formData.append("desa", desa);
    formData.append("daerah", daerah);
    formData.append("alamat", alamat);
    formData.append("no_telp", noTelp);
    try {
      await axios.patch(`http://51.120.7.180:5000/siswa/${id}`, formData, {
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

  const getSpecificStudent = async () => {
    const response = await axiosJWT.get(`http://51.120.7.180:5000/siswa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    setNamalengkap(response.data.nama_lengkap);
    setTanggalLahir(response.data.tanggal_lahir);
    setTempatLahir(response.data.tempat_lahir);
    // setNik(response.data.nik);
    setNoTelp(response.data.no_telp);
    setGender(response.data.gender);
    setAlamat(response.data.alamat);
    setAyah(response.data.nama_ayah);
    setIbu(response.data.nama_ibu);
    setKelompok(response.data.kelompok);
    setDesa(response.data.desa);
    setDaerah(response.data.daerah);
    setPreview("http://51.120.7.180:5000/images/" + response.data.foto);
    // setPreview(response.data.url);
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
            <h1 className="mt-4">Edit Data Pasien</h1>
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

export default EditSiswa;
