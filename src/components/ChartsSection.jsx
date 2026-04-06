import React from 'react';
import { useFinance } from '../context/FinanceContext';

const SimpleBarChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount));
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.category}
              </label>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ${item.amount.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.amount / maxAmount) * 100}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimpleLineChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  const width = 500;
  const height = 250;
  const padding = 40;
  const graphWidth = width - 2 * padding;
  const graphHeight = height - 2 * padding;

  const values = data.map((d) => d.change);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values, 0);
  const range = maxValue - minValue || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * graphWidth;
    const y = height - padding - ((d.change - minValue) / range) * graphHeight;
    return { x, y, value: d.change, date: d.date };
  });

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          className="min-w-full dark:bg-gray-700 rounded-lg bg-gray-50"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((y) => (
            <line
              key={`grid-${y}`}
              x1={padding}
              y1={padding + y * graphHeight}
              x2={width - padding}
              y2={padding + y * graphHeight}
              stroke="#e5e7eb"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          ))}

          {/* Line */}
          {points.length > 1 && (
            <polyline
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.7"
            />
          )}

          {/* Points */}
          {points.map((p, i) => (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#3b82f6"
              opacity="0.8"
            />
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#374151"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export const ChartsSection = () => {
  const { getSpendingByCategory, getBalanceTrend } = useFinance();
  const spendingData = getSpendingByCategory();
  const trendData = getBalanceTrend();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
        <SimpleBarChart
          data={spendingData}
          title="Spending by Category"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
        <SimpleLineChart data={trendData} title="Balance Trend" />
      </div>
    </div>
  );
};

export default ChartsSection;
