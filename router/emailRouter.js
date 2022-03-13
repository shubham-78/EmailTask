const express = require('express');
const router = express.Router();
const scheduler = require('../middleware/emailScheduler');
router.use(express.json());

router.post("/email", scheduler, async (req, res) => {
    res.send("Email Send Successfully");
});

module.exports = router;