const express = require("express");
const router = express.Router();

const loginService = require("../services/LoginAdmin");
router.post("/loginAdmin", async (req,res) => {

    const {email, password} = req.body;

    try {
        
    const loginResult = await loginService(email, password);
    res.send(loginResult);

    } catch (error) {
        console.error(error);
    }
});

module.exports = router;

