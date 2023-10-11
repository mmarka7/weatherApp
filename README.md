# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

The node version used for this project is 18.18.1.

# Approach

- As per the requirement, since no 3rd party libraries are permitted, the dropdown and it's features were made using basic HTML elements and javascript functions.
- Routing was added so that if there are any wildcard routes, they will also be handled.
- Services, interfaces were created to modularize the code.
- The assets folder was used appropriately to store images, fonts and static json files.

# How to run the project

- Run `npm install` to install all the angular core packages in the node_modules folder.

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# How things work internally

- The `WeatherComponent` was created to display the mockup provided.
- The `WeatherComponent` is rendered into the `AppComponent` by using the Angular Router.
- The APIs are called from the `WeatherService` and rendered in the `WeatherComponent`.
- The interfaces folder contains all the interfaces created for the API response.
- The assets folder contains the fonts provided, the images that are being used and the cities-fr.json file.
- The `weathericons.css` file was used to show the icons by importing them into the styles.css.

# Why you choose this particular approach to solve this problem

- This approach seemed to make the code easy to understand. It also achieves modularity, mantainability and is less coupled.
- AOT compiler was used in the production build, this also decreases the bundle size greatly as the compiler takes up most of the bundle. This also reduces the application load time, since a pre-compiled version is present so when the application loads we don't need to wait for the code to be compiled.
- The benefit from not using any 3rd party libraries is that the bundle size is lesser, which will lead to faster application load time and an overall higher performance.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `docs/` directory.

The application is hosted at https://mmarka7.github.io/weatherApp/ through GItHub using the `docs/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

The code coverage can also be seen from `coverage/index.html` after running `ng test`.
