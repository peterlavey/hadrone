define(['./module'], (app)=>{
   'use strict';
   app.constant('COMMANDS', {
      "NODE":"node",
      "NAVIGATE": "explorer",
      "HEROKU": "heroku",
      "LOGIN": "login"
   });
   app.constant('HEROKU', {
      "TOOLBELT":"https://signup.heroku.com/dc",
      "REGISTER": "https://toolbelt.heroku.com/"
   });
});
