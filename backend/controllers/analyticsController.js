const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User"); 

const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

exports.getEmployerAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const employerId = req.user._id;
    const now = new Date();

    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);

    const prev7Days = new Date(now);
    prev7Days.setDate(now.getDate() - 14);

    // === Counts === //
    const totalActiveJobs = await Job.countDocuments({
      company: employerId,
      isClosed: false,
    });

    const jobs = await Job.find({ company: employerId }).select("_id");
    const jobIds = jobs.map(job => job._id);

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const totalHires = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    const totalCompanies = await User.countDocuments({
      role: "employer",
      companyName: { $exists: true, $ne: "" },
    });

    // === Trends === //

    const activeJobsLast7 = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: last7Days, $lte: now },
    });
    const activeJobsPrev7 = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });
    const activeJobTrend = getTrend(activeJobsLast7, activeJobsPrev7);

    const applicationsLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7Days, $lte: now },
    });
    const applicationsPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });
    const applicantTrend = getTrend(applicationsLast7, applicationsPrev7);

    const hiresLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: last7Days, $lte: now },
    });
    const hiresPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });
    const hireTrend = getTrend(hiresLast7, hiresPrev7);

    const companiesLast7 = await User.countDocuments({
      role: "employer",
      companyName: { $exists: true, $ne: "" },
      createdAt: { $gte: last7Days, $lte: now },
    });
    const companiesPrev7 = await User.countDocuments({
      role: "employer",
      companyName: { $exists: true, $ne: "" },
      createdAt: { $gte: prev7Days, $lt: last7Days },
    });
    const companyTrend = getTrend(companiesLast7, companiesPrev7);

    // === Recent Jobs & Applicants === //

    const recentJobs = await Job.find({ company: employerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title location type createdAt isClosed");

    const recentApplicants = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("applicant", "name email avatar")
      .populate("job", "title");

    // === Response === //
    res.json({
      counts: {
        totalActiveJobs,
        totalApplicants,
        totalHires,
        totalCompanies,
      },
      trends: {
        activeJobs: activeJobTrend,
        applicants: applicantTrend,
        hires: hireTrend,
        companies: companyTrend,
      },
      data: {
        recentJobs,
        recentApplicants,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch analytics",
      error: err.message,
    });
  }
};
