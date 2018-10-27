'use strict';
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


exports.onEventCreate = functions.database.ref('/eventlist/{eventid}').onCreate(
    async (snapshot) => {
      // Notification details.
      const eventName = snapshot.val().eventName;
      const date = snapshot.val().date;
      const time=snapshot.val().time;
      const venue=snapshot.val().venue;
      const payload = {
        notification: {
            title: 'New Event',
            body: `${eventName} on ${date} at ${time} in ${venue}`,
          
        //   click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
        }
      };
       // Get the list of device tokens.
     const allTokens = await admin.database().ref('/volunteers/{uid}/fcmtoken').once('value');
     if (allTokens.exists()) {
       // Listing all device tokens to send a notification to.
       const tokens = Object.keys(allTokens.val());

       // Send notifications to all tokens.
       const response = await admin.messaging().sendToDevice(tokens, payload);
       await cleanupTokens(response, tokens);
       console.log('Notifications have been sent and tokens cleaned up.');
     }
   });
///////////////////////////////////////

exports.onEventUpdate = functions.database.ref('/eventlist/{eventid}').onUpdate(
  async (change, context) => {
    // Notification details.
    const eventName = change.after.val().eventName;
    const updateddate = change.after.val().date;
    const updatedtime=change.after.val().time;
    const updatedvenue=change.after.val().venue;

    const date = change.before.val().date;
    const time=change.before.val().time;
    const venue=change.before.val().venue;




    const payload = {
      notification: {
          title: `Event Changed: ${eventName} `,
          body: ` from ${date} at${time} in ${venue} to ${updateddate} at${updatedtime} in ${updatedvenue} `,
        
      //   click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
      }
    };
     // Get the list of device tokens.
   const allTokens = await admin.database().ref('/volunteers/{uid}/fcmtoken').once('value');
   if (allTokens.exists()) {
     // Listing all device tokens to send a notification to.
     const tokens = Object.keys(allTokens.val());

     // Send notifications to all tokens.
     const response = await admin.messaging().sendToDevice(tokens, payload);
     await cleanupTokens(response, tokens);
     console.log('Notifications have been sent and tokens cleaned up.');
   }
 });


    

// Cleans up the tokens that are no longer valid.
function cleanupTokens(response, tokens) {
 // For each notification we check if there was an error.
 const tokensToRemove = {};
 response.results.forEach((result, index) => {
   const error = result.error;
   if (error) {
     // Cleanup the tokens who are not registered anymore.
     if (error.code === 'messaging/invalid-registration-token' ||
         error.code === 'messaging/registration-token-not-registered') {
       tokensToRemove[`/fcmTokens/${tokens[index]}`] = null;
     } else {
       console.error('Failure sending notification to', tokens[index], error);
     }
   }
 });
 return admin.database().ref().update(tokensToRemove);
    
}
