<p align="center">
  <a href="" rel="noopener">
 <img width=500px height=600px src="/images/Simon-Game.png" alt="Simon Game"></a>
</p>

<h3 align="center">Simon Game</h3>

---

## Description

The Simon Game has a series of colored butttons that light up and play a sound when pressed. The game generates a random sequence of lights and sounds, and you have to repeat the sequence by clicking on the buttons in the same order. The sequence gets longer and more complicated as you progress through the game.

## Timeframe

5 days

## Deployment

The game is deployed on GitHub pages, and you can play the game here:

## Features
<li>3 differnt Game modes; Easy, Normal and Difficult</li>
<li>Four colored buttons for Easy and Medium level that lights up and play a sound
<li>Six colored buttons for Difficult level that lights up and play a sound</li></li>
<li>A game sequence that gets longer and more complicated as you progress</li>
<li>A game over message will appear when you get the sequence wrong and or when all 3 lives have been used up</li>
<li>A Enter button to start the game</li>
<li>A Restart button to go back to the game main page to re-play the game.</li>
<br>

## Technologies & Tools Used
<li>HTML</li>
<li>jQuery</li>
<li>CSS</li>
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

## Milestone Timeline
<strong><u>Day 1:</u></strong>
<br>
([x])Learning how to play Simon game.
<br>
<input type="checkbox" id disabled class checked>Learning how the game mechanism works.
<br>
<input type="checkbox" id disabled class checked>Brainstroming the syntax required for the game.
<br>
<input type="checkbox" id disabled class checked>Writing up the backbone of the game.
<br>
<input type="checkbox" id disabled class checked>Getting the animations, sounds to work.
<br><br>
<strong><u>Day 2:</u></strong>
<br>
<input type="checkbox" id disabled class checked>Introduce both game and difficulty level.
<br>
<input type="checkbox" id disabled class checked>DOM manipulation and inserting click event listener
<br>
<input type="checkbox" id disabled class checked>Working out on setTimeout
<br><br>
<strong><u>Day 3:</u></strong>
<br>
<input type="checkbox" id disabled class checked>Working out on CSS structure
<br>
<input type="checkbox" id disabled class checked>Working out on HTML structure
<br>
<input type="checkbox" id disabled class checked>Testing out on setInterval
<br><br>
<strong><u>Day 4:</u></strong>
<br>
<input type="checkbox" id disabled class checked>Testing out on setInterval
<br>




- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
