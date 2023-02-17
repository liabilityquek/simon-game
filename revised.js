const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickPattern = [];
let userChosenColor;
let gameLevel = 0;
let gameStarted = false;
let maxLevel;
let selectDifficultyLevel;
let numberOfLives;


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

function difficultyLevel(selectDifficultyLevel){
	switch (selectDifficultyLevel) {
		case 'Easy':
		maxLevel = 20;
		numberOfLives = 0;   
		break;
		
		case 'Normal':
		maxLevel = 2;
		numberOfLives = 3;  
		break;
		
		case 'Difficult':
		maxLevel = 20;  
		numberOfLives = 3;  
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
    //gameLevel++;
    maxLevel = difficultyLevel(selectDifficultyLevel);
    $('#level-title').text(`Level ${gameLevel}/Level ${maxLevel}`);
    $('.container').css('pointer-events', 'auto');
    gamePattern = [];

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
				$('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				playSound(color);
			}, index * 500);
		});
        console.log("gamePattern: " + gamePattern);
	}
	getGameLevel(gameLevel); //callback function
	gameWon = false;
}

function getGameLevel(gameLevel){
	return gameLevel;
}

function checkWin(){
	gameLevel = getGameLevel(gameLevel);
	if (gameLevel > maxLevel) {
		restartGame();
		$('#level-title').text(`We have got a Winner!`);
		$('.container').css('pointer-events', 'none');
		playOtherSounds('winner');
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
		gameLevel++;
		maskDifficultyLevel();
		setTimeout(() => {
			generateColorCombination(getGameLevel);
		}, 1000);     
		
	}
});

$('#enter').click(function(){
	if(!gameStarted && selectDifficultyLevel){
		gameStarted = true;
		gameLevel++;
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
	if (userClickPattern[lastColor] !== gamePattern[lastColor] && numberOfLives > 0) { //comparing values in an array
		console.log('wrong');
		console.log("userClickPattern[lastIndex]", userClickPattern[lastColor]);
		console.log("gamePattern[lastIndex]", gamePattern[lastColor]);
		numberOfLives-=1;
		console.log(`numberOfLives, ${numberOfLives}`);
		playOtherSounds('wrong');
		setTimeout(() => {
            $('body').removeClass('game-over');
		}, 500);

		setTimeout(() => {
            generateColorCombination(getGameLevel);
		}, 1000);
		

	}else if (userClickPattern[lastColor] !== gamePattern[lastColor] && numberOfLives === 0) { //comparing values in an array
		console.log('wrong');
		console.log("userClickPattern[lastIndex]", userClickPattern[lastColor]);
		console.log("gamePattern[lastIndex]", gamePattern[lastColor]);
		console.log(`numberOfLives, ${numberOfLives}`);
		playOtherSounds('wrong');
		$('body').addClass('game-over');
		$('#level-title').text(`Game Over!`);
		setTimeout(() => {
            $('body').removeClass('game-over')
		}, 500);
		restartGame();
		$('.container').css('pointer-events', 'none');
		return;
	}else if (userClickPattern.length === gamePattern.length) {
		console.log('Success');
		console.log(`gamePattern: ${gamePattern}, userClickPattern: ${userClickPattern}`);
		console.log(`gamePattern.length: ${gamePattern.length}, userClickPattern.length: ${userClickPattern.length}`);
		// if (gameLevel < maxLevel) {
		 	gameLevel++;
		//   }
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


