# Marvel Frontend Project

## Description

This project is a frontend application built with React (using Vite and TypeScript) that interacts with a Marvel API (likely a custom backend or the official Marvel API) to display information about Marvel characters and their comics. Users can browse characters, view details, see associated comics, and manage a list of favorite characters.

## Features

*   **Character List:** Browse and search for Marvel characters.
*   **Character Details:** View detailed information about a specific character, including their description and portrait image.
*   **Comics Associated:** See a list of comics featuring the selected character.
*   **Favorites:** Logged-in users can add characters to and remove them from their personal favorites list.
*   **Responsive Design:** The interface adapts to different screen sizes for a good user experience on desktop and mobile devices.

## Tech Stack

*   **Frontend:** React, Vite, TypeScript
*   **Styling:** CSS Modules, CSS Variables
*   **Routing:** React Router DOM
*   **API Client:** Axios (or Fetch API)
*   **Icons:** Lucide React
*   **Linting/Formatting:** ESLint, Prettier (based on typical Vite setups, adjust if different)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd marvel-frontend-vite
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Add any necessary environment variables, such as the API endpoint URL:
        ```
        VITE_API_URL=http://your-backend-api-url
        ```

## Running the Project

1.  **Development Mode:**
    *   Start the development server:
        ```bash
        npm run dev
        # or
        yarn dev
        ```
    *   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

2.  **Production Build:**
    *   Create a production-ready build:
        ```bash
        npm run build
        # or
        yarn build
        ```
    *   The optimized files will be located in the `dist` folder. You can serve this folder using a static file server.
