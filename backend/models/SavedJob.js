const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
    {
        jobseeker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //jobseeker
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true }, //job
    },
    { timestamps: true }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);