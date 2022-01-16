# WeatherBox

This is an Angular project with Firebase to implement serverless.

Below in the following is a list should prepare before getting start:
1. [OpenWheather API](https://openweathermap.org/current)
2. [Google Map API](https://console.cloud.google.com/apis/dashboard?project=minion-weather&supportedpurview=project)
3. [Angualr Google Map](https://angular-maps.com/)
5. [angularfire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md)
6. [firebase console](https://console.firebase.google.com/u/0/?pli=1)
7. [Angular Material](https://material.angular.io/components/categories)

## Features
### Account
- AuthFirebase
- Profile
- FormModule
- ReactiveFormModule
- Validation

### Weather
- Integration Weather Open API and Google Map
- Search city and display google map
- Save cities by user

### Firebase
- Auth
- Firestore
- Hosting
- Deploy

### Auth-Info
- display name, email
- generate QR code of LinkedIn link

## Troubleshooting
- [LoadChildren](https://angular.tw/api/router/LoadChildrenCallback)
- [ngModule cannot work](https://www.itread01.com/content/1548916205.html)
- [Angular 12 cannot install agm](https://github.com/SebastianM/angular-google-maps/issues/1932)
You can skip peer dependency conflicts checking by running `npm install --legacy-peer-deps` or you can set npm config set legacy-peer-deps true and then run npm install once again.
- [GoogleMap downgrade to 3.39.12](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/48574)
    ```
    npm install --save @types/googlemaps@3.39.12
    ```
- [type undenfine](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
    ```
    type 'number | undefined' is not assignable to type 'number'.
    ```
- [request from https to http](https://pretagteam.com/question/angular10-request-from-https-to-http-mixed-content)
  set this into index.html(app.module.ts)
  
  ```
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  ```
