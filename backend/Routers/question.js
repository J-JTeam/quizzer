const express = require('express');
const Questions = require("../Models/Questions");
const router = express.Router();

// Route to get random question
router.get('/random', async (req, res) => {
    try {
        const randomQuestion = await Questions.findOne();
        if (!randomQuestion) return res.status(404).json({ message: 'No Questions were Found!' });
        return res.status(200).json(randomQuestion);
    } catch (err) {
        console.error('Error fetching random question:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Questions.distinct('category');
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found!' });
        }
        return res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/categories', async (req, res) => {
    const query = req.query.category;
    try {
        if (!query) {
            return res.status(400).json({ message: 'Category parameter is missing!' });
        }
        const questionsByCategory = await Questions.find({ category: query });
        if (!questionsByCategory || questionsByCategory.length === 0) {
            return res.status(404).json({ message: `No questions found for category '${query}'` });
        }
        return res.status(200).json(questionsByCategory);
    } catch (err) {
        console.error('Error fetching questions by category:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/questions', async (req, res) => {
    const query = req.query.category;
    try {
        if (!query) {
            return res.status(400).json({ message: 'Category parameter is missing!' });
        }
        const questionsByCategory = await Questions.aggregate([
            { $match: { category: query } }, 
            { $sample: { size: 10 } } 
        ]);
        if (!questionsByCategory || questionsByCategory.length === 0) {
            return res.status(404).json({ message: `No questions found for category '${query}'` });
        }
        return res.status(200).json(questionsByCategory);
    } catch (err) {
        console.error('Error fetching questions by category:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
