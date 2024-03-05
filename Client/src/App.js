import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SuratStaff from "./components/SuratStaff";
import SuratManager from "./components/SuratManager";

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
          path="/staff"
          element={
            <>
              <Navbar />
              <SuratStaff />
              <Footer />
            </>
          }
        />
        <Route
          path="/manager"
          element={
            <>
              <Navbar />
              <SuratManager />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
