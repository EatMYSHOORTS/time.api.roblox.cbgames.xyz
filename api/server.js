const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Route to fetch time from WorldTimeAPI
app.get("/time", async (req, res) => {
    try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");

        // Ensure the response is valid
        if (!response.ok) {
            res.status(response.status).json({ error: "Failed to fetch time from the API" });
            return;
        }

        const data = await response.json();
        res.json(data); // Send the valid JSON response to the client
    } catch (error) {
        console.error("Error fetching time:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
