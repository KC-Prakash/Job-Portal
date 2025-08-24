const fs = require("fs");
const path = require("path");
const User = require("../models/User");

// @desc Update user profile (name, avatar, company details)
exports.updateProfile = async (req, res) => {
    try {
        const {name, avatar, resume, companyName, companyDescription, companyLogo} = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.resume = resume || user.resume;

        if (user.role === "employer") {
            user.companyName = companyName || user.companyName;
            user.companyDescription = companyDescription || user.companyDescription;
            user.companyLogo = companyLogo || user.companyLogo;
        }

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            companyName: user.companyName,
            companyDescription: user.companyDescription,
            companyLogo: user.companyLogo,
            resume: user.resume || "",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Delete resume file (Jobseeker only)
exports.deleteResume = async (req, res) => {
    try {
        const { resumeUrl } = req.body;
        const fileName = resumeUrl?.split("/").pop();

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.role !== "jobseeker") {
            return res.status(403).json({ error: "Only jobseekers can delete resume" });
        }

        const filePath = path.join(__dirname, "../uploads", fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        user.resume = "";
        await user.save();

        res.json({ message: "Resume deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Get public profile (Jobseeker only)
exports.getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
