const express = require("express");
const router = express.Router();

const readService = require("../services/ReadMessages");
router.get("/readMessage", async (req, res) => {

    try {
        
    const readResult = await readService(); 
    
    res.send(readResult);

    } catch (error) {
        console.error(error);
    }

});

const readRepliedService = require("../services/ReadReplied");
router.get("/readReplied", async (req, res) => {

    try {
        
    const readRepliedResult = await readRepliedService(); 
    
    res.send(readRepliedResult);

    } catch (error) {
        console.error(error);
    }

});

const updateStatusService = require("../services/UpdateStatus");
router.put("/updateStatus", async (req, res) => {

    const {messageId} = req.body;

    try {
        
        const updateStatusResult = await updateStatusService(messageId);
        res.send(updateStatusResult);

    } catch (error) {
        console.error(error);
    }

});


const deleteService = require("../services/DeleteMessages");
router.delete("/deleteMessage", async (req, res) => {

    const {messageId} = req.body;

    try {
        
        const deleteResult = await deleteService(messageId);

        res.send(deleteResult);

    } catch (error) {
        console.error(error);
    }

});



module.exports = router;