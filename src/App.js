import React from "react";
import "./Style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DaftarSiswa from "./pages/DaftarSiswa";
import TambahSiswa from "./pages/TambahSiswa";
import EditSiswa from "./pages/EditSiswa";
import BuatKelas from "./pages/BuatKelas";
import RegistrasiMurid from "./pages/RegistrasiMurid";
import DaftarMuridKelas from "./pages/DaftarMuridKelas";
import DaftarKelas from "./pages/DaftarKelas";
import InfoKelas from "./pages/InfoKelas";
import PilihKelasAbsen from "./pages/PilihKelasAbsen";
import PilihTanggalAbsensi from "./pages/PilihTanggalAbsensi";
import ShowAfter from "./pages/ShowAfter";
import DashboardStatistik from "./pages/DashboardStatistik";
import StatistikKelas from "./pages/StatistikKelas";
import PilihKelasIndividu from "./pages/PilihKelasIndividu";
import StatistikSiswa from "./pages/StatistikSiswa";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/statistik" element={<DashboardStatistik />} />
          <Route path="/statistik/kelas/:id" element={<StatistikKelas />} />
          <Route
            path="/statistik/individu/:id"
            element={<PilihKelasIndividu />}
          />
          <Route
            path="/statistik/individu/:id/:kelasnya"
            element={<StatistikSiswa />}
          />
          {/* BATAS AJA HEHEHE ===> */}
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/siswa" element={<DaftarSiswa />} />
          <Route path="/editsiswa/:id" element={<EditSiswa />} />
          <Route path="/addsiswa" element={<TambahSiswa />} />
          <Route path="/buatkelas" element={<BuatKelas />} />
          <Route path="/daftarkanmurid" element={<RegistrasiMurid />} />
          <Route path="/daftarkanmurid/:id" element={<DaftarMuridKelas />} />
          <Route path="/daftarkelas" element={<DaftarKelas />} />
          <Route path="/infokelas/:id" element={<InfoKelas />} />
          <Route path="/pilihkelasabsen" element={<PilihKelasAbsen />} />
          <Route path="/showafter/:id/:datenya" element={<ShowAfter />} />
          <Route
            path="/pilihtanggalabsen/:id"
            element={<PilihTanggalAbsensi />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
