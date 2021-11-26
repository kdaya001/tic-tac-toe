# tic-tac-toe

GA SEI - Project 1
* Live Link: [here](https://kdaya001.github.io/tic-tac-toe/)

Assets:
* Font: 
    - [here](https://fonts.google.com/specimen/M+PLUS+2)
    - [here](https://fonts.google.com/specimen/Press+Start+2P)
* Images:
    - [here](https://pressstart.vip/)
* Audio:
    [here](https://opengameart.org/content/512-sound-effects-8-bit-style)

## Technical Requirements:
* Render a game in the browser
* Switch turns between more than one player
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) principles
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)

## Technology Used
* HTML
* CSS
* Javascript

## Planning
### Game Rules:
* Players: 2 players (associated to 2 different token or colours)
* Player board: The player board is a 3 x 3 grid
* Player turn:
    * The player chooses one of nine (unfilled) boxes to place their symbol in. Player turn then ends and the alternate player triggers player turn
* End conditions: Either a player wins/ties OR there are no more empty squares available
* Win condition: A player wins if they have 3 of their symbols in either a row - either horizontally, vertically or diagonally 

### Basic UI Layout (Wireframe) - TBC
![alt text](/images/basic-layout-wireframe.jpg)

### Game Logic (high level):
* Check win condition: (use an Array with the index of the win conditions). Basic premise for winning is:
    * If row 1 matches; else
    * If row 2 matches: else
    * If row 3 matches: else
    * If column 1 matches: else
    * If column 2 matches: else
    * If column 3 matches: else
    * If diagonal (right to left) matches: else
    * If diagonal (left to right) matches
* If win condition isn't triggered: check if all boxes are filled to trigger tie condition/end condition
* Track active player
* Get the active box that is selected
* Store player choices (TBC - DOM or JS Object)

### Problem broken down (TBC - unordered):
* Create a function for win condtion:
    * Check if win conditions are met (3 in a row)
    * Check if win conditions are met (3 in a column)
    * Check if win conditions are met (3 diagonally)
    * If win is triggered return the player that won otherwise return null
* Create a function to add the active players token to chosen (empty) box
* Add click event listeners to container div for the 3x3 grid (to utilise [bubbling](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles))
    * Use event.target to set or get the value of the clicked box/inner `div`
    * Use logic to ensure an existing selection cannot be overwritten
* Track active player using a variable
* Track player tokens in an object


### Assumptions
* There is no way for a the non active player to win that is instigated by the active player. i.e. on the players turn, the player cannot allow the non-active player to win without the non active player making a selectin
