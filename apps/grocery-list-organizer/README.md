# Grocery List Organizer
## Description
This is the UI piece of of the Grocery List Organizer mobile app.  It is build with Angular, Ionic, and Capacitor. 


## Local Dev Setup
+ If you have never built the app, run `nx build grocery-list-organizer`.
+ If you have never generated a native project, run `nx run grocery-list-organizer:add:android` for Android and `nx run grocery-list-organizer:add:ios` for iOS.
+ To open the app in Xcode, run `npm run grocery-ionic-ios`
+ To open the app in Android Studio, run `npm run grocery-ionic-android`
+ To open the app in a web browser, run `nx serve grocery-list-organizer -o`

## Deployment
+ Android
  + Signing Key exists in `andrdoid-certs/android`.  Alias is `grocery-list-organizer`.  Password is `Password1!`.  
  + Bundle Id `com.paulmojicatech.grocerylist`
+ iOS
  + Build Id: `com.paulmojicatech.grocery-list`

## Dependencies
+ [grocery-list-organizer-business-logic-items-to-get](../../libs/grocery-list-organizer-business-logic-items-to-get/README.md)
+ [grocery-list-orgainzer-business-logic-profile](../../libs/grocery-list-organizer-business-logic-profile/README.md)
+ [grocery-list-organizer-shared-business-logic](../../libs/grocery-list-organizer-shared-business-logic/README.md)