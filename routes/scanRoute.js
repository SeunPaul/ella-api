const express = require("express");

// controllers
const { runScan, getDashboardStats } = require("../controllers/scanController");

const { checkUserToken } = require("../middlewares/checkToken");
const { checkFileUploadSize } = require("../middlewares/checkFileUploadSize");

const router = express.Router();

router.post("/run", checkUserToken, checkFileUploadSize, runScan);
router.get("/dashboardStats", checkUserToken, getDashboardStats);

module.exports = router;
