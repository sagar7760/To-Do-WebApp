const Todo = require('../models/todoModel');

// Cleanup function to automatically delete tasks older than 15 days
const cleanupOldDeletedTodos = async () => {
    try {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        
        const result = await Todo.deleteMany({
            deleted: true,
            deletedAt: { $lte: fifteenDaysAgo }
        });
        
        if (result.deletedCount > 0) {
            console.log(`Automatically cleaned up ${result.deletedCount} old deleted todos`);
        }
        
        return result.deletedCount;
    } catch (error) {
        console.error('Error cleaning up old deleted todos:', error);
        return 0;
    }
};

// Schedule cleanup to run every day at midnight
const startCleanupSchedule = () => {
    // Run cleanup immediately on server start
    cleanupOldDeletedTodos();
    
    // Schedule cleanup every 24 hours (86400000 milliseconds)
    setInterval(async () => {
        console.log('Running scheduled cleanup of old deleted todos...');
        await cleanupOldDeletedTodos();
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    console.log('Cleanup service started - will run every 24 hours');
};

module.exports = {
    cleanupOldDeletedTodos,
    startCleanupSchedule
};
