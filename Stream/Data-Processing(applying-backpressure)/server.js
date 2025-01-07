const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readline = require("readline");
const { Transform } = require("stream");

const app = express();
const upload = multer({ dest: "uploads/" });

// Middleware for serving frontend
app.use(express.static("public"));

// Transform stream to process CSV rows
class DataTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk, encoding, callback) {
        // Process each line (e.g., extract useful information)
        const processedLine = chunk.toString().toUpperCase(); // Convert to uppercase
        this.push(processedLine + "\n");
        callback();
    }
}

// Endpoint for file upload and processing
app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;

    const readStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: readStream });

    const transformStream = new DataTransform();
    const writeStream = fs.createWriteStream("output.csv");

    rl.on("line", (line) => {
        const buffer = Buffer.from(line + "\n");
        if (!transformStream.write(buffer)) {
            rl.pause(); // Apply backpressure if writable stream buffer is full
            transformStream.once("drain", () => rl.resume());
        }
    });

    rl.on("close", () => {
        transformStream.end();
    });

    transformStream.pipe(writeStream);

    writeStream.on("finish", () => {
        res.send("File processed and saved as output.csv");
        fs.unlink(filePath, () => {}); // Clean up uploaded file
    });
});

// Start server
app.listen(3000, () => {
    console.log("Efficient Data Processing App running on http://localhost:3000");
});
