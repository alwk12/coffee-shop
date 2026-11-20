# Coffee R Us

A React single page app for a coffee store with a shop page and an admin portal.

## Features

- Home page with store info
- Shop page with search and origin filter
- Admin portal to add, edit the price of, and delete coffee
- Data is saved in a fake backend (json-server)

## Setup

1. Clone the repo and open the folder
2. Run `npm install`
3. Start the fake backend in one terminal: `npm run server`
4. Start the app in another terminal: `npm run dev`
5. Open the link Vite shows (usually http://localhost:5173)

## Run the tests

```
npm test
```

## Known limitations

- There is no login for the admin portal
- Only the price can be edited, not the other fields
- The backend must be running for the app to load data
