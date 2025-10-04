const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

// @desc Create a new job (Employer only)
exports.createJob = async (req, res) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(403).json({ message: "Only employers can post jobs" });
        }
        const job = await Job.create({ ...req.body, company: req.user._id });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getJobs = async (req, res) => {
    const { keyword, location, category, type, minSalary, maxSalary, userId } = req.query;

    const query = { isClosed: false };

    // Keyword filter
    if (keyword) query.title = { $regex: keyword, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };

    // Type filter (multiple checkboxes OR logic)
    if (type) {
        query.type = { $in: Array.isArray(type) ? type : [type] };
    }

    // Category filter (multiple checkboxes OR logic)
    if (category) {
        query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Salary range filter
    const min = minSalary ? Number(minSalary) : null;
    const max = maxSalary ? Number(maxSalary) : null;
    if (min !== null || max !== null) {
        query.$and = [];
        if (min !== null) query.$and.push({ salaryMax: { $gte: min } });
        if (max !== null) query.$and.push({ salaryMin: { $lte: max } });
        if (query.$and.length === 0) delete query.$and;
    }

    try {
        const jobs = await Job.find(query).populate("company", "Name companyName companyLogo");

        let savedJobIds = [];
        let appliedJobStstusMap = {};

        if (userId) {
            const savedJobs = await SavedJob.find({ jobseeker: userId }).select("job");
            savedJobIds = savedJobs.map((s) => String(s.job));

            const applications = await Application.find({ applicant: userId }).select("job status");
            applications.forEach((app) => {
                appliedJobStstusMap[String(app.job)] = app.status;
            });
        }

        const jobsWithExtras = jobs.map((job) => ({
            ...job.toObject(),
            isSave: savedJobIds.includes(String(job._id)),
            applicationStatus: appliedJobStstusMap[String(job._id)] || null,
        }));

        res.json(jobsWithExtras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// @desc Get jobs for logged in user (Employer can see posted jobs)
exports.getJobsEmployer = async (req, res) => {
    try {
        const userId = req.user._id;
        const { role } = req.user;

        if (role !== "employer") {
            return res.status(403).json({ message: "Access denied" });
        }

        // Get all jobs posted by employer
        const jobs = await Job.find({ company: userId })
            .populate("company", "name companyName companyLogo")
            .lean();

        // Count applications for each job
        const jobsWithApplicationCounts = await Promise.all(
            jobs.map(async (job) => {
                const applicationCount = await Application.countDocuments({
                    job: job._id,
                });
                return {
                    ...job,
                    applicationCount,
                };
            })
        );

        res.json(jobsWithApplicationCounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Get single job by id
exports.getJobById = async (req, res) => {
    try {
        const { userId } = req.query;

        const job = await Job.findById(req.params.id).populate(
            "company",
            "name companyName companyLogo"
        );

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        let applicationStatus = null;

        if (userId) {
            const application = await Application.findOne({
                job: job._id,
                applicant: userId,
            }).select("status");

            if (application) {
                applicationStatus = application.status;
            }
        }

        res.json({
            ...job.toObject(),
            applicationStatus,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Update job by id (Employer only)
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        if (job.company.toString() !== req.user._id.toString()) {
            return res
                .ststus(403)
                .json({ message: "You are not authorized to update this job" });
        }

        Object.assign(job, req.body);
        const updatedJob = await job.save();

        return res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Delete job by id (Employer only)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.ststus(404).json({ message: "Job not found" });
        }

        if (job.company.toString() !== req.user._id.toString()) {
            return res
                .ststus(403)
                .json({ message: "You are not authorized to delete this job" });
        }

        await job.deleteOne();
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Toggle close job (Employer only)
exports.toggleCloseJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.company.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Not authorized to close this job" });
        }

        // Toggle job status
        job.isClosed = !job.isClosed;
        await job.save();

        res.json({
            message: job.isClosed
                ? "Job marked as closed"
                : "Job reopened successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
