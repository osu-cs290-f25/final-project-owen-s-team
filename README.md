# Aim Trainer

Aim Trainer is a web based game designed to help users improve their aim and reaction time for fast-paced games. It is built with HTML, CSS, and JavaScript, and is server with Node.js using Express and EJS for templatization. All game data is stored in a JSON file on the backend.

## Configuration

To visit the website, you must run the server on your own machine and visit localhost:8000 in your browser. To do this:
- Clone this repository from github
- Ensure you have [NodeJS](https://nodejs.org/en) installed on your machine
- Navigate to the main project directory, and in your terminal, run
```bash
# install dependencies
npm install

# run the app
npm start
```
- In your browser, navigate to "localhost:8000"

## How to Play

To play the game, navigate to the main game page by clicking the "Play" button, and click on the "Click to Begin" button. This will generate a target in a random location. Clicking on this target will generate a new one in another random location, and so on. Each clicked target will increase your score by one, and every time you miss a target and click somewhere else on the game window, your score will go down by one. The goal is to get the highest score you can before the time runs out.

## Features

### Changing Settings

You can change game settings in two places:
- On the main game window in the top right corner settings icon (while the game is not running)
- In the game end modal by clicking the "Change Settings" button

Settings Options:
- Difficulty - Easy, Medium, and Hard (Easy -> Large Targets, Hard -> Small Targets)
- Time - 10, 20, 30 (Makes the game last 10, 20, and 30 seconds respectively)
- Color - Changes the target color to the selected color

### Scoreboard

Upon a game round ending, you have the option to save your score by pressing the "Save Score" button. This will prompt you to input a username to be associated with that score. Once a score is saved it will be visible in the scoreboard (accessible through the "Scoreboard" button in the game end modal)

The scoreboard is displayed as follows.

- There are two settings dropdowns, one for difficulty and one for time. In the scoreboard list, only games that were played with the selected settings will be displayed.
- There are two display options: Global and Personal. By default the global option is selected.

#### Global Display

In the global scoreboard display, every user's singular high score matching the selected settings will be displayed, sorted by score (descending).

#### Personal Display

To view the personal scoreboard display, a username must be entered in the username field at the top of the scoreboard modal. Once a username is entered, every game that the specified user has played matching the selected settings will be displayed, sorted by score (descending).
