const Message = require("../models/Message");

module.exports = async () => {
    try {
        
        const messagesInfo = await Message.find({status: false});
        return messagesInfo;


    } catch (error) {
        console.error(error);
    }
}