// src/pages/PhishingQuizPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PhishingQuizPage() {
  const navigate = useNavigate();
  const [foundIndicators, setFoundIndicators] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  // Phishing indicators with their positions
  const indicators = [
    { 
      id: 1, 
      element: 'sender',
      text: 'security@amazom.com',
      reason: 'Suspicious sender domain - "amazom" instead of "amazon"',
      xp: 10
    },
    { 
      id: 2, 
      element: 'subject',
      text: 'URGENT',
      reason: 'Creates false sense of urgency - common phishing tactic',
      xp: 10
    },
    { 
      id: 3, 
      element: 'link',
      text: 'Click here',
      reason: 'Suspicious link that doesn\'t match the supposed sender',
      xp: 10
    },
    { 
      id: 4, 
      element: 'threat',
      text: 'account will be suspended',
      reason: 'Threatening language to pressure immediate action',
      xp: 10
    },
    { 
      id: 5, 
      element: 'timeLimit',
      text: '24 hours',
      reason: 'Artificial time pressure to prevent careful consideration',
      xp: 10
    },
  ];

  const handleClick = (indicator) => {
    if (foundIndicators.includes(indicator.id)) {
      return; // Already found
    }

    // Add to found indicators
    setFoundIndicators([...foundIndicators, indicator.id]);
    setScore(score + indicator.xp);
    
    // Show feedback
    setFeedbackMessage(indicator.reason);
    setShowFeedback(true);

    // Check if completed
    if (foundIndicators.length + 1 === indicators.length) {
      setTimeout(() => {
        setCompleted(true);
        setShowAchievement(true);
        // Hide achievement after 4 seconds
        setTimeout(() => setShowAchievement(false), 4000);
      }, 2000);
    }

    // Hide feedback after 10 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 10000);
  };

  const isFound = (id) => foundIndicators.includes(id);

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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Quiz Header */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="inline-block px-3 py-1 bg-cyber-dark text-white text-xs rounded-full mb-2">
                Interactive Question
              </span>
              <h1 className="text-2xl font-bold text-gray-800">
                CyberCertify - Advanced Phishing Detection
              </h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Question 5 of 10</div>
              <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-cyber-blue h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Examine this email. Can you spot the phishing indicators?</h2>
          <p className="text-gray-600">
            Click on suspicious elements in the email below to identify phishing indicators.
          </p>
        </div>

        {/* Email Display */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden max-w-3xl mx-auto">
            {/* Email Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm text-gray-600 font-medium w-16">From:</span>
                <button
                  onClick={() => handleClick(indicators[0])}
                  className={`text-sm font-mono px-2 py-1 rounded transition-all ${
                    isFound(1) 
                      ? 'bg-red-100 border-2 border-red-500 text-red-700' 
                      : 'hover:bg-yellow-50 border border-transparent'
                  }`}
                >
                  security@amazom.com
                  {isFound(1) && <span className="ml-2 text-xs">✓</span>}
                </button>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-gray-600 font-medium w-16">Subject:</span>
                <div className="flex-1">
                  <button
                    onClick={() => handleClick(indicators[1])}
                    className={`text-sm font-semibold px-2 py-1 rounded transition-all ${
                      isFound(2) 
                        ? 'bg-red-100 border-2 border-red-500 text-red-700' 
                        : 'hover:bg-yellow-50 border border-transparent'
                    }`}
                  >
                    URGENT
                    {isFound(2) && <span className="ml-2 text-xs">✓</span>}
                  </button>
                  <span className="text-sm"> Your account will be suspended!</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 bg-white">
              <p className="mb-4 text-gray-700">Dear Valued Customer,</p>
              
              <p className="mb-4 text-gray-700">
                Your Amazon account has been flagged for suspicious activity.{' '}
                <button
                  onClick={() => handleClick(indicators[2])}
                  className={`font-medium underline px-1 rounded transition-all ${
                    isFound(3) 
                      ? 'bg-red-100 border-2 border-red-500 text-red-700 no-underline' 
                      : 'text-blue-600 hover:bg-yellow-50'
                  }`}
                >
                  Click here
                  {isFound(3) && <span className="ml-1 text-xs">✓</span>}
                </button>
                {' '}immediately to verify your account before it gets{' '}
                <button
                  onClick={() => handleClick(indicators[3])}
                  className={`font-semibold px-1 rounded transition-all ${
                    isFound(4) 
                      ? 'bg-red-100 border-2 border-red-500 text-red-700' 
                      : 'hover:bg-yellow-50 border border-transparent'
                  }`}
                >
                  suspended
                  {isFound(4) && <span className="ml-1 text-xs">✓</span>}
                </button>
                .
              </p>

              <p className="mb-4 text-gray-700">
                You have only{' '}
                <button
                  onClick={() => handleClick(indicators[4])}
                  className={`font-bold px-1 rounded transition-all ${
                    isFound(5) 
                      ? 'bg-red-100 border-2 border-red-500 text-red-700' 
                      : 'hover:bg-yellow-50 border border-transparent'
                  }`}
                >
                  24 hours
                  {isFound(5) && <span className="ml-1 text-xs">✓</span>}
                </button>
                {' '}to complete this verification process.
              </p>

              {/* Verify Button */}
              <div className="bg-gray-100 rounded-lg p-4 text-center mt-6">
                <button className="px-8 py-3 bg-gray-600 text-white rounded-lg font-medium">
                  VERIFY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Message - Fixed Position */}
        {showFeedback && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-50 border-2 border-green-500 rounded-lg p-4 shadow-lg animate-bounce max-w-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-semibold text-green-800 mb-1">Correct! +{indicators.find(i => !isFound(i.id) || i.id === foundIndicators[foundIndicators.length - 1])?.xp || 10}XP</div>
                <div className="text-sm text-green-700">{feedbackMessage}</div>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Popup */}
        {showAchievement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl p-1 animate-bounce">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-7xl mb-4 animate-pulse">🏆</div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-2">
                  ACHIEVEMENT UNLOCKED!
                </h2>
                <p className="text-xl font-semibold text-gray-800 mb-1">Phishing Expert</p>
                <p className="text-sm text-gray-600">Perfect score! Found all phishing indicators</p>
                <div className="mt-4 text-2xl font-bold text-cyber-blue">+50 Bonus XP!</div>
              </div>
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyber-blue text-sm font-medium mb-1">
                Found {foundIndicators.length} out of {indicators.length} phishing indicators
              </div>
              <div className="w-64 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-cyber-blue h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(foundIndicators.length / indicators.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cyber-blue">{score} XP</div>
              <div className="text-sm text-gray-600">Current Score</div>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {completed && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-lg p-8 mb-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Perfect Score!</h2>
            <p className="text-gray-600 mb-4">
              Great job identifying all the phishing indicators! You've earned {score} XP!
            </p>
            <div className="bg-white rounded-lg p-4 max-w-md mx-auto mb-6">
              <h3 className="font-semibold mb-2">Key Learning Point:</h3>
              <p className="text-sm text-gray-700">
                Always verify urgent requests through official channels before taking action.
              </p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-cyber-blue text-white rounded-lg font-medium hover:bg-opacity-90"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Action Buttons */}
        {!completed && (
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-cyber-dark text-white rounded-lg font-medium hover:bg-opacity-90">
              Submit Answer
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Skip Question
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-cyber-blue">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-blue">Terms of Service</a>
            <a href="#" className="hover:text-cyber-blue">Contact Us</a>
          </div>
          <button className="w-8 h-8 bg-gray-300 rounded-full hover:bg-gray-400 transition-all">
            ?
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PhishingQuizPage;