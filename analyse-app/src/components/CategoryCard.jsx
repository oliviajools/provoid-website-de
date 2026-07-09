import React from 'react';
import ScoreRing from './ScoreRing';

const CategoryCard = ({ category, score, icon: Icon, description, onClick, isActive, isCompleted }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-6 transition-all duration-300 cursor-pointer ${
        isActive ? 'ring-2 ring-provoid-500 bg-provoid-500/20' : ''
      } ${isCompleted ? 'border-green-500/50' : ''} hover:bg-white/15`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${isCompleted ? 'bg-green-500/20' : 'bg-provoid-500/20'}`}>
            <Icon className={`w-6 h-6 ${isCompleted ? 'text-green-400' : 'text-provoid-400'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{category}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {isCompleted && score !== undefined && (
          <ScoreRing score={score} size={60} strokeWidth={4} />
        )}
      </div>
      
      {isCompleted && (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Abgeschlossen
        </div>
      )}
      
      {!isCompleted && (
        <div className="text-sm text-gray-500">
          Klicken zum Starten
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
