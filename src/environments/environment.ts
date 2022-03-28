// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export const environment = {
  production: false,
  kalturaServer: {
    uri : "www.kaltura.com",
    previewUIConf:49721233
  },
  firebase: {
    apiKey: "AIzaSyCga_L-ylUuM1ZUZw7LwevoY1xvK4uH4FU",
    authDomain: "aqa-app-72e50.firebaseapp.com",
    projectId: "aqa-app-72e50",
    storageBucket: "aqa-app-72e50.appspot.com",
    messagingSenderId: "124437385055",
    appId: "1:124437385055:web:f82c9e6f61504ce84d30ea"
  }
};
