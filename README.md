# DudeDid - Task Management App

A simple and intuitive task management application built with React and Tailwind CSS. This app helps you organize and track your tasks across different status categories with drag and drop functionality.

## Features

-   **Create, edit, and delete tasks:** Easily manage your tasks with full CRUD functionality.
-   **Task Status Tracking:** Track tasks in "Pending", "Started", and "Completed" categories.
-   **Drag and Drop:** Intuitively move tasks between status columns using drag and drop.
-   **Responsive Design:** Separate views for mobile and desktop using Tailwind CSS's responsive utilities.
-   **Google Authentication:** Sign in with your Google account to save and sync your tasks.
-   **Demo Mode:** Try the app without signing in using demo tasks.
-   **Supabase Integration:** Cloud storage for your tasks when signed in.
-   **Real-time Updates:** Changes are reflected instantly across the interface.
-   **Clear All Tasks:** Option to clear all tasks within a specific status category.
-   **Task Accordion:** Expand tasks to view and edit details.

## Technologies Used

-   React 19
-   Vite 6
-   Tailwind CSS 4
-   @dnd-kit/core for drag and drop functionality
-   Supabase for authentication and database
-   React Context API for state management
-   React Hot Toast for notifications
-   Docker for containerization

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Supabase account (for authentication and database)

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

3.  Create a .env file with Supabase credentials:

    ```
    VITE_SUPABASE_URL=your-supabase-project-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

### Development

1.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the app in development mode with hot-reloading at `http://localhost:5173`.

2.  For network access (testing on other devices):

    ```bash
    npm run host
    ```

### Building for Production

1.  Build the application for production:

    ```bash
    npm run build
    ```

    This will create an optimized build in the `dist` directory.

### Docker Deployment

1.  Build the Docker image:

    ```bash
    docker build -t dudedid .
    ```

2.  Run the Docker container:

    ```bash
    docker run -p 5173:80 dudedid
    ```

    The application will be available at `http://localhost:5173`.

## Project Structure
```
dudedid/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── CreateTaskModal.jsx  # Modal for creating tasks
│   │   ├── Droppable.jsx        # Droppable container for drag and drop
│   │   ├── Footer.jsx           # Footer component with date time
│   │   ├── Header.jsx           # Header component with login button
│   │   ├── Home.jsx             # Main Home component with DndContext
│   │   ├── MobileView.jsx       # Mobile-specific view
│   │   ├── SingleTask.jsx       # Individual draggable task component
│   │   ├── TaskDetails.jsx      # Expanded task details component
│   │   ├── WebViw.jsx           # Desktop-specific view with columns
│   ├── lib/              # External libraries and configuration
│   │   └── supabaseClient.js    # Supabase client configuration
│   ├── store/           # Context and state management
│   │   ├── authStore.jsx    # Authentication context
│   │   └── taskStore.jsx    # Task management context
│   ├── utils/           # Utility functions
│   │   └── format.js    # Date formatting utilities
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point of the application
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── dockerfile           # Docker configuration for production build
├── package.json         # Project dependencies and scripts
└── README.md            # Documentation
```

## Authentication

The application uses Supabase's Google OAuth for user authentication:

- Users can sign in with their Google account
- Authentication state is managed via the AuthStore context
- User profile information is displayed when signed in
- Demo mode is available for users who don't want to sign in

## State Management

The application uses React Context API for state management:

- authStore.jsx handles authentication state and user information
- taskStore.jsx provides CRUD operations for tasks with different implementations for logged-in vs demo mode
- Data is persisted to Supabase when logged in and kept in memory when in demo mode

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

MIT