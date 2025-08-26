const User = require('../models/User')
const jwt = require('jsonwebtoken')

//Generete token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

//@desc Register new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar, role } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ error: 'User already exists' })

        const user = await User.create({ name, email, password, role, avatar })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName || '',
            companyDescription: user.companyDescription || '',
            companyLogo: user.companyLogo || '',
            resume: user.resume || ''
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//@desc Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id),
            companyName: user.companyName || '',
            companyDescription: user.companyDescription || '',
            companyLogo: user.companyLogo || '',
            resume: user.resume || ''
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//@desc Get logged-in user
exports.getMe = async (req, res) => {
    res.json(req.user)
}
