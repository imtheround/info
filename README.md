##  To get Started

Git is recommanded to install this project, you will need npm to run this webstie

To install the source code
```bash
git clone -b main https://github.com/imtheround/info.git
```
To install dependencies 

```bash
cd info/
npm install
```

To run the website after installing dependencies 

```bash
npm run dev
```
Note: Running the dev build will have some lag when rendering the background picture + compile time when visiting a page first time

Or to build the website 
```bash
npm run build
```
then
```bash
npm run start
```
Webpage will typically up on `localhost:3000` unless the port is taken

--------------------------------------------------------
### FOR THE GAME

The game will redirect to the difficulty chooser when the main page is loaded, the difficulty chooser is like a entry point for the game, each gamemode has a different difficulty, for exemple, easy has more heart and a smaller maximum number. To get the anwser in a game and win, hover on the top right corner to get the anwser. All the resources are in public/ressources

--------------------------------------------------------

Places where ai was used:
```
- To let the heart follow the mouse smoothly instead of snapping to it
- To fix some build errors 
- To deploy on cloudflare 
```

other resources used:
```
stackoverflow 
tailwind docs
nextjs docs
react docs
```

Added features:
```
- The heart bar follows the mouse smoothly
- displays the number of used attempts + the correct number if you get it right
- displays the correct number if you get it wrong
- difficulty chooser
- The "respawn screen" (lets user go back/start another game)
- used a custom font (public/ressources/fonts/Font.ttf a minecraft style font)
- A hover on the right top corner where you can get the anwser
```
external used sources:
```
https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
https://stackoverflow.com/questions/74540010/how-do-i-dynamically-add-a-div-where-mouse-was-clicked-in-react (helped the hearts that follows the mouse)
```
