const express = require("express");
const surat = require("./routes/surat.routes");
const app = express();
const cors = require("cors");
const FileUpload = require("express-fileupload");

const cookieParser = require("cookie-parser");
const PORT = process.env.APP_PORT || 3001;
// const fs = require("fs"); 
app.use(FileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:5000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// app.use(cookieParser());
//app.use('/api', routers);
app.use(surat);

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello World!",
    });
});

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
