const express = require("express");
const fs = require("fs");

const app = express();

// Serve frontend
app.use(express.static("public"));

// Endpoint for video streaming
app.get("/video", (req, res) => {
    const filePath = "sample.mp4"; // Path to video file

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.sendStatus(404);
            return;
        }

        const range = req.headers.range;
        if (!range) {
            res.status(416).send("Requires Range Header");
            return;
        }

        const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${stats.size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const stream = fs.createReadStream(filePath, { start, end });
        stream.pipe(res);

        // Handle backpressure
        stream.on("data", (chunk) => {
            if (!res.write(chunk)) {
                stream.pause();
                res.once("drain", () => stream.resume());
            }
        });

        stream.on("end", () => res.end());
    });
});

// Start server
app.listen(3001, () => {
    console.log("Real-Time Video Streaming App running on http://localhost:3001");
});
