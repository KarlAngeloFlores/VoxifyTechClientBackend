const Message = require("../models/Message");

module.exports = async () => {
    try {
        
        const messagesInfo = await Message.find();
        return messagesInfo;


    } catch (error) {
        console.error(error);
    }
}