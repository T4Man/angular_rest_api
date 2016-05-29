#Add Communication Service to Angular Two Resource REST API
##Assignment for Code Fellows 401

##To start this application

1. Open a terminal window and type 'mongod' to start MongoDB
2. Open a second terminal window, navigate to the client folder and type 'gulp'.
3. When gulp has completed type 'node server.js' to start the client-side server.
3. Open a third terminal window, navigate to the server folder and type
   'node server.js' to start the back-end server.

##To use this application

4. Open a browser window and enter 'localhost:5000' in the address bar.
5. Enter the name and genre of your favorite band and click 'Create Band'
6. Use the 'edit' or 'delete' buttons below the list item to modify your entry.
7. Repeat the process in the 'Song' section to add your songs.
8. Each entry (band or song) will add to the counter. Removing a band or song will
subtract from the counter. The counter will reset to zero on a new visit (page refresh). 

This is a C(reate) R(ead) U(pdate) D(estroy) interface for a two resource JSON api using Angular with a MongoDB back-end. Express is used for the client-side and
back-end servers.
Adding a new band or new song will make a POST request and add a document in MongoDB. Edit will make a PUT request to modify the document. "Remove this band" and "Remove this song" will make a DELETE request and the document will be removed from MongoDB.
If you change your mind during an edit and click the 'Cancel' button before clicking
the 'update' button the document and the list item will not be changed.

##For testing only without manually starting servers or browser.

###For all tests

1. Navigate to the client folder and type 'gulp'.
2. When gulp has completed press 'Control C' to exit the Selenium server.

###For linter test only

1. Navigate to the client folder and type 'gulp lint'.

###For Karma unit testing on the client only

1. Navigate to the client folder and type 'gulp build'.
2. When gulp has completed enter 'karma start'.

###For Protractor end-to-end testing

1. Navigate to the client folder and type 'gulp protractor:test'.
2. When gulp has completed press 'Control C' to exit the Selenium server.

###For Server testing only (linter and unit test)

1. Open a terminal window and type 'mongod' to start MongoDB.
2. Open a second terminal window, navigate to the server folder.
3. Enter 'gulp'.
4. When gulp has completed press 'Control C' to exit the Selenium server.
