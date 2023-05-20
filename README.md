# Open-ai-chrome-extension

This Chrome extension allows users to select text on any webpage and generate concise summaries from the selected text using the OpenAI API.

## Local Development

Follow the instructions below to set up and run the application for local development:

### Prerequisites

- Docker: The application uses Docker to build and run the services. Please ensure Docker is installed on your system.
- Chrome Browser: As this is a Chrome extension, you'll need the Chrome browser installed.

### Steps to Run the Application

1. Run the following command in your terminal to build and start the application:

    ```
    docker-compose up --build
    ```

    This command starts all services specified in your `docker-compose.yml` file. It includes the MongoDB service, the API service, and the frontend service. The `--build` flag ensures that Docker builds the images before starting the containers.

2. To load the Chrome extension, follow these steps:

    - Open your Chrome browser and navigate to `chrome://extensions/`
    - Enable Developer Mode by clicking the toggle switch next to 'Developer mode'.
    - Click on the `Load unpacked` button.
    - Navigate to the `open-ai-chrome-extension/build` directory in your local clone of this repository and select it.
    - You should now see the OpenAI Chrome Extension added to your list of extensions. You can launch it by clicking on the extension icon.

### Automatic Rebuilding

Both the frontend and backend are configured to rebuild automatically when changes are made to the source code. Please note that frontend changes may take a few seconds to reflect in the Chrome extension due to the build process.