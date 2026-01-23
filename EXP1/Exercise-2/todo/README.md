# Exercise-2: To-Do List Application

## Overview

A dynamic To-Do List application built with React and Vite. This project demonstrates CRUD operations (Create, Read, Delete) with a clean and interactive user interface.

## Features

- **Add Tasks**: Create new tasks using the input field and Add button
- **Display Tasks**: View all tasks in a formatted list
- **Delete Tasks**: Remove completed or unwanted tasks
- **Input Validation**: Prevents adding empty tasks
- **Real-time Updates**: Immediate UI reflection of changes

## Technologies Used

- React 18
- Vite - Fast build tool and dev server
- JavaScript
- CSS

## Project Structure

```
todo/
├── src/
│   ├── App.jsx          # Main to-do list component
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
   cd Exercise-2/todo
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

- **State Management**: Uses two state variables - `tasks` (array of tasks) and `newTask` (current input value)
- **Adding Tasks**:
  - User enters task in input field
  - Click "Add" button to add task
  - Input field clears automatically
  - Empty task validation prevents blank entries
- **Deleting Tasks**: Click delete button next to any task to remove it
- **Array Operations**: Uses spread operator and filter for immutable state updates

## Learning Objectives

- Working with arrays in React state
- Array manipulation methods (spread operator, filter)
- List rendering with keys
- Event handling and input management
- Building interactive applications

## Best Practices Demonstrated

- Immutable state updates
- Input validation
- Clear component structure
- Separation of concerns
