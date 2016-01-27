# chordb

TODO: 
- allow searching by instrument, tonic, type (major, minor, etc)
- add user, song models so user can add chord variants to a song cheat-sheet

To seed database from included seeds/chords.json: 
- Run `mongod` to start mongo server.
- Make sure node-mongo-seeds is installed globally (`npm install -g node-mongo-seeds`).
- Run `seed` from root directory.

To run app:
- Run npm install to install all packages.
- Run `mongod` to start mongo server.
- `npm start` to start webpack dev server and open http://localhost:8081/. 

![Chords and filters](/../screenshots/README_IMGS/screenshot.png?raw=true)
