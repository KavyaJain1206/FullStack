# Context API Lab (EXP4.1)

Small React + Vite project to practice Context API with user and theme state.

## Demo

![EXP4.1 Demo](./image.png)

## Run Locally

```bash
npm install
npm run dev
```

## About This Exercise

This lab focuses on understanding how React Context helps avoid prop drilling.
You can use one context for user information and another for theme preferences.
The goal is to keep state sharing simple across multiple components.

## Learning Goals

- Create and provide context values from a top-level provider.
- Consume context in deeply nested components.
- Update shared state from different parts of the UI.
- Understand when Context API is useful in real projects.
- Keep component code cleaner by reducing repetitive props.

## Prerequisites

- Node.js installed (LTS version is preferred).
- Basic knowledge of React components and hooks.
- A code editor like VS Code.

## Project Workflow

1. Start with `npm install` to install dependencies.
2. Run `npm run dev` to launch the development server.
3. Open the local URL shown in terminal.
4. Interact with UI elements linked to context values.
5. Observe how multiple components update together.

## Suggested Practice Tasks

- Add a new context value and display it in two components.
- Create a toggle button to switch themes.
- Store a simple user object and update the username.
- Split providers into separate files for cleaner structure.

## Notes

This is an educational mini-project, so the structure is intentionally simple.
Once you are comfortable with Context API, you can combine it with reducers,
custom hooks, or state libraries for larger applications.
