import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/list.css";
import axios from "axios";
import { format } from "date-fns";

function SuratMasuk() {
  const [showEdit, setShowEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [newRecord, setNewRecord] = useState({
    idMasuk: "",
    Lampiran: "",
    namaFile: "",
    Nomor: "",
    tglUpload: "",
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
      const arsipMasukToEdit = platforms.find((platform) => platform.idMasuk === id);
      if (arsipMasukToEdit) {
        setNewRecord({
          ...newRecord,
          idMasuk: arsipMasukToEdit.idMasuk,
          Lampiran: arsipMasukToEdit.Lampiran,
          namaFile: arsipMasukToEdit.namaFile,
          Nomor: arsipMasukToEdit.Nomor,
          tglUpload: arsipMasukToEdit.tglUpload,
        });
      }
    } else {
      const newIdMasuk = `SRTM${(platforms.length + 1).toString().padStart(3, "0")}`;
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        idMasuk: newIdMasuk,
        Lampiran: "",
        namaFile: "",
        Nomor: "",
        tglUpload: "",
        file: selectedFile,
      }));
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/arsip_masuk");
      setPlatforms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlatforms();
    if (editRecordId !== null) {
      axios
        .get(`http://localhost:5000/arsip_masuk/${editRecordId}`)
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

  const handleAddPlatform = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios
      .post("http://localhost:5000/arsip_masuk", formData)
      .then((response) => {
        console.log("Data added:", response.data);
        getPlatforms();
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const handleEditPlatform = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (let key in newRecord) {
      formData.append(key, newRecord[key]);
    }

    axios.patch(`http://localhost:5000/arsip_masuk/${editRecordId}`, formData).then((response) => {
      console.log("Data updated:", response.data);
      getPlatforms();
      handleClose();
    });
  };

  const handleDeletePlatform = (idMasuk) => {
    axios.delete(`http://localhost:5000/arsip_masuk/${idMasuk}`).then((response) => {
      console.log("Data deleted:", response.data);
      getPlatforms();
    });
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setSelectedFile(image);
  };

  useEffect(() => {}, []);

  return (
    <div className="pt-1">
      <div className="container">
        <div className="p-5 mt-5 rounded card section-padding">
          <div className="row row-cols-2">
            <div className="col mt-2">
              <h2>
                <b style={{ fontFamily: "Dancing Script, cursive" }}>Data Surat Masuk</b>
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
              <table className="table colors table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Surat</th>
                    <th>Lampiran</th>
                    <th>Nama File</th>
                    <th>Nomor surat</th>
                    <th>Tipe File</th>
                    <th>tgl Upload</th>
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
                        <td>{platform.idMasuk}</td>
                        <td>{platform.Lampiran}</td>
                        <td>{platform.namaFile}</td>
                        <td>{platform.Nomor}</td>
                        <td>{platform.tipeFile}</td>
                        <td>{formatDate(platform.tglUpload)}</td>
                        <td>
                          <a href={platform.url} target="_blank" rel="noreferrer">
                            Download
                          </a>
                        </td>
                        <td>
                          <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handleShow(false, platform.idMasuk)}>
                            Edit
                          </button>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeletePlatform(platform.idMasuk)}>
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
                    <input type="text" className="form-control" placeholder="Id Masuk" name="idMasuk" value={newRecord.idMasuk || ""} onChange={handleInputChange} readOnly />
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Lampiran" name="Lampiran" value={newRecord.Lampiran || ""} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Nama File" name="namaFile" value={newRecord.namaFile || ""} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Nomor" name="Nomor" value={newRecord.Nomor || ""} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mt-3">
                    <label className="mb-1">Tanggal Upload</label>
                    <input type="date" className="form-control" name="tglUpload" value={newRecord.tglUpload || ""} onChange={handleInputChange} />
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
    </div>
  );
}

export default SuratMasuk;
