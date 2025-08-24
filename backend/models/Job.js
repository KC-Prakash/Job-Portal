const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        requirements: { type: String, required: true },
        location: { type: String },
        category: { type: String },
        type: {
            type: String,
            enum: ['Permanent',
                'Full-time',
                'Part-time',
                'Contract',
                'Internship',
                'Temporary',
                'Volunteer',
                'Remote',
                'Other'],
            required: true
        },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //employer
        salaryMin: { type: Number },
        salaryMax: { type: Number },
        isClosed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);