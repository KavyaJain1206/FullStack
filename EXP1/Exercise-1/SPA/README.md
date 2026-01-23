# Exercise-1: Single Page Application (SPA) - Counter

## Overview

This is a simple Single Page Application (SPA) built with React and Vite. The application demonstrates a basic counter component with increment and decrement functionality.

## Features

- **Counter Component**: Display and manage a counter state
- **Increment Button**: Increase the counter by 1
- **Decrement Button**: Decrease the counter by 1
- **State Management**: Uses React's `useState` hook for state management

## Technologies Used

- React 18
- Vite - Fast build tool and dev server
- JavaScript
- CSS

## Project Structure

```
SPA/
├── src/
│   ├── App.jsx          # Main counter component
│   ├── App.css          # Styling
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── eslint.config.js     # ESLint configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

   ```bash
   cd Exercise-1/SPA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

**Development Mode:**

```bash
npm run dev
```

The application will start at `http://localhost:5173`

**Build for Production:**

```bash
npm run build
```

**Preview Production Build:**

```bash
npm run preview
```

## How It Works

- The counter state is initialized with `useState(0)`
- Click the "+" button to increment the counter
- Click the "-" button to decrement the counter
- The counter value is displayed in real-time

## Learning Objectives

- Understanding React hooks (`useState`)
- Managing component state
- Event handling in React
- Building a simple SPA

## ESLint Configuration

The project includes ESLint rules for code quality. To extend the configuration for production use, refer to TypeScript template guidelines.
