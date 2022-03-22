# WAX

## INTRO & PURPOSE

The main purpose of the Wax app is to offer the ability to search the Discogs database to get extensive information about records, quickly and seamlessly. Users will additionally be able to keep track of records that they want and records that they own.

## PROBLEM SOLVED

This application will solve an issue for record collectors when shopping for records, when you want to quickly find out if a record has good reviews and what the record’s value is before you buy it. It will also keep track of records you’ve already purchased or own already so you don’t accidentally buy duplicates.

## FEATURES 

### Login and Sign Up page
### Home - Search and Form page
- the Home page. Minimal and includes a Navbar with a logo, Crate page button, Collection page button, Home/Search 
Page button and a Logout button. The body of the Search page has a search bar to find records based on album name or catalog number. Searching shows all matching results from the discogs database and clicking a result links to the Record List page for more info, and there you can add to crate or collection. The search page also has a form field to manually add a record to your crate or collection.
### Record List page 
- renders when an album is selected on the search page, finds matching records, and lists them with:
    - Album name 
    - Artist name
    - Catalog number
    - Album cover image
    - Release date
    - Country
    - Label
    - Genre
    - Style
            - Average rating
- Lowest selling price/value
- Add to crate or collection buttons
### Crate 
- page that displays records that a user added to Crate and is used to keep track of records that you are interested in buying and adding to your collection. The Crate displays a list of album covers that display more album info (similar to the Record List page) when they are clicked. The Crate has two buttons at the bottom of each record element: “Add to Collection” for the user to click when they’ve bought the record, or “Remove from Crate” if the user decided that they no longer want the record.
### Collection 
- page that displays records that a user added to Collection and is used to keep track of records that you own. The Collection displays a list of album covers that display more album info when they are clicked. An album will also display a “Remove From Collection” button in case the user sold, traded, or for whatever reason doesn’t own that record anymore. At the top of the Collection page you'll find the total minimum value of your record collection; a formula that finds the sum of the "value" key property values in the records array.

## DEVELOPED WITH:
- [React](https://facebook.github.io/react/)
- RESTful API and Discogs API
    <br>Requires an API key and secret from [Discogs](https://www.discogs.com/developers/)
    <br>[Sample json database](https://github.com/jmehart/wax-api)

<hr>

![App](https://player.vimeo.com/video/691108899?h=c081baab61&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479)


<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
