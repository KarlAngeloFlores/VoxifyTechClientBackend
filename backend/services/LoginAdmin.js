const Admin = require("../models/Admin");

module.exports = async (email, password) => {
    try {
        const existingAdmin = await Admin.findOne({email});

        if(existingAdmin) {
            if(existingAdmin.password === password) {
                return {logAdmin: true, adminId: existingAdmin._id}
            } else {
                return {logAdmin: false, message: "Password is incorrect"}
            }
        } else {
            return {message: "Admin not found"}
        }

    } catch (error) {
        console.error(error);
    }
}