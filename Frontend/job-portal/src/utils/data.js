import {
    Search,
    User,
    FileText,
    MessageSquare,
    BarChart3,
    Shield,
    Clock,
    Briefcase,
    Building2,
    LayoutDashboard,
    Plus,
    Award
} from 'lucide-react';

export const jobSeekerFeatures = [
    {
        icon: Search,
        title: 'Smart Job Matching',
        description: 'AI-powered algorithm that matches you with the best job opportunities based on your skills and preferences.'
    },
    {
        icon: FileText,
        title: 'Resume Builder',
        description: 'Create a professional resume with our easy-to-use resume builder, ensuring you stand out to employers.'
    },
    {
        icon: MessageSquare,
        title: 'Direct Communication',
        description: 'Connect directly with employers through our messaging system, making it easier to discuss job opportunities.'
    },
    {
        icon: Award,
        title: 'Skill Assessment',
        description: 'Showcase your skills with our assessment tools, helping you to demonstrate your expertise to potential employers.'
    }
];

export const employerFeatures = [
    {
        icon: User,
        title: 'Talent Pool Access',
        description: 'Access our vast database of pre-screened candidates, ensuring you find the right candidate quickly.'
    },
    {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        description: 'Track your job postings and candidate applications with our comprehensive analytics dashboard.'
    },
    {
        icon: Shield,
        title: 'Verified Candidates',
        description: 'All candidates are verified, ensuring you only see profiles that meet your requirements.'
    },
    {
        icon: Clock,
        title: 'Quick Hiring',
        description: 'Streamlined hiring process with tools that help you find and hire the right talent faster.'
    }
];

// Navigation items configuration
export const NAVIGATION_MENU = [
    { id: 'employer-dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'post-job', name: 'Post Job', icon: Plus },
    { id: 'manage-jobs', name: 'Manage Jobs', icon: Briefcase },
    { id: 'company-profile', name: 'Company Profile', icon: Building2 }
];

// Categories and Job Types
export const JOB_CATEGORIES = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'IT & Software', label: 'IT & Software' },
    { value: 'Customer-Service', label: 'Customer Service' },
    { value: 'Product', label: 'Product' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' },
    { value: 'Government', label: 'Government' },
    { value: 'Nonprofit', label: 'Nonprofit' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Media', label: 'Media' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Other', label: 'Other' }
];

export const JOB_TYPES = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Volunteer', label: 'Volunteer' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Other', label: 'Other' }
];

export const SALARY_RANGES = [
    'Less than $1000',
    '$1000 - $2000',
    '$2000 - $3000',
    '$3000 - $4000',
    '$4000 - $5000',
    '$5000 - $6000',
    '$6000 - $7000',
    '$7000 - $8000',
    '$8000 - $9000',
    '$9000 - $10000',
    'More than $10000'
];