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
            { 
                profilePic: result.url,
                profilePicId: result.fileId,
            },
            { new: true }
        );

        res.json({ message: "Uploaded", url: result.url, user });

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

const deleteProfilePic = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profilePic: "" },
            { new: true }
        );

        res.json({ message : "Profile photo removed", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProfile = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.user._id,
        {
            name: req.body.name,
            email: req.body.email,
        },
        { new: true }
    );

    res.json(user);

    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    uploadProfilePic,
    deleteProfilePic,
    updateProfile
};