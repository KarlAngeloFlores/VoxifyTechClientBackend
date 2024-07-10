const Message = require("../models/Message");

module.exports = async (messageId) => {
    try {
        
        const deleteInfo = await Message.deleteOne({ _id: messageId });

        return {message: "message deleted"}

    } catch (error) {
        console.error(error);
    }
}