// src/pages/DashboardPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  // Static placeholder data
  const user = {
    name: "John Doe",
    xp: 2100,
    level: 5,
    nextLevelXp: 2500,
    coursesCompleted: 12,
    learningTime: '47h'
  };

  const badges = [
    { name: 'Phishing Expert', icon: '🎣', unlocked: true },
    { name: 'Lorem Ipsum', icon: '🔒', unlocked: true },
    { name: 'Lorem Ipsum', icon: '🛡️', unlocked: false },
    { name: 'Lorem Ipsum', icon: '⚡', unlocked: false },
  ];

  const currentCourse = {
    title: 'Advanced Threat Detection',
    description: 'Learn to identify and mitigate sophisticated cyber attacks',
    progress: 75,
    timeRemaining: '42 minutes remaining'
  };

  const availableCourses = [
    { 
      title: 'Phishing Detection Game', 
      xp: '+50 XP', 
      difficulty: 'Intermediate', 
      color: 'bg-red-100',
      description: 'Click to identify suspicious email elements',
      route: '/quiz/phishing',
      icon: '🎣'
    },
    { 
      title: 'Security Sorting Challenge', 
      xp: '+100 XP', 
      difficulty: 'Beginner', 
      color: 'bg-green-100',
      description: 'Drag & drop security items into categories',
      route: '/quiz/dragdrop',
      icon: '🎮'
    },
    { 
      title: 'Social Engineering', 
      xp: '+350 XP', 
      difficulty: 'Beginner', 
      color: 'bg-yellow-100',
      description: 'Learn to recognize manipulation tactics',
      route: '#',
      icon: '🗣️'
    },
    { 
      title: 'Secure Coding', 
      xp: '+680 XP', 
      difficulty: 'Advanced', 
      color: 'bg-purple-100',
      description: 'Best practices for writing secure code',
      route: '#',
      icon: '💻'
    },
  ];

  const certificates = [
    { title: 'Network Security Fundamentals', date: 'January 15, 2025' },
    { title: 'Incident Response Specialist', date: 'October 24, 2025' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-cyber-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-semibold text-cyber-dark">CyberCertify</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="text-cyber-blue font-medium border-b-2 border-cyber-blue pb-1">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-cyber-blue">Courses</a>
            <a href="#" className="text-gray-600 hover:text-cyber-blue">Certificates</a>
            <a href="#" className="text-gray-600 hover:text-cyber-blue">Profile</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <span className="text-sm font-medium hidden md:block">Your Name</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow border border-cyber-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyber-dark mb-1">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">✨ 7 day learning streak! Keep up the great work!</p>
            </div>
          </div>
        </div>

        {/* Progress Overview & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Progress Card */}
          <div className="bg-white rounded-lg shadow border border-cyber-border p-6">
            <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
            
            <div className="space-y-4">
              {/* Level Display */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-cyber-dark">Level {user.level}</span>
                <span className="text-cyber-blue font-semibold">{user.xp} XP</span>
              </div>

              {/* XP Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Next Level Progress</span>
                  <span className="text-cyber-blue">{Math.round((user.xp / user.nextLevelXp) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-cyber-blue h-3 rounded-full transition-all"
                    style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {user.nextLevelXp - user.xp} XP until Level {user.level + 1}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow border border-cyber-border p-6">
              <div className="text-4xl font-bold text-cyber-blue mb-1">{user.coursesCompleted}</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow border border-cyber-border p-6">
              <div className="text-4xl font-bold text-cyber-blue mb-1">{user.learningTime}</div>
              <div className="text-sm text-gray-600">Learning Time</div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-lg shadow border border-cyber-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  badge.unlocked 
                    ? 'border-cyber-blue bg-blue-50' 
                    : 'border-gray-200 bg-gray-50 opacity-50 grayscale'
                }`}
              >
                <div className="text-5xl mb-2">{badge.icon}</div>
                <div className="text-sm font-medium text-gray-700">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        <div className="bg-white rounded-lg shadow border border-cyber-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
              📧
            </div>
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-cyber-dark mb-1">{currentCourse.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{currentCourse.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div 
                  className="bg-cyber-blue h-2 rounded-full transition-all"
                  style={{ width: `${currentCourse.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{currentCourse.progress}% complete • {currentCourse.timeRemaining}</p>
            </div>
            <button 
              onClick={() => navigate('/quiz/phishing')}
              className="px-6 py-2 bg-cyber-dark text-white rounded-lg hover:bg-opacity-90 transition-all flex-shrink-0"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Available Courses */}
        <div className="bg-white rounded-lg shadow border border-cyber-border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableCourses.map((course, index) => (
              <div key={index} className={`${course.color} rounded-lg p-4 border border-cyber-border hover:shadow-lg transition-all`}>
                <div className="w-full aspect-video bg-white rounded-lg mb-3 flex items-center justify-center border border-gray-200">
                  <span className="text-6xl">{course.icon}</span>
                </div>
                <h3 className="font-semibold mb-1 text-gray-800">{course.title}</h3>
                <p className="text-xs text-gray-600 mb-3 min-h-10">{course.description}</p>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-700 font-medium">{course.xp}</span>
                  <span className="text-xs px-2 py-1 bg-white rounded border border-gray-300">{course.difficulty}</span>
                </div>
                <button 
                  onClick={() => {
                    if (course.route !== '#') {
                      navigate(course.route);
                    }
                  }}
                  disabled={course.route === '#'}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                    course.route !== '#'
                      ? 'bg-cyber-dark text-white hover:bg-opacity-90 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {course.route !== '#' ? 'Start Course' : 'Coming Soon'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-lg shadow border border-cyber-border p-6">
          <h2 className="text-lg font-semibold mb-4">Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div key={index} className="border border-cyber-border rounded-lg p-4">
                <div className="w-full aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-6xl">🏆</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-500 mb-3">Earned: {cert.date}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-cyber-dark text-white rounded-lg text-sm hover:bg-opacity-90">
                    View
                  </button>
                  <button className="flex-1 py-2 border border-cyber-border rounded-lg text-sm hover:bg-gray-50">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-cyber-border py-6 mt-8">
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

export default DashboardPage;