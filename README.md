# This is a front end task for insonmia labs

To make this application work you need to add alchemy api key `ALCHEMY_API_KEY=YOUR_APIKEY` to .env file.

### Technical Details

For frontend framework I used tailwind with shadcdn ui components. For viewing btc price in different currencies I used react-table also for data fetching I used react-query. Everything is type safe. Also to not expose API_KEY I created a next route so that I use the key from server and not show it on frontend. For global data management I simply use built in context api

### Features

For the home page:

- Page contains price details of USD, GBP and EUR currencies, refreshed at a default interval of 5 seconds.
- Page includes feature to allow user choose between different data refresh intervals
- Page supports feature to allow user toggle on/off some of the currencies displayed.
- Page remembers user preferences for the features on-page by using local storage.
