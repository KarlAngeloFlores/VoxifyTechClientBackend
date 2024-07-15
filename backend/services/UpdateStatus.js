const Message = require("../models/Message");

module.exports = async (messageId) => {
    try {
        
        const messagesInfo = await Message.updateOne({_id: messageId}, {$set: {status: true}});
        return {message: "updated status"};

    } catch (error) {
        console.error(error);
    }
}