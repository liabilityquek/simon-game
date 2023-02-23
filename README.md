<p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/images/Simon-Game.png" alt="Simon Game"></a>
</p>

<h3 align="center">Simon Game</h3>

---

## Description

The Simon Game has a series of colored butttons that light up and play a sound when pressed. The game generates a random sequence of lights and sounds, and you have to repeat the sequence by clicking on the buttons in the same order. The sequence gets longer and more complicated as you progress through the game.

## Timeframe

5 days

## Deployment

The game is deployed on GitHub pages, and you can play the game <a href="https://liabilityquek.github.io/simon-game/">here</a>. 

## Features
<li>3 differnt Game modes; Easy, Normal and Difficult</li>
<li>Four colored buttons for Easy and Medium level that lights up and play a sound
<li>Six colored buttons for Difficult level that lights up and play a sound</li></li>
<li>A game sequence that gets longer and more complicated as you progress</li>
<li>A game over message will appear when you get the sequence wrong and or when all 3 lives have been used up</li>
<li>A Enter button to start the game</li>
<li>A Restart button to go back to the game main page to re-play the game.</li>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/images/Simon-Game-difficult.png" alt="Simon-Game-difficult"></a>
</p>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/images/Simon-Game-gameplay-normal.png" alt="Simon-Game-normal-gameplay"></a>
</p>
<br>

## Technologies & Tools Used
<li>HTML</li>
<li>jQuery</li>
<li>CSS</li>
<li>Git commands</li>
<br>

## How To Play
<ol>
<li>Hover to Game Mode and select difficulty level</li>
<li>Click or press Enter to start game</li>
<li>Select the correct color sequence to move on to the next level
</ol>
<br>

## Game Structure</a>
After learning how to play the Simon Game; this is how I build the game structure.


<strong><u>Game Setup:</u></strong>

<li>Create an array to store the button colors.
<li>Create an empty array to store randomly generated game pattern.</li>
<li>Create an empty array to store the player's input.</li>
<li>Create a variable to store the current color the player has clicked on.</li>
<li>Create a variable to store game level.</li>
<li>Create a variable store the maximum game level.</li>
<li>Create a variable to store difficulty level.</li>
<li>Create a variable to store the number of lives for the player.</li>
</li>
<br>

<strong><u>Setting up the difficulty level:</u></strong>
<li>Add two additional colors to the colors array for the difficult level.</li>
<li>Allow player to select difficulty level.</li>
<br>

<strong><u>Start game:</u></strong>
<li>Make the game board visible.</li>
<li>Make sure the sound executes when button selected.</li>
<li>Generate random game pattern.</li>
<br>

<strong><u>Player turn:</u></strong>
<li>Create a click event listener for the buttons.</li>
<li>Store player's input to an array.</li>
<li>Play the button animation and sound when clicked.</li>
<li>Check the button clicked is the correct button in the sequence.</li>
<li>If the player clicked on the correct button, go to the next level.</li>
<li>If the player clicked on the wrong button, end the game.</li>
<br>

<strong><u>During Game Play:</u></strong>
<li>Reduce the player's lives by one when they make a mistake.</li>
<li>Reconcile game pattern's input and player's input</li>
<li>Increment game level by 1 if player win current level.</li>
<li>Generate a new random game pattern for every level</li>
<li>Ensure's that the length of the game pattern is equals to the current game level</li>
<br>

<strong><u>Game Won:</u></strong>
<li>If player won, display a winning message and offer the option to play again.</li>
<br>

<strong><u>Game over:</u></strong>
<li>If the player clicked on the wrong button and has no remaining lives, display a game over message and offer the option to play again.</li>
<br>

## Deliverables Timeline
<strong><u>Day 1:</u></strong>
<li>Learning how to play Simon game</li>
<li>Learning how the game mechanism works</li>
<li>Brainstroming the syntax required for the game</li>
<li>Writing up the backbone of the game</li>
<li>Getting both the animations and sounds to work</li>
<br>
<strong><u>Day 2:</u></strong>
<li>Writing up the backbone of the game</li>
<li>Introduce both game and difficulty level</li>
<li>DOM manipulation and inserting click event listener</li>
<li>Implementing setTimeout</li>
<br>
<strong><u>Day 3:</u></strong>
<br>
<li>DOM manipulation and inserting click event listener</li>
<li>CSS structure</li>
<li>HTML structure</li>
<br>
<strong><u>Day 4:</u></strong>
<br>
<li>DOM manipulation and inserting click event listener</li>
<li>CSS structure</li>
<li>HTML structure</li>
<br>
<strong><u>Day 5:</u></strong>
<br>
<li>Wrap up</li>
<br>

## Key Takeaways
These are key takeaways when working on the project:
<li>Drafting up project requirements</li>
<li>Making it a habit to comment the codes for easy reference and readability</li>
<li>Writing mulitple console.log syntax to ensure that the function or codes are returning the correct values</li>
<li>Assign meaningful name to functions for easy readability</li>
<li>Create functions in order to reduce duplication codes</li>
<li>Returning multiple values from an function using an object like the one shown below</li>

```
function difficultyLevel(selectDifficultyLevel){

	switch (selectDifficultyLevel) {

		case 'Easy':
			maxLevel = 20;
			numberOfLives = 0;  
			break;

		case 'Normal':
			maxLevel = 25;
			numberOfLives = 2;			
			break;

		case 'Difficult':
			maxLevel = 3;
			numberOfLives = 2;
			buttonColors.push('orange', 'purple');	
			$('#difficult-level').css('display', 'flex');		
			break;
		default:
			$('#enter').css('cursor', 'none');  
			break;
	}
	return{maxLevel, numberOfLives} ;
}

let difficulty = difficultyLevel(selectDifficultyLevel);
maxLevel = difficulty.maxLevel;
numberOfLives = difficulty.numberOfLives;

```
<li>Learning callbacks in class and applying it in practise</li>
<br>
<p>The difficultyLevel function is the callback function that is called by getDifficuiltyLevel to compute the values for the maximum level and number of lives.</p> 
<p>Which is later executed in response to a specific event such as the player clicking on a dropdown menu.</p>

```
function difficultyLevel(selectDifficultyLevel){
	switch (selectDifficultyLevel) {
		case 'Easy':
			maxLevel = 20;
			numberOfLives = 0;  
			break;
		case 'Normal':
			maxLevel = 25;
			numberOfLives = 2;			
			break;

		case 'Difficult':
			maxLevel = 30;
			numberOfLives = 2;
			buttonColors.push('orange', 'purple');	
			$('#difficult-level').css('display', 'flex');		
			break;
		default:
			$('#enter').css('cursor', 'none');  
			break;
	}
	return{maxLevel, numberOfLives} ;
}

function getDifficuiltyLevel(difficultyLevel) {
	$('.dropdown-content a').click(function() {
		const clickDropDownContent = $(this);
		if (selectDifficultyLevel !== '' && clickDropDownContent.text() !== selectDifficultyLevel) {
			$('.dropdown-content a').removeClass('pressed');
		}
		clickDropDownContent.addClass('pressed');
		selectDifficultyLevel = clickDropDownContent.text();
		difficultyLevel(selectDifficultyLevel); 
	});
}
getDifficuiltyLevel(difficultyLevel);
```
<br>

getGameLevel function is used to extract the gameLevel from the generateColorCombination which will then be used to return the value of the gameLevel.

```

function generateColorCombination(getGameLevel){
    userClickPattern = [];
    $('#level-title').text(`Level ${gameLevel}/Level ${maxLevel}`);
    $('.container').css('pointer-events', 'auto');
    gamePattern = [];
	
    for(let i = 0; i < gameLevel; i++){
		
		if (gameLevel > maxLevel) {
			checkWin();
			break;
		}
        const colorIndex = Math.floor(Math.random() * buttonColors.length);
        const color = buttonColors[colorIndex];
        gamePattern.push(color);
        gamePattern.forEach((color, index) => {
			setTimeout(() => {
				$('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				playSound(color);
			}, index * 500);
		});
        console.log("gamePattern: " + gamePattern);
	}
	getGameLevel(gameLevel);
}

function getGameLevel(gameLevel){
	return gameLevel;
}
```

## Future Enhancements
<p>As this game is part of a project submission, there would not be an future amendments made to this.</p>However, if there were any future enhancements to be made, these would be the following changes:</p>
<li>Rewrite the code using the MVC approach</li>
<li>Insert a countdown timer for the Normal levels and above</li>
<li>Introduce different sounds/genre for the player to choose from</li>
<li>Allowing the game to be paused half-way which also reduce player's live</li>
<li>Include a mixtype to hype up the music</li>

<br>
## References
Various sources which I have seek guidance from:
</li>
<li><a href=https://stackoverflow.com/questions/9419263/how-to-play-audio>Adding audio using javascript</a>
</li>
<li><a href=https://codepen.io/BenLBlood/pen/LGLEoJ>Simon Game</a>
</li>
<li><a href=https://www.javascripttutorial.net/javascript-return-multiple-values>Returning Multiple Values from a Function</a>
</li>
<li><a href=https://www.geeksforgeeks.org/jquery-not-method-with-examples>How to use not method in jQuery</a>
</li>

<br>

## Game Asset Attribution
The game assets in this project does not belong to me. All rights belong to the original artists and owners. Below are the links to the game assets used in this project:
<li><a href=https://codepen.io/araltasher/pen/XBXKjb>Pixel Heart</a>
<li><a href=https://github.com/londonappbrewery/Simon-Game>App Brewery</a>
<li><a href=https://pixabay.com/sound-effects/tadaa-47995>Audio</a>

