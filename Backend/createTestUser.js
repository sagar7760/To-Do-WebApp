const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
require('dotenv').config();

const createTestUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if test user already exists
        const existingUser = await User.findOne({ email: 'test@example.com' });
        
        if (existingUser) {
            console.log('Test user already exists:', existingUser.email);
            process.exit(0);
        }

        // Create test user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('testpassword123', salt);

        const testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword
        });

        console.log('Test user created successfully:');
        console.log('Email: test@example.com');
        console.log('Password: testpassword123');
        console.log('User ID:', testUser._id);

        process.exit(0);
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
};

createTestUser();
