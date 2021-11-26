# tic-tac-toe

General Assembly Software Engineering Immersive - Project 1
* Live Link: [here](https://kdaya001.github.io/tic-tac-toe/)

Assets:
* Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
* Images: [Pressstart](https://pressstart.vip/)
* Audio: [SFX](https://opengameart.org/content/512-sound-effects-8-bit-style)

## Technical Requirements:
- [x] Render a game in the browser
- [x] Switch turns between more than one player
- [x] Design logic for winning & visually display which player won
- [x] Include separate HTML / CSS / JavaScript files
- [x] Stick with KISS (Keep It Simple Stupid) principles
- [x] Use Javascript for DOM manipulation
- [x] Deploy your game online, where the rest of the world can access it
- [x] Use semantic markup for HTML and CSS (adhere to best practices)

## Technology Used
* HTML
* CSS
* Javascript

## Planning
### Game Rules:
* Players: 2 players (associated to 2 different tokens/icons)
* Player board: The player board is a 3 x 3 grid
* Player turn:
    * The player chooses one of nine (unfilled) boxes to place their symbol in. Player turn then ends and the alternate player triggers player turn
* End conditions: Either a player wins OR there are no more empty squares available (tie/draw)
* Win condition: A player wins if they have 3 of their symbols/tokens in either a row - either horizontally, vertically or diagonally 

### Basic UI Layout 
Final design

Mobile:

![Mobile Design](/images/game-design-mobile.png)
   
Desktop

![Desktop Design](/images/game-design-desktop.png)

### Demo
![Demo](/images/demo-gif.gif)


## Initial planning 

### Game Logic (high level):
* Win conditions: 
    * If row 1 matches
    * If row 2 matches
    * If row 3 matches
    * If column 1 matches
    * If column 2 matches
    * If column 3 matches
    * If diagonal (right to left) matches
    * If diagonal (left to right) matches
* If win condition isn't triggered: check if all boxes are filled to trigger tie condition/end condition
* Track active player
* Get the active box that is selected
* Store player choices

### Initial Problem breakdown:
* Create a function for win condtion:
    * Check if win conditions are met (3 in a row)
    * Check if win conditions are met (3 in a column)
    * Check if win conditions are met (3 diagonally)
    * If win is triggered return the player that won otherwise return null
* Create a function to add the active players token to chosen (empty) box
* Add click event listeners to container div for the 3x3 grid (to utilise [bubbling](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles))
    * Use event.target to set or get the value of the clicked box/inner `div`
    * Use logic to ensure an existing selection cannot be overwritten
* Track active player and token in an object
* Additonal:
    * Allow player to change name
    * Allow player to change icon

### Assumptions
* There is no way for a the non active player to win that is instigated by the active player. i.e. on the players turn, the player cannot allow the non-active player to win without the non active player making a selectin


### Initial Wireframe Design
* Note: Upon creating the below design, it was not visually appealing, the design was therefore changed to the actual design listed below

![Wireframe](/images/basic-layout-wireframe.jpg)