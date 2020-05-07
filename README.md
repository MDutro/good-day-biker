# GoodDayBiker

## Summary and Walkthrough

This app helps cyclists determine whether it is a good day for a ride based on the weather forecast for the current day.

The app first attempts to display the weather conditions for the user's current location via the Geolocation API. In a real mobile device, this would likely be done via the built-in GPS unit, assisted by cell signals and wireless internet connections. Successful retreival of the user's latitude and longitude triggers a call to an external API for weather data. For security purposes, the API call is made to the server (in this case, a proxy server).

<img src="/public/mainScreen.png" width="200">       <img src="/public/searchScreen.png" width="203">

If the geolocation attempt fails the user is redirected to a search bar. There, the user enters the city and state in which he/she would like to go for a ride. On submission, a call is made to the external weather API for relevant weather data.

The results are displayed for the current day along with both a printed message and a graphical representation of whether or not it is a good day for a ride. Below the results for the current day, the app displays predictions for the following seven days.

Search results are stored via the localStorage API and the app iteslf is cached via the service worker built in to create-react-app.

### What makes a good day?

The user can set his/her preferences to give the app custom criteria to determine whether it's a good day for a ride today and for the next seven days. The minimum acceptable temperature, the max wind speed, and the maximum chance of rain can all be adjusted with sliders, giving the user granular control of the settings. Of course, the app can be set to it's default state with the touch of a button. By default, the app looks for days that are warmer than 65F, a chance of rain of less than 25%, and wind speed under 10 mph. User preferences are stored in local storage to give the app persistance and to allow offline functionality.

<img src="/public/settings.png" width="200">

### Rating your day

The user can provide feedback to the app by indicating just how good a day was for a bike ride on a scal of 1 to 5, with 5 being an almost perfect day and 1 very poor. The first time the user rates a day with a particular number (4, for example), the current data is averaged against the default settings. On the next day, if the user picks 4 again, the current weather data for that day will be averaged with the previous average calculation. The effect of this is method is that the various rating categories will gradually come into line with the user's preferences. It also means that individual day ratings will have less impact on the aggregate as time goes on.

<img src="/public/rate.png" width="200">

Finally, the user can set his/her app preferences to use criteria based on his/her day ratings with the push of a button. The app takes the average of the user's days that are rated 4 and 5 and sets the app's preferences settings to the resulting values.


### Future Development

This app is fully functional but there is more that could be done to improve the user experience and increase reliability:

1. Create the ability for the user to share his/her results with other users or even non-users via SMS or email message.

2. Add the ability to get weather data for the user's current location after searching for data from other locations without refreshing/restarting the app.

3. Better user input logic - the external Weatherbit API is very particular about search parameters. The app currently indicates to the user when the returned search results do not match the location he/she intended. This requires the user to run an additional search. A better user experience could be acheived with more robust input handling.

4. More tests! Currently, automated testing is implemented only for the user preferences panel. Correct function of the app hinges on settings being properly stored and retrieved so that ride recommendations are based on the right criteria for the user. There are, however, other areas of functionality that would benefit from automated testing, such as the rating panel and manual search screen.


## Installation

1. Clone this repository
2. In the app's directory, run `npm install` in the terminal emulator of your choice to install necessary dependencies
3. Sign up for a free API key at [Weatherbit.io](https://www.weatherbit.io/)
4. Create a file in the app's root directory called `.env` with `KEY=YOUR_KEY_HERE` as the contents of the file.
5. Run `node server.js` to start the proxy server
6. In another terminal window, run `npm start`

**Please note - Due to recent changes in Google's geolocation API, geolocation services in Firefox often do not work as expected. Future updates to Firefox will almost certainly correct this issue but, in the meantime, this app is best viewed in Chrome. The app is designed for mobile devices and is best viewed in Device Mode (Ctrl+Shift+I, Ctrl+Shift+M) where many mobile devices can be simulated.**

### Testing Offline Functionality

1. Make sure that index.js, line 17 reads `serviceWorker.register();`
2. In the terminal, run `npm run build`
3. Next, run `npx serve` to install an easy-to-use proxy http server.
4. Run `npx serve -s build`
5. Navigate to `localhost:5000` instead of `3000`
