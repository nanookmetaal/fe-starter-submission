# Frontend Engineer Exercise

## Local Scripts

`npm ci` - install dependencies as per lock file

`npm run start` - start local server
`npm run build` - generate server build files
`npm run test` - execute unit tests

## Submission Notes

- Assumption made that the webapp will be run on a desktop browser
- I was unsuccessful writing a functional unit tests due to issues with mapbox mocking

## Exercise Instructions

### Scenario

You are tasked with creating a simple mapping web app that enables users to upload [geojson](https://geojson.org/)
files and view them on a map. A project skeleton has been provided for you to get started.

### Functional Requirements

1. Users can upload geojson shapes to view on the map
2. When a shape finishes uploading it should be automatically selected
3. When a shape is selected the map should highlight the shape and zoom to its bounds
4. Previously uploaded shapes should be selectable from a collapsible drawer
5. Uploaded shapes should persist between refreshes

### Non-functional Requirements

* The frontend of the app is to be written in TypeScript using React 
* MapBox GL JS is to be used for mapping
* Data is to be stored in the browser's local storage

### Notes

* A sample geojson file has been provided in the `data` directory
* You are free to use any additional libraries you wish, however take care to include them in `package.json` to ensure
  your solution can be easily run by others

