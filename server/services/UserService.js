const UserModel = require('../db/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT tokens
// Token structure is now consistent in both frontend and backend
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

module.exports = {
    // Get all users (for testing purposes; not typically used in production)
    loginGet: async (req, res) => {
        try {
            const users = await UserModel.find().lean();
            res.send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Handle user login or registration
    login: async (req, res) => {
        const { email, name, image } = req.body;
        
        try {
            // Check if user exists by email
            let user = await UserModel.findOne({ email }).lean();

            // If the user doesn't exist, register a new user
            if (!user) {
                const newUser = new UserModel({ name, email, image });
                const savedUser = await newUser.save();
                
                // Prepare user data for token
                user = {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    image: savedUser.image
                };
                console.log('New user created:', user);
            } else {
                // If user already exists, use the found user's data
                user = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                };
                console.log('User logged in:', user);
            }

            // Generate and send JWT token
            const accessToken = generateAccessToken(user);
            res.status(200).json({ accessToken });

        } catch (error) {
            res.status(500).send(error);
        }
    }
};
