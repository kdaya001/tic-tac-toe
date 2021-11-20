# tic-tac-toe
## Technical Requirements:
* Render a game in the browser
* Switch turns between more than one player
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) principles
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)

## Tech Used
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

## Game Logic (high level):
* Check win condition:
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
