// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC4QpBjil_nsTwWlAVXHMCZr7HbdRp44UU",
    authDomain: "restaurateteste.firebaseapp.com",
    databaseURL: "https://restaurateteste-default-rtdb.firebaseio.com",
    projectId: "restaurateteste",
    storageBucket: "restaurateteste.appspot.com",
    messagingSenderId: "835282575795",
    appId: "1:835282575795:web:25aa7050a852e6ed6c2bc6",
    measurementId: "G-Y3FNG8KMVS"
  }
};

export const snapshotToArray = snapshot => {
  let returnArray = [];
  snapshot.forEach(element => {
    let status = element.val();
    status.key = element.key;
    returnArray.push(status)
  });
  return returnArray;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
