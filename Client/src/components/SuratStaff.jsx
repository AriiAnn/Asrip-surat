import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";
import { format } from "date-fns";

function SuratStaff() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRecord, setNewRecord] = useState({
    id: "",
    tujuan: "",
    no_surat: "",
    perihal: "",
    tanggal: "",
    jenis: "",
    status: "",
  });
  const [editRecordId, setEditRecordId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const formatDate = (date) => {
    return format(new Date(date), "dd-MM-yyyy"); // Format tanggal ke "dd-MM-yyyy"
  };
  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShow = (isAdding, id = null) => {
    setIsAdding(isAdding);
    setEditRecordId(id);
    setShowEdit(true);

    if (!isAdding && id) {
      const arsipToEdit = platforms.find((platform) => platform.id === id);
      if (arsipToEdit) {
        setNewRecord({
          ...newRecord,
          id: arsipToEdit.id,
          tujuan: arsipToEdit.tujuan,
          no_surat: arsipToEdit.no_surat,
          perihal: arsipToEdit.perihal,
          tanggal: arsipToEdit.tanggal,
          jenis: arsipToEdit.jenis,
          status: arsipToEdit.status,

        });
        setSelectedFile(null);
      }
    } else {
      const newId = `SRTM${(platforms.length + 1).toString().padStart(3, "0")}`;
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        id: newId,
        tujuan: "",
        no_surat: "",
        perihal: "",
        tanggal: "",
        jenis: "",
        status: "",
        file: selectedFile,
      }));
      setSelectedFile(null);
    }
  };
  const getPlatforms = async () => {
    try {
      setLoading(true); // Pemuatan dimulai
      const response = await axios.get("http://localhost:5000/surat");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Pemuatan selesai, baik berhasil atau gagal
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/surat/${editRecordId}`)
        .then((response) => {
          setNewRecord(response.data);
        })
        .catch((error) => {
          console.error("Error fetching record:", error);
        });
    }
  }, [editRecordId]);

  const handleInputChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPlatform = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios.post("http://localhost:5000/surat", formData)
      .then((response) => {
        console.log("Data added:", response.data);
        getPlatforms();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        alert("Terjadi kesalahan saat menambahkan data. Coba lagi nanti.");
      });

  };


  const handleEditPlatform = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios.put(`http://localhost:5000/surat/${editRecordId}`, formData).then((response) => {
      console.log("Data updated:", response.data);
      getPlatforms();
      handleClose();
    });
  };

  const handleDeletePlatform = (id) => {
    axios.delete(`http://localhost:5000/surat/${id}`).then((response) => {
      console.log("Data deleted:", response.data);
      getPlatforms();
    });
  };

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert('Pilih file yang valid.');
    }
  };



  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>Data Surat Staff</b>
              </h2>
            </div>
            <div className="col mt-2 mb-4 d-flex justify-content-end">
              <Button variant="success" onClick={() => handleShow(true)}>
                Tambah Surat
              </Button>
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
                            {platform.status === "UNCHECK" && (
                              <>
                                <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handleShow(false, platform.id)}>
                                  Edit
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeletePlatform(platform.id)}>
                                  Hapus
                                </button>
                              </>
                            )}
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

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal show={showEdit} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>{isAdding ? "Add Surat" : "Edit Surat"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Id" name="id" value={newRecord.id || ""} onChange={handleInputChange} readOnly />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="Tujuan" name="tujuan" value={newRecord.tujuan || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="No. Surat" name="no_surat" value={newRecord.no_surat || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="Perihal" name="perihal" value={newRecord.perihal || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" placeholder="Jenis" name="jenis" value={newRecord.jenis || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <label className="mb-1">Tanggal Upload</label>
                  <input type="date" className="form-control" name="tanggal" value={newRecord.tanggal || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                  <input type="file" className="form-control" onChange={loadImage} />
                </div>
                <button type="submit" className="btn btn-success mt-4" onClick={isAdding ? handleAddPlatform : handleEditPlatform}>
                  {isAdding ? "Add Arsip" : "Save Changes"}
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}

export default SuratStaff;
