const imagekit = require("../config/imagekit");
const User = require("../models/User-model");

const uploadProfilePic = async (req, res) => {
    try{
        const file = req.file;

        if(!file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profilePic: result.url},
            { new: true }
        );

        res.json({ message: "Uploaded", url: result.url, user });

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = uploadProfilePic;