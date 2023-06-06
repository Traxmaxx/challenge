# Tailwarden Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Clone the repo `git clone git@github.com:Traxmaxx/challenge.git` and CD into the directory.

I set `.node-version` to `18.12.1`. Feel free to change in case you're using a different version and your node version manager screams

If everything is fine, run `npm install` to install all the dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

I ignored the `eject` and `build` commands for now.

# Thoughts and considerations

I used TypeScript to have strict typing. I used `type` instead of `interface` to have proper name collision.

### Structure
    - public: contains images and some default assets
    - src:
        - components: Contains reusable components (storybook would be a good addition to this folder)
        - helpers: contains a small api helper and data formatting helpers for charting
        - routes: contains all main site templates
        - styles: contains all css files, structure reflects components (styled components are a great way to avoid this duplication and move the CSS closer to TS)
        - types: contains TS types for the API responses
        - index.ts: The app entry point
    - .prettierrc: I use prettier to help me having consistent formatting

### Technologies and Libs
I use simple CSS with `className`. A better alternative would be Tailwind or similar when having more time. Charts are rendered with `chart.js` primarily because I noticed it's being used by komiser and I was curious. It's using a plugin for auto themes.

Instead of using an error boundary I should check the API specs and implement proper error handline that way. If an OpenAPI schema is created, I could [autogenerate](https://swagger.io/tools/swagger-codegen/) some of the API client and TS types.

I added tests for the helpers and one React component. However there seems to be some [changes in React 18](https://github.com/testing-library/react-testing-library/issues/1216) and I didn't have the time to dig deeper. So the component test complains about an error but passes? It's interesting, will figure out later what's going on.

I ran into [this](https://github.com/reactchartjs/react-chartjs-2/issues/90) issue with the charting library. As a workaround I pass down the selected account for the `key` property so the charts update properly.


Links and libraries:

[react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) for charting.
[lodash](https://lodash.com/) for potentially helpful functions
[react-error-boundary](https://github.com/bvaughn/react-error-boundary), since we do not do any heavy lifting yet,  we want to allow a user to restart the app on error.