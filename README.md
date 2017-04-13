# Dungeons & Dragons Campaign Generator and Manager

## Created by

Matt Kelley, Erica Wright, Dylan Stackhouse, and Katie Reed

## Description

This website for the tabletop role-playing game Dungeons and Dragons allows a dungeon master the ability to generate a map, customize and create monsters and items, and set up character details to run a successful game. The dungeon master can save all pieces of the game they are currently playing and update it as their game goes on.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

# Website Link

To browse a live version of this project, navigate in your browser (Chrome recommended) to:

## Installation Instructions

* `git clone https://github.com/DylanCStack/DnD-Campaign-Generator-and-Manager>` https://github.com/DylanCStack/DnD-Campaign-Generator-and-Manager
* `cd DnD-Campaign-Generator-and-Manager`
* Set up your Firebase API Key by creating a file to paste your API keys called `api-keys.ts` at this directory: `src/app/api-keys.ts`
* Paste your Firebase-provided keys into that document as follows:
`export var masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  };`
* `npm install`
* `bower install`
* `npm install angularfire2 firebase --save`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Copyright

Copyright (c) 2017 Matt Kelley, Erica Wright, Dylan Stackhouse, Katie Reed All Rights Reserved.
