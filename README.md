# DudeDid - Task Management App

A simple and intuitive task management application built with React and Tailwind CSS. This app helps you organize and track your tasks across different status categories.

## Features

-   **Create, edit, and delete tasks:** Easily manage your tasks with full CRUD functionality.
-   **Task Status Tracking:** Track tasks in "Pending", "Started", and "Completed" categories.
-   **Responsive Design:** Separate views for mobile and desktop using Tailwind CSS's responsive utilities.
-   **React Context API:** Utilizes React Context API for efficient state management.
-   **Clear All Tasks:** Option to clear all tasks within a specific status category.

## Technologies Used

-   React 19
-   Vite
-   Tailwind CSS
-   React Context API

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mmmim24/dudedid.git
    cd dudedid
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Development

1.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the app in development mode with hot-reloading at `http://localhost:5173`.

### Building for Production

1.  Build the application for production:

    ```bash
    npm run build
    ```

    This will create an optimized build in the `dist` directory.

## Project Structure
```
dudedid/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── CreateTaskModal.jsx  # Modal for creating tasks
│   │   ├── EditTaskModal.jsx    # Modal for editing tasks
│   │   ├── Header.jsx           # Header component
│   │   ├── Home.jsx             # Main Home component
│   │   ├── MobileView.jsx       # Mobile-specific view
│   │   ├── SingleTask.jsx       # Individual task component
│   │   ├── WebViw.jsx           # Desktop-specific view
│   ├── store/           # Context and state management
│   │   └── taskStore.jsx    # TaskStore context
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point of the application
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js     # Vite configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation
```

## State Management

The application uses React Context API for state management. The `taskStore.jsx` file contains the `TaskProvider` component, which provides the global state for tasks.

## Responsive Design

The application uses Tailwind CSS to create a responsive design. The `MobileView.jsx` and `WebViw.jsx` components are used to display different views based on the screen size.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[MIT](LICENSE)

