import express from "express";

const app = express();

const PORT = 3000;


// Serve public folder
app.use(express.static("public"));


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});