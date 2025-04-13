# DudeDid - Task Management App

A simple and intuitive task management application built with React and Tailwind CSS. This app helps you organize and track your tasks across different status categories with drag and drop functionality.

## Features

-   **Create, edit, and delete tasks:** Easily manage your tasks with full CRUD functionality.
-   **Task Status Tracking:** Track tasks in "Pending", "Started", and "Completed" categories.
-   **Drag and Drop:** Intuitively move tasks between status columns using drag and drop.
-   **Responsive Design:** Separate views for mobile and desktop using Tailwind CSS's responsive utilities.
-   **React Context API:** Utilizes React Context API for efficient state management.
-   **Clear All Tasks:** Option to clear all tasks within a specific status category.
-   **Task Accordion:** Expand tasks to view and edit details.

## Technologies Used

-   React 19
-   Vite
-   Tailwind CSS
-   React Context API
-   @dnd-kit/core for drag and drop functionality

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
│   │   ├── Droppable.jsx        # Droppable container for drag and drop
│   │   ├── Header.jsx           # Header component
│   │   ├── Home.jsx             # Main Home component with DndContext
│   │   ├── MobileView.jsx       # Mobile-specific view
│   │   ├── SingleTask.jsx       # Individual draggable task component
│   │   ├── TaskDetails.jsx      # Expanded task details component
│   │   ├── WebViw.jsx           # Desktop-specific view with columns
│   ├── store/           # Context and state management
│   │   └── taskStore.jsx    # TaskStore context and reducers
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point of the application
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation
```

## State Management

The application uses React Context API for state management. The `taskStore.jsx` file contains the `TaskProvider` component, which provides the global state for tasks and actions like `createTask`, `deleteTask`, `updateTask`, and `deleteAll`.

## Drag and Drop

The application implements drag and drop functionality using the @dnd-kit library:

- Tasks can be dragged between status columns (Pending, Started, Completed)
- The status of the task updates automatically when dropped in a new column
- Visual feedback is provided during drag operations
- Works on both desktop and touch devices

## Responsive Design

The application uses Tailwind CSS to create a responsive design:

- **Desktop View:** Shows all three status columns side by side with drag and drop
- **Mobile View:** Shows one status column at a time with navigation tabs

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[MIT](LICENSE)

