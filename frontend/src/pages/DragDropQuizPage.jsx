// src/pages/DragDropQuizPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DragDropQuizPage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState([
    { id: 1, text: '🔒 HTTPS website', safe: true, placed: false },
    { id: 2, text: '⚠️ HTTP login page', safe: false, placed: false },
    { id: 3, text: '📧 Email from known contact', safe: true, placed: false },
    { id: 4, text: '🎣 Urgent password reset email', safe: false, placed: false },
    { id: 5, text: '🔐 Strong password (16+ chars)', safe: true, placed: false },
    { id: 6, text: '⚡ Password: password123', safe: false, placed: false },
    { id: 7, text: '✅ Two-factor authentication', safe: true, placed: false },
    { id: 8, text: '❌ Public WiFi for banking', safe: false, placed: false },
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [maxCombo, setMaxCombo] = useState(0);

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(60);
    setGameOver(false);
    setShowAchievement(false);
    setItems(items.map(item => ({ ...item, placed: false })));
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (isSafeBucket) => {
    if (!draggedItem || draggedItem.placed) return;

    const isCorrect = draggedItem.safe === isSafeBucket;
    
    if (isCorrect) {
      const basePoints = 50;
      const comboBonus = combo * 10;
      const totalPoints = basePoints + comboBonus;
      const newCombo = combo + 1;
      
      setScore(score + totalPoints);
      setCombo(newCombo);
      
      // Track max combo
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
      
      // Achievement: Full combo (all 8 items correct in a row)
      if (newCombo === 8) {
        setTimeout(() => {
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 4000);
        }, 1000);
      }
      
      setFeedback(`✅ Correct! +${totalPoints} points! ${combo > 0 ? `Combo x${newCombo}!` : ''}`);
      
      // Mark as placed
      setItems(items.map(item => 
        item.id === draggedItem.id ? { ...item, placed: true } : item
      ));
    } else {
      setCombo(0);
      setFeedback(`❌ Wrong! Combo broken!`);
    }

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);

    setDraggedItem(null);

    // Check if all items placed
    if (items.filter(i => !i.placed).length === 1) {
      setTimeout(() => setGameOver(true), 1000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const remainingItems = items.filter(item => !item.placed);
  const placedCorrectly = items.filter(item => item.placed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            ← Back to Dashboard
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-semibold text-cyber-dark">CyberCertify</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {!gameStarted ? (
          // Start Screen
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-6">🎮</div>
            <h1 className="text-3xl font-bold mb-4">Security Sorting Challenge</h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Drag and drop items into the correct categories: Safe or Unsafe.
              Complete as many as you can before time runs out!
              Build combos for bonus points!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-cyber-blue text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 shadow-lg"
              >
                Start Challenge
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 border border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : gameOver ? (
          // Game Over Screen
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-6">
              {placedCorrectly >= 6 ? '🏆' : placedCorrectly >= 4 ? '⭐' : '💪'}
            </div>
            <h1 className="text-3xl font-bold mb-4">Challenge Complete!</h1>
            <div className="text-5xl font-bold text-cyber-blue mb-2">{score} Points</div>
            <p className="text-gray-600 mb-8">
              You correctly sorted {placedCorrectly} out of {items.length} items
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-cyber-blue text-white rounded-lg hover:bg-opacity-90"
              >
                Play Again
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          // Game Screen
          <>
            {/* Game Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Timer</div>
                <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-cyber-blue'}`}>
                  {timeLeft}s
                </div>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Combo</div>
                <div className="text-3xl font-bold text-orange-500">x{combo}</div>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Score</div>
                <div className="text-3xl font-bold text-cyber-blue">{score}</div>
              </div>
            </div>

            {/* Feedback - Fixed Position */}
            {showFeedback && (
              <div className={`${
                feedback.includes('✅') ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              } border-2 rounded-lg p-4 text-center font-semibold fixed top-24 left-1/2 -translate-x-1/2 z-40 shadow-lg min-w-96 animate-bounce`}>
                {feedback}
              </div>
            )}

            {/* Achievement Popup - Full Combo */}
            {showAchievement && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-1 animate-bounce">
                  <div className="bg-white rounded-xl p-8 text-center">
                    <div className="text-7xl mb-4 animate-pulse">⚡</div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                      ACHIEVEMENT UNLOCKED!
                    </h2>
                    <p className="text-xl font-semibold text-gray-800 mb-1">Perfect Combo Master</p>
                    <p className="text-sm text-gray-600">8x combo! Sorted all items correctly in a row!</p>
                    <div className="mt-4 text-2xl font-bold text-purple-600">+100 Bonus XP!</div>
                  </div>
                </div>
              </div>
            )}

            {/* Game Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Items to Sort */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold mb-4 text-center">Drag These Items</h3>
                <div className="space-y-3">
                  {remainingItems.map(item => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 cursor-move hover:border-cyber-blue hover:bg-blue-50 transition-all active:opacity-50"
                    >
                      <div className="text-sm font-medium">{item.text}</div>
                    </div>
                  ))}
                  {remainingItems.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      All items sorted!
                    </div>
                  )}
                </div>
              </div>

              {/* Safe Bucket */}
              <div
                onDrop={() => handleDrop(true)}
                onDragOver={handleDragOver}
                className="bg-green-50 border-4 border-dashed border-green-500 rounded-lg p-6 min-h-96 flex flex-col items-center justify-center hover:bg-green-100 transition-all"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">SAFE</h3>
                <p className="text-sm text-green-600 text-center">
                  Drop secure practices here
                </p>
              </div>

              {/* Unsafe Bucket */}
              <div
                onDrop={() => handleDrop(false)}
                onDragOver={handleDragOver}
                className="bg-red-50 border-4 border-dashed border-red-500 rounded-lg p-6 min-h-96 flex flex-col items-center justify-center hover:bg-red-100 transition-all"
              >
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">UNSAFE</h3>
                <p className="text-sm text-red-600 text-center">
                  Drop security risks here
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-cyber-blue">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-blue">Terms of Service</a>
            <a href="#" className="hover:text-cyber-blue">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DragDropQuizPage;