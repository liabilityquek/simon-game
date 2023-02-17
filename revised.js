const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickPattern = [];
let userChosenColor;
let gameLevel = 0;
let gameStarted = false;
let maxLevel;
let selectDifficultyLevel;
let timerCountDown;

//console.log(`timerCountDown: ${timerCountDown}`);

if(!gameStarted){
	$('.container').css('pointer-events', 'none');
}

function maskDifficultyLevel(){
  console.log(`selectDifficultyLevel: ${selectDifficultyLevel}`);
	$('.dropdown-content a').not(`:contains(${selectDifficultyLevel})`).css({
		'pointer-events': 'none',
		'opacity': '0.5'
	});
	
}

function getTimerCountDown (timerCountDown){ //callback function
	
	//console.log(`timerCountDown: ${timerCountDown}`);
	return timerCountDown;
}

function countDownTimer(getTimerCountDown){
	let timer = 10;
  
	if (timerCountDown !== null) {
	  clearInterval(timerCountDown);
	}
	
	timerCountDown = setInterval(function(){
	  let seconds = timer % 60;
	  let timeString = `${seconds}`;
  
	  if(timer <= 3 && timer > 0){
		$('#timer').toggleClass('game-over', true);
	  } else {
		$('#timer').toggleClass('game-over', false);
	  }
  
	  if(timer <= 0){
		timerCountDown = null;
		clearInterval(timerCountDown);
		$('#time-up').css('display', 'block');  
		$('#timer').css('display', 'none');  
		$('body').addClass('game-over');
		$('#level-title').text(`Game Over!`);
		restartGame();
	  }
	  $('#timer').html(timeString);
	  timer -= 1;
	}, 1000);
  
	getTimerCountDown(timerCountDown);
  }
  

function difficultyLevel(selectDifficultyLevel){
	switch (selectDifficultyLevel) {
		case 'Easy':
		maxLevel = 5;    
		break;
		
		case 'Normal':
		maxLevel = 10;
		break;
		
		case 'Difficult':
		maxLevel = 15;  
		break;
		
		case 'Extreme':
		maxLevel = 20;   
		break;
		
		default:
		$('#enter').css('cursor', 'none');  
		break;
	}
	return maxLevel;
}

function getDifficuiltyLevel(difficultyLevel) {
	$('.dropdown-content a').click(function() {
		
		const clickDropDownContent = $(this);
		if (selectDifficultyLevel !== '' && clickDropDownContent.text() !== selectDifficultyLevel) {
			$('.dropdown-content a').removeClass('pressed');
		}
		clickDropDownContent.addClass('pressed');
		selectDifficultyLevel = clickDropDownContent.text();
		difficultyLevel(selectDifficultyLevel); //callback function
	});
}
getDifficuiltyLevel(difficultyLevel);

$('.btn').click(function(){
	
    buttonText = this.id;
    userChosenColor = buttonText;
    userClickPattern.push(userChosenColor);
    console.log(`userClick: ${userClickPattern}`);
	
    $('.' + buttonText).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	
	switch (buttonText) {
		case 'red':
		case 'blue':   
		case 'green':
		case 'yellow':
		playSound(buttonText);
		buttonPressed(buttonText);
		break;
		
        default:
		break;
	}
	checkAns();
})


function generateColorCombination(getGameLevel){
    userClickPattern = [];
    gameLevel++;
    maxLevel = difficultyLevel(selectDifficultyLevel);
    $('#level-title').text(`Level ${gameLevel}/Level ${maxLevel}`);
    $('.container').css('pointer-events', 'auto');
    gamePattern = [];
	if (timerCountDown !== null) {
		clearInterval(timerCountDown);
	  }
	  
    for(let i = 0; i < gameLevel; i++){
		
		if (gameLevel > maxLevel) {
			checkWin();
			break;
		}
		
        const colorIndex = Math.floor(Math.random() * buttonColors.length);
        console.log(`colorIndex: ${colorIndex}`);
        const color = buttonColors[colorIndex];
        console.log('Color: ' + color);
        gamePattern.push(color);
        gamePattern.forEach((color, index) => {
			setTimeout(() => {
				$('#' + color).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
				playSound(color);
			}, index * 350);
		});
        console.log("gamePattern: " + gamePattern);
	}
	getGameLevel(gameLevel);
	//console.log('gameLevel: ', getGameLevel(gameLevel)); //callback function 
	switch (selectDifficultyLevel) {
		case 'Normal':
		case 'Difficult':
		case 'Extreme':
			
			//console.log(`inside function timer: ${timerCountDown} `);
			timerCountDown = 10;
			countDownTimer(getTimerCountDown); 
		break;

		default: 
		break;
	}

}

function getGameLevel(gameLevel){
	return gameLevel;
}

function checkWin(){
	gameLevel = getGameLevel(gameLevel);
	if (gameLevel > maxLevel) {
		console.log('gameLevel: ', getGameLevel(gameLevel));
		$('#level-title').text(`We have got a Winner!`);
		$('.container').css('pointer-events', 'none');
		playOtherSounds('winner');
		restartGame();
	}
}

function buttonPressed(btnColor){
    $('#' + btnColor).addClass('pressed');
    setTimeout(function(){
        $('#' + btnColor).removeClass('pressed');
	}, 200);
}

$('body').keypress(function(e){
	console.log(e.key);
	if(e.key === 'Enter' && !gameStarted && selectDifficultyLevel){
		gameStarted = true;
		maskDifficultyLevel();
		setTimeout(() => {
			generateColorCombination(getGameLevel);
		}, 1000);     
		
	}
});

$('#enter').click(function(){
	if(!gameStarted && selectDifficultyLevel){
		gameStarted = true;
		maskDifficultyLevel();
		setTimeout(() => {
			generateColorCombination(getGameLevel);
		}, 1000);             
	}
})

function checkAns() {
	if (!gameStarted) {
		return;
	}
	let lastColor = userClickPattern.length - 1;
	console.log(`checking gamePattern[lastColor]: ${gamePattern[lastColor]}`);
	//console.log(`timerCountDown in checkAns: ${timer}`);
	if (userClickPattern[lastColor] !== gamePattern[lastColor]) { //comparing values in an array
		console.log('wrong');
		console.log("userClickPattern[lastIndex]", userClickPattern[lastColor]);
		console.log("gamePattern[lastIndex]", gamePattern[lastColor]);
		playOtherSounds('wrong');
		$('body').addClass('game-over');
		$('#level-title').text(`Game Over!`);
		setTimeout(() => {
            $('body').removeClass('game-over')
			if (timerCountDown !== null) {
				clearInterval(timerCountDown);
			}
		}, 500);
		restartGame();
		$('.container').css('pointer-events', 'none');
		return;
	}
	
	if (userClickPattern.length === gamePattern.length) {
		console.log('Success');
		console.log(`gamePattern: ${gamePattern}, userClickPattern: ${userClickPattern}`);
		console.log(`gamePattern.length: ${gamePattern.length}, userClickPattern.length: ${userClickPattern.length}`);
		setTimeout(() => {
            generateColorCombination(getGameLevel);
		}, 1000);
	}
}

function restartGame(){
    gameLevel = 0;
    gameStarted = false;
    gamePattern = [];
    $('.pixel-btn').css('display', 'inline-block');
    $('.pixel-btn').click(function(){
		location.reload();
	})
    
}

function playSound(buttonText){
    let audio = new Audio('/sounds/' + buttonText + '.mp3');
    audio.play();
}

function playOtherSounds(filename){
	let audio = new Audio(`/sounds/${filename}.mp3`);
	audio.play();
}
