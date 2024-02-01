import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SuratKeluar from "./components/SuratKeluar";
import SuratMasuk from "./components/SuratMasuk";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/arsip-keluar"
          element={
            <>
              <Navbar />
              <SuratKeluar />
              <Footer />
            </>
          }
        />
        <Route
          path="/arsip-Masuk"
          element={
            <>
              <Navbar />
              <SuratMasuk />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
