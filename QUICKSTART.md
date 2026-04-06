# Finance Dashboard - Quick Start Guide

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
- Application opens at: `http://localhost:5174/`
- Hot reload enabled - changes save automatically

### 2. Build for Production
```bash
npm run build
```
- Creates optimized build in `dist/` folder
- Ready to deploy

## 📋 Quick Feature Overview

### Dashboard Section
- **Summary Cards** (Top): Total Balance, Income, Expenses
- **Bar Chart**: Spending breakdown by category
- **Line Chart**: Balance trend over time

### Insights Section
- Financial observations and recommendations
- Automatically generated from your data

### Transactions Section
- View all transactions with filtering & sorting
- Search by category or date
- Admin can add/delete transactions

## 🎮 How to Use

### Switch User Role
1. Look at top-right corner of header
2. Click "Viewer" or "Admin" button
3. Admin mode unlocks add/delete features

### Filter Transactions
- **Search**: Look up by date or category
- **Category**: Select specific category
- **Type**: Show income or expenses only
- **Sort**: Order by date or amount

### Add Transaction (Admin Only)
1. Click "+ Add Transaction" button
2. Fill in: Date, Amount, Category, Type
3. Click "Add Transaction"

### Toggle Dark Mode
- Click moon/sun icon in header
- Theme saves automatically

## 📊 Key Sections

### 1. Dashboard Overview
Shows financial summary with:
- Total balance calculation
- Income vs. expenses breakdown
- Visual trends and patterns

### 2. Insights
Provides insights such as:
- Highest spending category
- Income efficiency analysis
- Average transaction values

### 3. Transactions
Complete transaction management:
- Full transaction history
- Multiple filtering options
- Admin edit/delete features

## 🎨 Design Features

### Responsive Design
- ✅ Desktop (1024px+)
- ✅ Tablet (640px - 1024px)
- ✅ Mobile (< 640px)

### Color Coding
- **Blue**: Income, balance
- **Green**: Positive trends
- **Red**: Expenses, negatives
- **Purple**: Admin features
- **Amber**: Warnings/alerts

### Smooth Animations
- Slide-down effects on cards
- Fade-in transitions
- Hover effects on interactive elements

## 📁 Project Structure

```
zorvyn/
├── src/
│   ├── components/        # React components
│   ├── context/          # State management
│   ├── App.jsx           # Main app
│   ├── index.css         # Tailwind + styles
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind config
├── postcss.config.js     # PostCSS config
├── vite.config.js        # Vite config
└── README.md             # Full documentation
```

## 🔧 Troubleshooting

### Dev Server Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Styles Not Loading
- Ensure Tailwind CSS is installed: `npm install -D tailwindcss postcss autoprefixer`
- Check `src/index.css` has Tailwind directives

### Component Not Showing
- Verify component is imported in `App.jsx`
- Check browser console for errors
- Ensure component export is correct

## 💡 Tips & Tricks

### Add More Mock Data
Edit `src/context/FinanceContext.jsx`:
```javascript
const mockTransactions = [
  // Add more transactions here
  { id: 13, date: '2024-04-01', amount: 50, category: 'Shopping', type: 'expense' },
];
```

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  // ... more colors
}
```

### Change Starting Role
Edit `src/context/FinanceContext.jsx`:
```javascript
const [role, setRole] = useState('admin'); // Change from 'viewer'
```

## 📚 Component Reference

| Component | Purpose | Location |
|-----------|---------|----------|
| Header | Navigation & controls | `components/Header.jsx` |
| SummaryCards | Overview cards | `components/SummaryCards.jsx` |
| ChartsSection | Data visualizations | `components/ChartsSection.jsx` |
| InsightsSection | Financial insights | `components/InsightsSection.jsx` |
| TransactionsSection | Transaction management | `components/TransactionsSection.jsx` |

## 🔐 State Management

### Context API Structure
```
FinanceContext
├── transactions
├── role 
├── filters
├── sortBy
├── darkMode
└── methods (add, delete, filter, etc.)
```

All components access state via `useFinance()` hook.

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
- Drag and drop `dist/` folder
- Or connect GitHub repository

### GitHub Pages
```bash
npm run build
# Upload dist/ to gh-pages branch
```

## 📊 Mock Data Categories

Pre-loaded categories:
- Salary (income)
- Groceries
- Rent
- Entertainment
- Utilities
- Transportation
- Dining
- Shopping
- Healthcare

## ✅ Verification Checklist

- [ ] Dev server runs without errors
- [ ] All sections visible on dashboard
- [ ] Can switch between Viewer and Admin roles
- [ ] Transactions can be added (Admin mode)
- [ ] Transactions can be deleted (Admin mode)
- [ ] Filters work correctly
- [ ] Dark mode toggles properly
- [ ] Responsive on mobile devices
- [ ] Charts display correctly
- [ ] Insights section shows data

## 🎓 Learning Resources

This project teaches:
- React hooks and Context API
- Tailwind CSS utility-first styling
- Building responsive UIs
- Data visualization with SVG
- State management patterns
- Component composition
- Form handling in React

## 📞 Support

For issues or questions:
1. Check README.md for detailed documentation
2. Review code comments in components
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: April 6, 2024
