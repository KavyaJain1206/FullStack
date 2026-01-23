import React, { useState, useEffect } from "react";
import { Button, LinearProgress, Container, Box, Typography, Avatar, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const SCENES = { AUTH: -1, START: 0, PROLOGUE: 1, CHARACTER: 2, COMBAT: 3, RESULT: 4 };
const API_URL = "http://localhost:5000/api";

const App = () => {
  const [scene, setScene] = useState(SCENES.AUTH);
  const [isShaking, setIsShaking] = useState(false);
  const [player, setPlayer] = useState({ name: "Seeker", class: "", hp: 100, maxHp: 100 });
  const [enemy, setEnemy] = useState({ name: "The Shadow", hp: 150, maxHp: 150 });
  const [log, setLog] = useState("The battle begins...");
  const [battleStartTime, setBattleStartTime] = useState(null);
  
  // Auth state
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({ email: "", password: "", username: "", characterClass: "Warrior" });
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetForm, setResetForm] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Initialize scene based on auth status
  useEffect(() => {
    if (token && username) {
      setScene(SCENES.START);
      fetchLeaderboard(); // Load leaderboard on startup
    } else {
      setScene(SCENES.AUTH);
    }
  }, [token, username]);

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/score/leaderboard`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  };

  // Auth handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
      const payload = authMode === "login" 
        ? { email: authForm.email, password: authForm.password }
        : authForm;

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthError(data.error || "Authentication failed");
        return;
      }

      // Store token and username
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      setToken(data.token);
      setUsername(data.user.username);
      setScene(SCENES.START);
    } catch (error) {
      setAuthError("Network error: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    setScene(SCENES.AUTH);
    setAuthForm({ email: "", password: "", username: "", characterClass: "Warrior" });
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    if (resetForm.newPassword.length < 6) {
      setResetError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetForm.email,
          newPassword: resetForm.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setResetError(data.error || "Password reset failed");
        return;
      }

      setResetSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        setShowResetPassword(false);
        setResetForm({ email: "", newPassword: "", confirmPassword: "" });
        setAuthMode("login");
      }, 2000);
    } catch (error) {
      setResetError("Network error: " + error.message);
    }
  };

  // Save score to backend
  const saveScore = async () => {
    try {
      const battleDuration = battleStartTime ? (Date.now() - battleStartTime) / 1000 : 0;
      const response = await fetch(`${API_URL}/score/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          score: Math.floor((100 - enemy.hp) * 10 + battleDuration),
          characterClass: player.class,
          enemyDefeated: enemy.name,
          battleDuration: Math.floor(battleDuration),
          playerHPRemaining: Math.max(0, player.hp)
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Score saved:", data);
        fetchLeaderboard();
      }
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  // --- AUDIO SYSTEM (HEAVY MEDIEVAL RPG SOUNDS) ---
  const playSfx = (type) => {
    const sounds = {
      // Hover: Subtle parchment/magical wind (immersive UI)
      hover: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", 
      
      // Click: Heavy Medieval Drum/Impact
      click: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
      
      // Character Select: SWORD UNSHEATHE (Classic RPG Equip Sound)
      select: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3",
      
      // Attack: Sharp Steel Blade Slash
      slash: "https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3",
      
      // Hit: Heavy Armor/Flesh Impact
      hit: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
      
      // Win: Epic Fantasy Orchestral Swell
      win: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3",
      
      // Lose: Dark Bell Toll / Low Drone
      lose: "https://assets.mixkit.co/active_storage/sfx/953/953-preview.mp3" 
    };

    if (sounds[type]) {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.6; // Slightly louder for impact
      audio.play().catch(e => console.log("Audio play prevented by browser policy"));
    }
  };

  // Trigger Screen Shake Animation
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Combat System Logic
  const handleAttack = (type) => {
    // Start battle timer on first attack
    if (!battleStartTime) {
      setBattleStartTime(Date.now());
    }

    // 1. Play Attack Sound
    playSfx('slash');

    // Determine Player Damage
    let dmg = type === 'special' ? Math.floor(Math.random() * 35) + 20 : Math.floor(Math.random() * 15) + 10;
    
    // Apply Damage to Enemy
    setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - dmg) }));
    setLog(`You strike for ${dmg} damage!`);
    triggerShake();

    // Check for Win Condition
    if (enemy.hp - dmg <= 0) {
      setTimeout(() => {
        playSfx('win'); // Epic Victory Sound
        saveScore(); // Save score when winning
        setScene(SCENES.RESULT);
      }, 1000);
      return;
    }

    // Enemy Retaliation (Delayed)
    setTimeout(() => {
      // 2. Play Heavy Impact Sound
      playSfx('hit');

      const eDmg = Math.floor(Math.random() * 12) + 8;
      setPlayer(prev => ({ ...prev, hp: Math.max(0, prev.hp - eDmg) }));
      setLog(`${enemy.name} retaliates for ${eDmg} damage!`);
      triggerShake();
      
      // Check for Loss Condition
      if (player.hp - eDmg <= 0) {
        playSfx('lose'); // Dark Defeat Sound
        saveScore(); // Save score even when losing
        setScene(SCENES.RESULT);
      }
    }, 800);
  };

  return (
    <Box className={`game-container ${isShaking ? "screen-shake" : ""}`}>
      
      {/* --- PERSISTENT LOGO (Top Left) - Clickable to Home --- */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        className="top-logo-fixed"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (token && username) {
            playSfx('click');
            setPlayer({ name: "Seeker", class: "", hp: 100, maxHp: 100 });
            setEnemy({ name: "The Shadow", hp: 150, maxHp: 150 });
            setBattleStartTime(null);
            setScene(SCENES.START);
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Avatar 
          src="/logo/logo.png" 
          className="header-avatar"
          sx={{ width: 60, height: 60 }} 
        />
      </motion.div>

      <AnimatePresence mode="wait">
        
        {/* --- SCENE 0: AUTHENTICATION --- */}
        {scene === SCENES.AUTH && (
          <motion.div 
            key="auth" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="scene start-screen d-flex align-items-center justify-content-center"
          >
            <div className="particle-container">
              {[...Array(50)].map((_, i) => (
                <span key={i} className="ember"></span>
              ))}
            </div>

            <Box className="auth-container position-relative" style={{ zIndex: 2, maxWidth: "450px", margin: "0 auto" }}>
              <Typography variant="h3" className="medieval-title text-center mb-5">
                {authMode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
              </Typography>

              <form onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <TextField
                    fullWidth
                    label="Username"
                    className="auth-input"
                    value={authForm.username}
                    onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                    required
                    variant="outlined"
                  />
                )}
                
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  className="auth-input"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  required
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  className="auth-input"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  required
                  variant="outlined"
                />

                {authError && (
                  <Typography className="error-text mb-3" style={{ color: "#ff6b6b" }}>
                    {authError}
                  </Typography>
                )}

                <Button 
                  fullWidth 
                  className="game-btn py-2 mb-3"
                  type="submit"
                >
                  {authMode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
                </Button>
              </form>

              {authMode === "login" && (
                <Button 
                  fullWidth 
                  className="game-btn py-2 mb-2"
                  size="small"
                  onClick={() => {
                    playSfx('click');
                    setShowResetPassword(true);
                  }}
                  style={{ fontSize: "0.9rem" }}
                >
                  FORGOT PASSWORD?
                </Button>
              )}

              <Button 
                fullWidth 
                className="game-btn py-2"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "register" : "login");
                  setAuthError("");
                }}
              >
                {authMode === "login" ? "DON'T HAVE AN ACCOUNT?" : "ALREADY HAVE AN ACCOUNT?"}
              </Button>
            </Box>
          </motion.div>
        )}

        {/* --- SCENE 1: START SCREEN --- */}
        {scene === SCENES.START && (
          <motion.div 
            key="start" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="scene start-screen"
            onMouseEnter={() => playSfx('hover')}
          >
            {/* MASSIVE PARTICLE CONTAINER (50 Embers) */}
            <div className="particle-container">
              {[...Array(50)].map((_, i) => (
                <span key={i} className="ember"></span>
              ))}
            </div>

            {/* User Info and Logout */}
            <Box className="position-absolute top-0 end-0 p-3" style={{ zIndex: 10 }}>
              <Typography className="text-white mb-2">
                Welcome, <strong>{username}</strong>
              </Typography>
              <Button 
                className="game-btn" 
                size="small"
                onClick={() => {
                  playSfx('click');
                  handleLogout();
                }}
              >
                LOGOUT
              </Button>
            </Box>

            <div className="d-flex flex-column align-items-center justify-content-end h-100 pb-5 position-relative" style={{ zIndex: 2 }}>
              
              <Button 
                variant="text" 
                className="cinematic-btn mb-4" 
                data-text="— AWAKEN —" 
                onMouseEnter={() => playSfx('hover')}
                onClick={() => {
                  playSfx('click'); // Heavy Drum
                  setScene(SCENES.PROLOGUE);
                }}
              >
                — AWAKEN —
              </Button>

              {/* Leaderboard Button at Bottom */}
              <Button 
                className="game-btn px-5" 
                size="large"
                onMouseEnter={() => playSfx('hover')}
                onClick={() => {
                  playSfx('click');
                  fetchLeaderboard();
                  setShowLeaderboard(true);
                }}
              >
                ⚔ LEADERBOARD ⚔
              </Button>
            </div>
          </motion.div>
        )}

        {/* --- SCENE 2: PROLOGUE --- */}
        {scene === SCENES.PROLOGUE && (
          <motion.div 
            key="prologue" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="scene prologue-screen d-flex align-items-center justify-content-center" 
            onClick={() => {
              playSfx('click');
              setScene(SCENES.CHARACTER);
            }}
          >
            <Box className="prologue-container text-center">
              
              {/* Top Ornament */}
              <div className="medieval-divider mb-4">♦ &nbsp; ⚔ &nbsp; ♦</div>

              <Typography className="prologue-text">
                <span className="drop-cap">T</span>he Blade was bound in the blood of the old world...
              </Typography>
              
              <Typography className="prologue-text mt-3">
                Now, the Shadow returns to claim what is left.
              </Typography>

              {/* Bottom Ornament */}
              <div className="medieval-divider mt-4">♦ &nbsp; ⚔ &nbsp; ♦</div>

              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Typography className="tap-to-skip mt-5">— Tap to Begin the Tale —</Typography>
              </motion.div>

            </Box>
          </motion.div>
        )}

        {/* --- SCENE 3: CHARACTER SELECTION --- */}
        {scene === SCENES.CHARACTER && (
          <motion.div key="char" className="scene char-screen d-flex align-items-center">
            <Container maxWidth="lg">
              <Typography variant="h3" className="medieval-title text-center mb-5">
                SELECT YOUR VESSEL
              </Typography>
              <div className="row g-4 justify-content-center">
                {['knight', 'paladin', 'rouge'].map((c) => (
                  <div key={c} className="col-md-4 col-lg-3">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      className="class-card" 
                      onMouseEnter={() => playSfx('hover')}
                      onClick={() => { 
                        playSfx('select'); // SWORD UNSHEATHE SOUND
                        setPlayer({...player, class: c}); 
                        setScene(SCENES.COMBAT); 
                      }}
                    >
                      <img src={`/characters/${c}.png`} alt={c} className="class-img" />
                      <div className="class-overlay">
                        <Typography variant="h5" className="text-uppercase">{c}</Typography>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </Container>
          </motion.div>
        )}

        {/* --- SCENE 4: COMBAT --- */}
        {scene === SCENES.COMBAT && (
          <motion.div key="combat" className="scene combat-screen">
            <Container className="combat-layout d-flex flex-column justify-content-between py-4">
              
              {/* Top: Enemy Visualization */}
              <div className="enemy-section text-center">
                <motion.img 
                  src="/enemy/enemy.png" 
                  className="enemy-sprite" 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 4 }} 
                />
                <Box className="hp-container mx-auto mt-2">
                  <Typography className="hp-label">THE SHADOW</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(enemy.hp/enemy.maxHp)*100} 
                    className="hp-bar enemy-hp" 
                  />
                </Box>
              </div>

              {/* Middle: Battle Log */}
              <div className="combat-log-area text-center">
                <Typography className="log-text">{log}</Typography>
              </div>

              {/* Bottom: Player UI Panel */}
              <div className="player-ui-section">
                <div className="row align-items-center bg-overlay-ui p-3">
                  <div className="col-md-4 text-white">
                    <Typography className="player-class-label text-uppercase">{player.class}</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(player.hp/player.maxHp)*100} 
                      className="hp-bar player-hp" 
                    />
                  </div>
                  <div className="col-md-8 d-flex gap-3 justify-content-end">
                    <Button 
                      className="game-btn" 
                      onMouseEnter={() => playSfx('hover')}
                      onClick={() => handleAttack('basic')}
                    >
                      STRIKE
                    </Button>
                    <Button 
                      className="game-btn special" 
                      onMouseEnter={() => playSfx('hover')}
                      onClick={() => handleAttack('special')}
                    >
                      BOUND BLADE
                    </Button>
                  </div>
                </div>
              </div>

            </Container>
          </motion.div>
        )}

        {/* --- SCENE 5: RESULT & CREDITS --- */}
        {scene === SCENES.RESULT && (
          <motion.div key="res" className="scene result-screen d-flex flex-column align-items-center justify-content-center">
            <Typography variant="h1" className="result-title mb-0">
              {player.hp > 0 ? "Vanquished" : "Consumed"}
            </Typography>
            <Typography className="result-subtitle mb-5">
              {player.hp > 0 ? "The Shadow retreats into the void." : "Darkness prevails."}
            </Typography>
            
            <div className="d-flex gap-3 mb-5">
              <Button 
                className="game-btn px-5" 
                onMouseEnter={() => playSfx('hover')}
                onClick={() => {
                  playSfx('click');
                  setPlayer({ name: "Seeker", class: "", hp: 100, maxHp: 100 });
                  setEnemy({ name: "The Shadow", hp: 150, maxHp: 150 });
                  setBattleStartTime(null);
                  setScene(SCENES.PROLOGUE);
                }}
              >
                RETRY TALE
              </Button>

              <Button 
                className="game-btn px-5" 
                onMouseEnter={() => playSfx('hover')}
                onClick={() => {
                  playSfx('click');
                  fetchLeaderboard();
                  setShowLeaderboard(true);
                }}
              >
                LEADERBOARD
              </Button>
            </div>

            {/* Developer Architect Credit */}
            <Box className="dev-footer text-center mt-4">
              <Typography className="dev-label">ARCHITECT</Typography>
              <Typography className="dev-name">Kavya Jain</Typography>
              <Typography className="dev-sub">AI ML STUDENT</Typography>
            </Box>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Leaderboard Dialog */}
      <Dialog 
        open={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)}
        maxWidth="sm"
        fullWidth
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <DialogTitle className="medieval-title">LEADERBOARD</DialogTitle>
        <DialogContent>
          {leaderboard.length === 0 ? (
            <Typography>No scores yet. Start playing!</Typography>
          ) : (
            <div className="mt-3">
              {leaderboard.map((entry, index) => (
                <Box key={index} className="leaderboard-entry p-2 mb-2" style={{ borderBottom: "1px solid #444" }}>
                  <Typography variant="body2">
                    <strong>#{index + 1}</strong> {entry.username}
                  </Typography>
                  <Typography variant="caption" style={{ color: "#aaa" }}>
                    Score: {Math.floor(entry.bestScore)} | Battles: {entry.totalBattles}
                  </Typography>
                </Box>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLeaderboard(false)} className="game-btn">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog 
        open={showResetPassword} 
        onClose={() => {
          setShowResetPassword(false);
          setResetForm({ email: "", newPassword: "", confirmPassword: "" });
          setResetError("");
          setResetSuccess("");
        }}
        maxWidth="sm"
        fullWidth
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <DialogTitle className="medieval-title">RESET PASSWORD</DialogTitle>
        <DialogContent>
          <form onSubmit={handleResetPassword} style={{ marginTop: "20px" }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              className="auth-input"
              value={resetForm.email}
              onChange={(e) => setResetForm({...resetForm, email: e.target.value})}
              required
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />

            <TextField
              fullWidth
              label="New Password"
              type="password"
              className="auth-input"
              value={resetForm.newPassword}
              onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
              required
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              className="auth-input"
              value={resetForm.confirmPassword}
              onChange={(e) => setResetForm({...resetForm, confirmPassword: e.target.value})}
              required
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />

            {resetError && (
              <Typography style={{ color: "#ff6b6b", marginBottom: "10px", textAlign: "center" }}>
                {resetError}
              </Typography>
            )}

            {resetSuccess && (
              <Typography style={{ color: "#51cf66", marginBottom: "10px", textAlign: "center" }}>
                {resetSuccess}
              </Typography>
            )}

            <Button 
              fullWidth 
              className="game-btn py-2"
              type="submit"
            >
              RESET PASSWORD
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setShowResetPassword(false);
              setResetForm({ email: "", newPassword: "", confirmPassword: "" });
              setResetError("");
              setResetSuccess("");
            }} 
            className="game-btn"
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;