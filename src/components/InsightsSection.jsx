import React from 'react';
import { useFinance } from '../context/FinanceContext';

export const InsightsSection = () => {
  const { getInsights } = useFinance();
  const insights = getInsights();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Financial Insights
      </h3>
      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                {insight}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No insights available yet.
        </p>
      )}
    </div>
  );
};

export default InsightsSection;
