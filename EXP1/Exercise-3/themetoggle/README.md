# Exercise-3: Theme Toggle Application

## Overview

A theme toggle application built with React and Vite that allows users to switch between light and dark modes. This project demonstrates conditional rendering and CSS class management based on component state.

## Features

- **Light/Dark Theme Toggle**: Switch between two themes with a single button click
- **Dynamic Styling**: CSS classes change based on the current theme
- **Smooth Theme Switching**: Instant visual feedback
- **State Persistence**: Uses React state to maintain theme preference

## Technologies Used

- React 18
- Vite - Fast build tool and dev server
- JavaScript
- CSS (with conditional class names)

## Project Structure

```
themetoggle/
├── src/
│   ├── App.jsx          # Main theme toggle component
│   ├── App.css          # Styling for light and dark modes
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
   cd Exercise-3/themetoggle
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

- **State Management**: `darkMode` boolean state tracks the current theme
- **Conditional Class**: The root div receives either "dark" or "light" class based on `darkMode` state
- **Toggle Functionality**: Button click toggles the `darkMode` state between true and false
- **CSS Styling**: Different background colors and text colors for each theme

## CSS Theme Structure

```css
.light {
  /* Light mode styles */
}

.dark {
  /* Dark mode styles */
}

.toggle-btn {
  /* Button styling */
}
```

## Learning Objectives

- State-based conditional rendering
- Dynamic CSS class assignment
- Event handling for user interactions
- Building theme systems in React
- CSS organization for multiple themes

## Best Practices Demonstrated

- Single source of truth for theme state
- Clear separation of theme styles
- Responsive and accessible design patterns
- Efficient re-rendering with minimal state changes
