import React, { createContext, useState, useCallback, useEffect } from 'react';

export const FinanceContext = createContext();

// Mock data
const mockTransactions = [
  { id: 1, date: '2024-04-05', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-04-05', amount: 45, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2024-04-04', amount: 1200, category: 'Rent', type: 'expense' },
  { id: 4, date: '2024-04-04', amount: 80, category: 'Entertainment', type: 'expense' },
  { id: 5, date: '2024-04-03', amount: 150, category: 'Utilities', type: 'expense' },
  { id: 6, date: '2024-04-03', amount: 65, category: 'Transportation', type: 'expense' },
  { id: 7, date: '2024-04-02', amount: 120, category: 'Dining', type: 'expense' },
  { id: 8, date: '2024-04-02', amount: 30, category: 'Entertainment', type: 'expense' },
  { id: 9, date: '2024-04-01', amount: 500, category: 'Shopping', type: 'expense' },
  { id: 10, date: '2024-03-31', amount: 2500, category: 'Salary', type: 'income' },
  { id: 11, date: '2024-03-30', amount: 200, category: 'Healthcare', type: 'expense' },
  { id: 12, date: '2024-03-29', amount: 75, category: 'Groceries', type: 'expense' },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('viewer'); // 'viewer' or 'admin'
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    searchTerm: '',
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Add transaction (admin only)
  const addTransaction = useCallback((transaction) => {
    if (role === 'admin') {
      const newTransaction = {
        ...transaction,
        id: Math.max(...transactions.map(t => t.id), 0) + 1,
      };
      setTransactions([newTransaction, ...transactions]);
      return newTransaction;
    }
  }, [role, transactions]);

  // Update transaction (admin only)
  const updateTransaction = useCallback((id, updates) => {
    if (role === 'admin') {
      setTransactions(transactions.map(t =>
        t.id === id ? { ...t, ...updates } : t
      ));
    }
  }, [role, transactions]);

  // Delete transaction (admin only)
  const deleteTransaction = useCallback((id) => {
    if (role === 'admin') {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  }, [role, transactions]);

  // Get filtered and sorted transactions
  const getFilteredTransactions = useCallback(() => {
    let filtered = transactions;

    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(t =>
        t.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        t.date.includes(filters.searchTerm)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [transactions, filters, sortBy]);

  // Calculate summary
  const calculateSummary = useCallback(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions]);

  // Get spending by category
  const getSpendingByCategory = useCallback(() => {
    const spending = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });
    return Object.entries(spending)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  // Get balance trend
  const getBalanceTrend = useCallback(() => {
    const dailyTransactions = {};
    let runningBalance = 0;

    [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(t => {
        if (!dailyTransactions[t.date]) {
          dailyTransactions[t.date] = 0;
        }
        const amount = t.type === 'income' ? t.amount : -t.amount;
        dailyTransactions[t.date] += amount;
        runningBalance += amount;
      });

    return Object.entries(dailyTransactions).map(([date, change]) => ({
      date,
      change,
    }));
  }, [transactions]);

  // Get insights
  const getInsights = useCallback(() => {
    const spending = getSpendingByCategory();
    const summary = calculateSummary();
    
    const insights = [];

    if (spending.length > 0) {
      insights.push(
        `Your highest spending category is ${spending[0].category} with $${spending[0].amount.toFixed(2)}`
      );
    }

    if (summary.totalExpenses > summary.totalIncome) {
      insights.push(
        `You\'re spending more than you\'re earning. Consider reducing expenses.`
      );
    } else if (summary.totalExpenses < summary.totalIncome * 0.5) {
      insights.push(
        `Great! You\'re saving more than 50% of your income.`
      );
    }

    const avgDaily = summary.totalExpenses / transactions.filter(t => t.type === 'expense').length;
    insights.push(
      `Your average expense per transaction is $${avgDaily.toFixed(2)}`
    );

    return insights;
  }, [transactions, getSpendingByCategory, calculateSummary]);

  const value = {
    transactions,
    role,
    setRole,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    calculateSummary,
    getSpendingByCategory,
    getBalanceTrend,
    getInsights,
    darkMode,
    setDarkMode,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
