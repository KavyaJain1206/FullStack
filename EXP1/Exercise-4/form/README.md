# Exercise-4: Simple Form SPA

## Overview

A form handling application built with React and Vite that demonstrates form submission, input management, and state handling. This project shows how to capture user input and display submitted data.

## Features

- **Form Input Fields**: Name and Email input fields with real-time state management
- **Form Submission**: Handle form submission without page reload using `preventDefault()`
- **Data Display**: Show submitted form data after submission
- **Input Validation**: Controlled components with state management
- **User-Friendly UI**: Clean and intuitive form interface

## Technologies Used

- React 18
- Vite - Fast build tool and dev server
- JavaScript
- CSS

## Project Structure

```
form/
├── src/
│   ├── App.jsx          # Main form component
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
   cd Exercise-4/form
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

- **State Variables**:
  - `name`: Stores the name input value
  - `email`: Stores the email input value
  - `submittedData`: Stores the submitted form data
- **Controlled Components**: Input fields are controlled by React state
- **Form Submission**:
  - `handleSubmit` function prevents default form submission behavior
  - Stores the form data in `submittedData` state
- **Display Submitted Data**: Shows the name and email after form submission

## Form Structure

```jsx
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Enter Name" />
  <input type="email" placeholder="Enter Email" />
  <button type="submit">Submit</button>
</form>
```

## Learning Objectives

- Controlled components in React
- Handling form submissions
- Preventing default form behavior
- Managing multiple input states
- Displaying dynamic data based on user input
- Event handling in forms

## Best Practices Demonstrated

- Controlled form inputs
- Proper event handling with `preventDefault()`
- Separation of input state and submitted data
- Clean component structure
- User feedback through data display

## Potential Enhancements

- Add form validation
- Email format validation
- Error message display
- Form reset functionality
- Store data in localStorage for persistence
