# NYC TREES

https://scintillating-pasca-0fd429.netlify.app/

Data from:
https://www.kaggle.com/code/yash16jr/tree-census-data-cleaning/input

![](nyc-trees.gif)

Map made with the first 10000 tree coordinates from NYC Open Data. Labeled by species and health level.

##note: Dead Trees are trees with unknown status.

# Interaction
Click on trees to view species and health, trees will appear and disappear based on current center point of view port.


# Tree Location Display App

This is a React application that displays the locations of trees on a map using Mapbox. The app fetches tree data from a backend API and visualizes it using the Mapbox GL JS library. This README file provides instructions on how to set up, run, and deploy the application using Netlify.

## Prerequisites

Before getting started, ensure that you have the following prerequisites installed on your system:

- Node.js (version 12 or later)
- npm (Node Package Manager, typically installed with Node.js)

## Installation

Follow these steps to set up the Tree Location Display App:

1. Clone the repository to your local machine:

```bash
$ git clone https://github.com/your-username/tree-location-display.git
```

2. Navigate to the project directory:

```bash
$ cd tree-location-display
```

3. Install the required dependencies:

```bash
$ npm install
```

## Configuration

The Tree Location Display App relies on a backend API to fetch tree data. In the `src/api.js` file, update the `BASE_URL` constant to match the URL of your backend API.

```javascript
// src/api.js

const BASE_URL = 'http://your-backend-api-url.com';
```

To configure Mapbox, sign up for a free account at [https://www.mapbox.com](https://www.mapbox.com) and obtain an access token. Update the `REACT_APP_MAPBOX_ACCESS_TOKEN` variable in the `.env` file with your Mapbox access token.

```dotenv
# .env

REACT_APP_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
```

## Usage

To start the Tree Location Display App locally, follow these steps:

1. Start the development server:

```bash
$ npm start
```

2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment with Netlify

Netlify is a popular platform for hosting static websites. To deploy the Tree Location Display App to Netlify, follow these steps:

1. Create an account on [https://www.netlify.com](https://www.netlify.com) if you haven't already.

2. Install the Netlify CLI globally:

```bash
$ npm install -g netlify-cli
```

3. Build the application:

```bash
$ npm run build
```

4. Deploy the application to Netlify:

```bash
$ netlify deploy
```

5. Follow the prompts in the CLI to connect your project to Netlify and specify the build directory as `build`.

6. After the deployment completes, Netlify will provide you with a URL where your application is hosted.

## Features

The Tree Location Display App offers the following features:

- Displays tree locations on a map using Mapbox.
- Provides a search functionality to find specific tree locations.
- Allows users to click on a tree marker to view additional information about the tree.

Feel free to customize and enhance the application to suit your specific requirements.

## Contributing

If you'd like to contribute to the Tree Location Display App, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Commit and push your changes to the branch.
4. Submit a pull request describing your changes.

Your contributions are highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per your needs.
