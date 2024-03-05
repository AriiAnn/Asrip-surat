const { surat } = require("../models");
const path = require("path");
const fs = require("fs");


const getAll = async (req, res, next) => {
    try {
        const Surat = await surat.findAll();
        res.json(Surat);
    } catch (error) {
        console.log(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const response = await surat.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};
const createSurat = async (req, res, next) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    try {
        const id = req.body.id;
        const tujuan = req.body.tujuan;
        const no_surat = req.body.no_surat;
        const perihal = req.body.perihal;
        const tanggal = req.body.tanggal;
        const jenis = req.body.jenis;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;
        const allowedType = [".pdf", ".docx", ".doc", ".pptx", ".xlsx"];

        const defaultStatus = "UNCHECK";
        const tipeFile = ext.toLowerCase();

        if (!allowedType.includes(tipeFile)) return res.status(422).json({ msg: "Invalid File" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "File must be less than 5 MB" });

        file.mv(`./public/files/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
                await surat.create({
                    id: id,
                    tujuan: tujuan,
                    no_surat: no_surat,
                    perihal: perihal,
                    tanggal: tanggal,
                    jenis: jenis,
                    status: defaultStatus,
                    tipeFile: tipeFile,
                    files: fileName,
                    url: url,
                });
                res.status(201).json({ msg: "Surat Created Successfuly" });
            } catch (error) {
                console.log(error.message);
            }
        });
    } catch (error) { }
};
const updateSurat = async (req, res, next) => {
    const arsipSurat = await surat.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!arsipSurat) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    let tipeFile = arsipSurat.tipeFile;

    if (req.files === null) {
        fileName = arsipSurat.files;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".pdf", ".docx", ".doc", ".pptx", ".xlsx"];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid files" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "File must be less than 5 MB" });

        const filepath = `./public/files/${arsipSurat.files}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/files/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });


        tipeFile = ext.toLowerCase();
    }

    const id = req.body.id;
    const tujuan = req.body.tujuan;
    const no_surat = req.body.no_surat;
    const perihal = req.body.perihal;
    const tanggal = req.body.tanggal;
    const jenis = req.body.jenis;
    const status = req.body.status;
    const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;

    try {
        await arsipSurat.update(
            {
                id: id,
                tujuan: tujuan,
                no_surat: no_surat,
                perihal: perihal,
                tipeFile: tipeFile,
                tanggal: tanggal,
                jenis: jenis,
                status: status,
                files: fileName,
                url: url,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Surat Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};
const getAllUncheckedSurat = async (req, res, next) => {
    try {
        // Temukan semua surat dengan status "UNCHECK"
        const uncheckedSurat = await surat.findAll({
            where: {
                status: "UNCHECK"
            }
        });

        res.status(200).json({ uncheckedSurat });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const getUncheckedSuratById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Temukan surat berdasarkan ID dengan status "UNCHECK"
        const foundSurat = await surat.findOne({
            where: {
                id: id,
                status: "UNCHECK"
            }
        });

        if (!foundSurat) {
            return res.status(404).json({ msg: "Unchecked Surat not found" });
        }

        res.status(200).json({ foundSurat });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const konfirmasiSurat = async (req, res, next) => {
    try {
        const suratId = req.params.id;

        const targetSurat = await surat.findByPk(suratId);

        if (!targetSurat) {
            return res.status(404).json({ msg: "Surat not found" });
        }

        targetSurat.status = "DIKONFIRMASI";

        await targetSurat.save();

        res.status(200).json({ msg: "Surat Confirmed Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const TolakSurat = async (req, res, next) => {
    try {
        const suratId = req.params.id;

        const targetSurat = await surat.findByPk(suratId);

        if (!targetSurat) {
            return res.status(404).json({ msg: "Surat not found" });
        }

        targetSurat.status = "DITOLAK";

        await targetSurat.save();

        res.status(200).json({ msg: "Surat Confirmed Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};



const deleteSurat = async (req, res) => {
    try {
        const Surat = await surat.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!Surat) {
            return res.status(404).json({ msg: "surat Not Found" });
        }

        const filePath = `./public/files/${Surat.files}`;

        fs.unlink(filePath, async (err) => {
            await Surat.destroy();
            res.status(200).json({ msg: "surat Deleted" });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    getAll,
    getById,
    createSurat,
    updateSurat,
    deleteSurat,
    konfirmasiSurat,
    TolakSurat,
    getAllUncheckedSurat,
    getUncheckedSuratById,
};