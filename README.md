#GoodDayBiker

##Summary and Walkthrough

This app helps cyclists determine whether it is a good day for a ride based on the weather forecast for the current day.

The app first attempts to display the weather conditions for the user's current location via the Geolocation API. In a real mobile device, this would likely be done via the built-in GPS unit, assisted by cell signals and wireless internet connections. Successful retreival of the user's latitude and longitude triggers a call to an external API for weather data. For security purposes, the API call is made to the server (in this case, a proxy server).

If the geolocation attempt fails the user is redirected to a search bar. There, the user enters the city and state in which he/she would like to go for a ride. On submission, a call is made to the external weather API for relevant weather data.

The results are displayed for the current day along with both a printed message and a graphical representation of whether or not it is a good day for a ride.

Search results are stored via the localStorage API and the app iteslf is cached via the service worker built in to create-react-app.


##Installation

1. Clone this repository
2. In the app's directory, run `npm install` in the terminal emulator of your choice to install necessary dependencies
3. Run `node server.js` to start the proxy server
4. In another terminal window, run `npm start`

###Testing Offline Functionality

1. In the terminal, run `npm run build`
2. Next, run `npx serve` to install an easy-to-use proxy http server.
3. Run `npx serve -s build`
4. Navigate to `localhost:5000` instead of `3000`
