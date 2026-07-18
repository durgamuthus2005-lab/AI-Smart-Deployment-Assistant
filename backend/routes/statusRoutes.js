const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        backend: "Running",

        frontend: "Running",

        docker: "Pending",

        cloud: "Not Connected"

    });

});

module.exports = router;