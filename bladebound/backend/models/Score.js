import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  characterClass: {
    type: String,
    required: true
  },
  enemyDefeated: {
    type: String,
    default: 'The Shadow'
  },
  battleDuration: {
    type: Number, // in seconds
    default: 0
  },
  playerHPRemaining: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Score', scoreSchema);
