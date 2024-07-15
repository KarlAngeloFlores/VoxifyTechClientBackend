const Message = require("../models/Message");

module.exports = async () => {
    try {
        
        const messagesInfo = await Message.find({status: true});
        return messagesInfo;

    
    } catch (error) {
        console.error(error);
    }
}