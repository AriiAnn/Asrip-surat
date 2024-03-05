import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { format } from "date-fns";

function SuratManager() {
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState("");
  const [checkedItemId, setCheckedItemId] = useState(null);


  const formatDate = (date) => {
    try {
      if (!date || isNaN(new Date(date))) {
        // Check if the date is null or not a valid date
        return "Invalid Date";
      }

      return format(new Date(date), "dd-MM-yyyy"); // Format tanggal ke "dd-MM-yyyy"
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };


  const handleClose = () => {
    setShowDetail(false);
  };

  const handleShow = async (id) => {
    setCheckedItemId(id);
    setShowDetail(true);

    try {
      const response = await axios.get(`http://localhost:5000/check/${id}`);
      const receivedRecord = response.data.foundSurat;

      console.log("Response from server:", response.data); // Tambahkan log respons dari server

      if (receivedRecord) {
        setNewRecord(receivedRecord);
        console.log("Received record:", receivedRecord); // Periksa data yang diterima dari server
      } else {
        console.error("Received record is undefined or null");
      }
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };


  const getPlatforms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/check");
      setPlatforms(response.data && response.data.uncheckedSurat ? response.data.uncheckedSurat : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/konfirmasi/${id}`).then((response) => {
      console.log("Data accepted:", response.data);
      getPlatforms();
      handleClose();
    });
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/tolak/${id}`).then((response) => {
      console.log("Data rejected:", response.data);
      getPlatforms();
      handleClose();
    });
  };

  useEffect(() => {
    getPlatforms();
  }, []);

  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>Data Surat Manager</b>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive text-center">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table className="table colors table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Id Surat</th>
                      <th>Tujuan</th>
                      <th>No. Surat</th>
                      <th>Perihal</th>
                      <th>Tipe File</th>
                      <th>tanggal</th>
                      <th>jenis</th>
                      <th>status</th>
                      <th>File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.length === 0 ? (
                      <tr>
                        <td colSpan="10">Tidak terdapat data Platform yang tersimpan</td>
                      </tr>
                    ) : (
                      platforms.map((platform, index) => (
                        <tr key={platform.id}>
                          <td>{index + 1}</td>
                          <td>{platform.id}</td>
                          <td>{platform.tujuan}</td>
                          <td>{platform.no_surat}</td>
                          <td>{platform.perihal}</td>
                          <td>{platform.tipeFile}</td>
                          <td>{formatDate(platform.tanggal)}</td>
                          <td>{platform.jenis}</td>
                          <td>{platform.status}</td>
                          <td>
                            <a href={platform.url} target="_blank" rel="noreferrer">
                              Download
                            </a>
                          </td>
                          <td>
                            <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handleShow(platform.id)}>
                              CHECK
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="model_box">
          <Modal show={showDetail} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Detail Surat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>ID: {checkedItemId}</p>
              {newRecord ? (
                <>
                  <p>Tujuan: {newRecord.tujuan}</p>
                  <p>No. Surat: {newRecord.no_surat}</p>
                  <p>Perihal: {newRecord.perihal}</p>
                  <p>Jenis: {newRecord.jenis}</p>
                  <p>Tanggal: {formatDate(newRecord.tanggal)}</p>
                  <a href={newRecord.url} target="_blank" rel="noreferrer">
                    Lihat Surat
                  </a>
                </>
              ) : (
                <p>Data tidak tersedia atau sedang dimuat...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={() => handleAccept(checkedItemId)}>
                Accept
              </Button>
              <Button variant="danger" onClick={() => handleReject(checkedItemId)}>
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SuratManager;
