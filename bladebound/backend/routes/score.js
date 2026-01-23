import express from 'express';
import Score from '../models/Score.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Save score
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { score, characterClass, enemyDefeated, battleDuration, playerHPRemaining } = req.body;

    const newScore = new Score({
      userId: req.userId,
      username: req.username,
      score,
      characterClass,
      enemyDefeated: enemyDefeated || 'The Shadow',
      battleDuration: battleDuration || 0,
      playerHPRemaining: playerHPRemaining || 0
    });

    await newScore.save();

    res.status(201).json({
      message: 'Score saved successfully',
      scoreData: newScore
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's scores
router.get('/user', verifyToken, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({
      username: req.username,
      scores: scores
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard (top 10 scores)
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: '$userId',
          username: { $first: '$username' },
          bestScore: { $max: '$score' },
          characterClass: { $first: '$characterClass' },
          totalBattles: { $sum: 1 }
        }
      },
      { $sort: { bestScore: -1 } },
      { $limit: 10 }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single score details
router.get('/:scoreId', async (req, res) => {
  try {
    const score = await Score.findById(req.params.scoreId);
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
