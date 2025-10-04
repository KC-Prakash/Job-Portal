const Application = require("../models/Application");
const Job = require("../models/Job");

//@desc Apply to a job
exports.applyToJob = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only jobseekers can apply to jobs" });
        }

        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        const existing = await Application.findOne({ job: job._id, applicant: req.user._id });
        if (existing) return res.status(400).json({ message: "You have already applied to this job" });

        const application = await Application.create({
            job: job._id,
            applicant: req.user._id,
            resume: req.user.resume || "",
            category: job.category,
        });

        const populatedApp = await application.populate("job", "title company location type category");
        return res.status(201).json(populatedApp);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to apply to job", error: err.message });
    }
};

//@desc Get logged-in user's applications
exports.getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({ applicant: req.user._id })
            .populate("job", "title company location type category")
            .sort({ createdAt: -1 });

        return res.json(apps);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//@desc get all applicants for a job (Employer only)
exports.getApplicantsForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to view this job" });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate("job", "title location company type")
            .populate("applicant", "name email avatar resume");

        return res.json(applications);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//@desc Get application by id (Jobseeker or Employer)
exports.getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id)
            .populate("job", "title company")
            .populate("applicant", "name email avatar resume");

        if (!app) {
            return res.status(404).json({ message: "Application not found", id: req.params.id });
        }

        const isOwner =
            app.applicant._id.toString() === req.user._id.toString() ||
            app.job.company.toString() === req.user._id.toString();

        if (!isOwner) {
            return res.status(403).json({ message: "You are not authorized to view this application" });
        }

        return res.json(app);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//@desc Update application status (Employer only)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const app = await Application.findById(req.params.id).populate("job");

        if (!app) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (app.job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this application" });
        }

        app.status = status;
        await app.save(); 

        return res.json({ message: "Application status updated successfully", status: app.status });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
