import React from 'react';

const ScoreRing = ({ score, size = 120, strokeWidth = 8, label, color = 'cyan', textSize = 'text-2xl' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const colors = {
    purple: { stroke: '#a855f7', bg: 'rgba(168, 85, 247, 0.2)' },
    blue: { stroke: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' },
    green: { stroke: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)' },
    orange: { stroke: '#f97316', bg: 'rgba(249, 115, 22, 0.2)' },
    pink: { stroke: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)' },
    cyan: { stroke: '#06b6d4', bg: 'rgba(6, 182, 212, 0.2)' },
  };

  const getScoreColor = (s) => {
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#06b6d4';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors[color]?.bg || 'rgba(255,255,255,0.1)'}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`${textSize} font-bold text-white`}>{Math.round(score)}</span>
        {label && <span className="text-xs text-gray-400 text-center max-w-[80px]">{label}</span>}
      </div>
    </div>
  );
};

export default ScoreRing;
