# Restaurant Application

The idea behind this project is to cover some of the most important functionalities used in Firebase & Vue creating a real Serverless and PWA application.

![](doc/demo.gif)

## Application Content

* [Devices Suport](#devices-support)
* [Firebase Approaches](#firebase-approaches)
* [Firebase Settings](#firebase-setting)
* [Vue 3 Approaches](#vue-3-approaches)
* [How to Run](#how-tu-run)
* [Using Mock](#using-mock)
* [Using API's](#using-api's)
* [Application Modules](#application-modules)
* [Structure & Flow](#structure-&-flow)
* [Progressive Web Application (PWA)](#progressive-web-application-(pwa))
* [Firebase Deployment](#firebase-deployment)


## Devices Support
As this is a demo in order to show features of a specific framework, the application is not fully ready to support multiple screens sizes, browsers and devices. However, you can check this repositoty which contains the same application developed for this responsive purpose.

Check out the list of screens that can be used to play around with this demo.
#### Mobile Support Only

* Iphone 6/7/8
* Iphone 6/7/8 Plus
* Iphone X
* Pixe 2
* Pixe 2 XL
* Galax S5
* Moto G4

#### Browsers

* Chrome
* Safari

## Firebase Approaches

There are some of the most common Firebase concepts that were approached in this application.\

* Firestore Database

  All Firestore queries are inside services folder.

  * Add new data generating uid automatically
  * Update data using set and update
  * Retrieve data using get and where condition
  * Async foreach to organize the data based on doc and id

* Firebase Cloud Message (FCM)

  The entire cloud messaging logic is inside PwaControler (components/shared/pwa), and also inside firebase-service-sw (public folder).

  * Firebase dedicated service worker to listen to background message
  * Application message listen to notify directly form the app
  * Custom Request Permission to save user registration token

* Firebase Hosting

  There is a section dedicated to it at the end of the dopcumentation.

  * Firebase CLI to authenticate
  * Setting firebase file to pre config project target

* Firebase Authentication

  All auth functions are inside the UserService (services folder), and there is a listner inside main.ts to authenticate a user using token.

  * Powerful authentication lib
  * Create new user using email and password provider
  * Sign in and Logout functionalities
  * Listen to user auto authentication (jwt user token)

* Firebase Cloud Functions

  There is a functions folder with all methods used. However, inside CheckoutService (services folder) there is a commented method with an example of how to call a cloud function from the serverless project.

  * onRequest function used to trigger some API using url (initialize database with products)
  * onCall function used to be called by code (Process checkout)


## Firebase Settings

In order to get this serverless aplication running along with cloud functions, you need to create your own Firebase cloud project and replace all settings already in place.

There is no complications, you just need to follow the Firebase documentation steps.

[Firebase Getting Started](https://firebase.google.com/)


Don't forget to enable authentication, functions and also firestore database.\
You also need to replace the settings files located inside <strong>firebase-connection.ts and firebase-messaging-sw.js</strong>.\
To handle cloud functions you have to create a service connection and add it into <strong>admin.credential.cert</strong> that is defined inside functions folder (index.ts).

PS: If you don't care about cloud functions, you can you this Firebase project locally.\
The same checkout function that I added in the cloud function I also kept in the Checkout service.


#### Cloud Functions

In order to get the cloud function working, after you create your own Firebase project, you need to create a service account and add into the <strong>admin.credential.cert</strong>.

admin.initializeApp({
  credential: admin.credential.cert({}),
  databaseURL: "https://restaurant-app-f8a06.firebaseio.com"
});

## Vue 3 Approaches

If you are instered in Vue, I recommend you to check the project dedicated to vue only.

[Vue Project Version](https://github.com/gid-master/restaurant-vue-app)


There are some of the Vue 3 concepts that were approached in this application.\
I used standard eslint and prettier settings, but feel free to switch to the one you like the most.\
Some developers can feel annoyed working with a line limit of 80 which is defined as default.

* Vue Config
  * Global styles settings (access variables globally)
  * Environment Variables (overriding proccess env)
  * PWA to include custom service worker and manifest
  * Fully typescript

* Vuex
  * Single source of truth
  * Break logic down in modules and example using root state
  * useStore hook
  * Logic to transform data inside getters 


* Router
  * Authentication Guards (protect authorized pages)
  * ScrollBehavior (scroll page back to the top for same route)
  * Lazy loading components
  * Catch not found routes
  * Using extra router data to hide or show specific page content

* Components
  * View components as page route only
  * Container x Presentational components (all logic in one place only)
  * Encapsulated styles using global variables to keep consistent
  * Each module in its folder using container component as start point to deal with the entire logic
  * Props and Event Emmiter in order to communicate parent with child components
  * Shared components used across the entire application
  * Different watchers using one or multiple parameter and also immediate settings
  * Slots to add dynamic content in the component

* Lifecycle Hook
  * Mounted to execute function just when the component is ready to manipulate DOM elements
  * Unmonted to kill events
  * Watcher to execute functions based on props changes

* Directives
  * Fallback images (load fallback image if path is not found)

* Utils Format (used as previous deprecated filters)
  * Format dynamic image path
  * Format currency

* Utils Storage
  * Save cart into local storage (can be recovered from offline mode)

* Reactive form
  * Encapsulate entire logic inside the form (returns only after having a valid data)
  * Vuelidate to validate forms (standard, custom and mixed validations)
  * Native validations and also custom validations to specific field
  * Force submit form though parent component (when the submit button is in a different component)
  * Two ways data bind using v-model (example in login components)

* PWA
  * Manifest with main settings for theme, images, orientation and name
  * Install home screen shortcut (delegating logic to the application)
  * Service Workers to work with offline data (caching products API to be able to work offline)
  * Cache assets (server images and local assets)
  * Request a new version update (update only if user agree with it)
  * Great lib to generate manifest file and images automatically based on logo svg
  * Custom events to have the communication between service workers and application
  * Connection, online and offline notifications.
  * Push notification permission (Firebase Messaging Cloud)

* Concepts
  * Composition API 
  * Reactivity using reactive and ref variables
  * Computed to transform data and listen to store
  * Props and emitters to have components communication
  * DOM used as ref (call child component functions directly from parent)
  * Get rid of filters, now functions have the same performance as old filters

* Styles
  * Scss structure
  * Encapsulated styles
  * Global typography
  * Global colors (palette of colors used in the applciaiton)
  * Consistent paddings and margins across all components
  * Bind classes using conditions


## How to Run
This is the frontend application only, however, you can run it using either mocked data (already in place) or API server.

In order to have it runing along with a backend API, you need to follow the steps for further settings.

<br/>

Install all necessary packages.
```
npm install
```
<br/>

Initialize the application
```
npm start
```

## Application Modules
The application was split up in different modules, such as:

* Login
  * Register a new user
  * Sign in using you account

* Error
  * Not found
  * Server
  * Unauthorized

* Account
  * Logout option
  * Orders Summary
  * Order details
  * Review orders

* Home
  * Welcome intro
  * Suggestions
  * Special Dishes
  * Promotions
  * Shortcut buttons
  * PWA intercept install button logic

* Menu
  * List all products
  * Search for product name
  * Filter product by category
  * Sort dishes for review, price, calories, name or price.

* Product
  * Product Details
  * Ingredients
  * Reviews summary
  * Additional items
  * Comments
  * Related products
  * Add to cart

* Checkout
  * Double check product added to cart
  * Edit or remove item form cart
  * Add payment method
  * Payment summary
  * Process payment
  * Add cart in local storage (can be recovered)

* Shared 
  * Buttons icons, standard and increment
  * Layouts for wrappers, container and blocks
  * Modals using backdrop, bottom sheet and snack bar
  * Grids with scrollable row or vertical view
  * Cards that represent a macro view of the product
  * PWA control install app, update app and online / offline notification


## Structure & Flow
Short description about how the project folder structure works and how the data and components are connected.


#### Routers
Routers point just to view files (inside view folder).\
This is the place where we keep all load lazing logic and also the guards to prevent any unauthorized access.


#### Views
Views are just simple components that represent the application pages and its modules.\
Shouldn't have any logic inside this components.


#### Components
Each view imports its container components which handles the entire logic of the specific module.\
The components folder has all modules subfolders, and inside each module subfolder a structure followed by container and presentational components.\
The communication between container and presentational components should be done through props, events and store actions only.


#### Container Components
This component is responsible for dealing with the entire module logic.\
Here is the place where we dispatch events and get data from store, then we pass all information to the presentational components display on the screen.


#### Presentational Components
This component is responsible for showing data only, mostly to keep its logic encapsulated.\
Some presentational components has its own logic, such as, form validation or accordion, however, always using data loaded from container component.



#### Shared Components
This folder has all generic components used across the entire projects, such as, grid, card, wrapper and block layout. So, if you change any details in these components will affect the entire project.


#### Data Flow
The entire logic goes through the store to manage the application state.\
We simply use the dispatchers to request when some specific data should be processed.

Then inside the container components we use getters to listen to all states, and from there automatically load everything.

We dispatch 2 requests when the application is initialized, after that all dispatches are done inside the containers, and that's how the communication starts.



## Progressive Web Application (PWA) 

This application fully supports PWA and we deal with all major functionalities.

The user is able to install the application and receive notification when the application is running offline.\
After the first access, the application works entirely offline, so the user can browser through the menu, visualize every single product details and also add ptoducts them to the cart. However, the checkout process can be done only after the connection is recovered.

In order to get the PWA working properly for this project, we need to customize only a few files.\

* Vue Config
* Manifest
* Service Workers
* PWA Controller
* Push notification using VAPID Key


#### Vue Config
If you don't define workbox option, vue will automatically create the service-wroker file.\
However, we need to create our own customization in order to cache a few extra data, after that PWA will listen to our customized service worker file.


#### Manifest

Manifest file is located inside public folder.\
This file is responsible for personalizing your application, predefined settings like theme, icons, name and orientation.

#### Service Workers

There are 3 different service wokers, and both of them are located inside the src folder.

* registerServiceWorker.ts\
This file pretty much register the custom service worker mentioned below and makes available a few hooks to interact with your applicaiton.\
In this project we are using the update and offline hooks to dispatch customized events to our application in order to have some interaction with the user.

* service-worker.js\
This file uses pretty much the workbox and handle all logic to cache some application content.\
In addition to caching the applicaiton we also cache server images and the main product request.\
Then with the product request cached, we are able to have the entire application working offline normally.

* firebase-messaging-sw.js\
This file was created in the public folder level.\
This file contains all firebase messaging cloud settings, so was added the firebase connection and also the onBackgroundMessage method to listen to notifications.

#### PWA Controler

The logic to deal with PWA is totally centralized in an unique component located inside components/shared/pwa folder.

This component is responsible for listening to all events and show interactive messages to the user.\
There is no PWA logic outside of this component.

In this component we deal with online / offline messages, a modal to show that there is a new version available and also the install application modal.

#### Push Notification

There is a simple request permission event set up in the PwaController, there we send to the database the userId and also the registrated token.\
We just need 2 methods to listen to the notifications

* onMessage - added in the PwaController file and it is used to notify users while they are using the application.
* onBackgroundMessage - adde in the firebase-messaging-sw and it is used to notify users when they are not using the application.


#### Push Notification Tests

You can send standard push notifications using the registered token saved into the notifications collection.\ 
Send message using this structure:

```
{ 
  "notification": {
    "title":"Restaurant",
    "icon":"img/icons/favicon-32x32.png",
    "vibrate":[100, 50, 100],
    "body":"testing!!!"
  }
}
```

#### Support

Keep in mind that PWA works only when you build the project and host it somewhere.\
If you serve it direclly from the project you won't be able to test the functionalities.

I strongly recommend you to run the script defined in the package.json and access it using the defined port. However, you need to install the http-server package globaly.

```
npm install http-server -g
npm run pwa
```

Or you can build the project and use the web server for chorme to host the application easilly.

After that you will be able to double check everthing using the devtools / application (manifest, service worker and cache)

#### Generate Assets

The project already contains all the images and the manifest file already in place, however, you can see how it was easily generated.

All the images can be found inside the folder public/img/icons\
These images are defined inside the manifest.json file located in the same folder level, so this file is responsible for personalizing your application, predefined settings like theme, icons, name and orientation.


<br/>

Firtly, you need to install an auxiliar package globaly.
```
npm install -g vue-pwa-asset-generator
```

<br/>

Secondly, add your SVG logo inside the root folder of the project. 

After that run the command below and double check the all files will end up inside the public folder of your project.
```
vue-asset-generate -a logo.svg
```

<br />

We have added a short script inside the package file.
```
npm run pwa-generate
```


## Firebase Deployment

Firebase hosting is the easiest way to server a https application for zero cost.\
You can easily sign up Firebase using your Google account and follow the documentation to create your first project.

firebase doc: https://firebase.google.com/docs/hosting

Once you have created your project, just replace the project name inside the <b>.firebaserc</b> file located in the root folder.

After that you can simply use CLI commands to deploy your project.

<br />

Firstly, install the firebase tools globaly.
```
npm install -g firebase-tools
```

<br />

Secondly, authenticate the CLI using your user and password.
```
firebase login
```

<br />

Finally, use the script already in place to deploy your project.
```
npm run deploy
```