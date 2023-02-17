const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
const gameButtons = document.querySelectorAll('.btn');
let userClickPattern = [];
let userChosenColor;
let gameLevel = 0;
let gameStarted = false;

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

$('body').keypress(function(e){
    console.log(`keypress: ${e.key}`);
    targetKey = e.key;
    let targetKeyColor;

    switch (targetKey) {
        case 'w':
            targetKeyColor = 'green';
            playSound(targetKeyColor);
            buttonPressed(targetKeyColor);
            break;

        case 'd':
            targetKeyColor = 'blue';
            playSound(targetKeyColor);
            buttonPressed(targetKeyColor);
            break;

        case 'a':
            targetKeyColor = 'red';
            playSound(targetKeyColor);
            buttonPressed(targetKeyColor);
            break;

        case 's':
            targetKeyColor = 'yellow';
            playSound(targetKeyColor);
            buttonPressed(targetKeyColor);
            break;
   
       default:
          break;
    }    
    userChosenColor = targetKeyColor;
    userClickPattern.push(userChosenColor);
    console.log(`userKeyPressPattern: ${userClickPattern}`);
    $('.' + targetKeyColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    checkAns();
    
})

function nextSequence(){
    userClickPattern = [];
    gameLevel++;
    $('#level-title').text(`Level ${gameLevel}`);
    gamePattern.length = [];
    const colorPattern = generateColorCombination(gameLevel);
    gamePattern.push(...colorPattern);
    colorPattern.forEach((color, index) => {
        setTimeout(() => {
          $('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          playSound(color);
        }, index * 500);
      });
      
      console.log("colorPattern: " + colorPattern);
      console.log("gamePattern: " + gamePattern);

    //   for(let i = 0; i < colorPattern.length; i++){
    //     const color = colorPattern[i];
    //     setTimeout(() => {
    //         $('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //     }, i * 500);
    //   }
    }

function generateColorCombination(gameLevel){
    const pattern = [];
    for(let i = 0; i < gameLevel; i++){
        const colorIndex = Math.floor(Math.random() * buttonColors.length);
        const color = buttonColors[colorIndex];
        console.log('Color: ' + color);
        pattern.push(color);
        console.log("Pattern: " + pattern);
    }

    return pattern;
}

function buttonPressed(btnColor){
    $('#' + btnColor).addClass('pressed');
    setTimeout(function(){
        $('#' + btnColor).removeClass('pressed');
    }, 200);
}

    $('body').keypress(function(e){
        console.log(e.key);
        if(e.key === 'Enter' && !gameStarted){
            gameStarted = true;
            setTimeout(() => {
                nextSequence();
            }, 1000);     
        }
        

    });

    $('#enter').click(function(){
        if(!gameStarted){
            gameStarted = true;
            setTimeout(() => {
                nextSequence();
            }, 1000);             
        }
    })

function checkAns() {
        if (!gameStarted) {
          return;
        }
      
        if (userClickPattern.length !== gamePattern.length) {
          return;
        }
      
        let checkWrong = false;
      
        for (let i = 0; i < gamePattern.length; i++) {
          if (gamePattern[i] !== userClickPattern[i]) {
            checkWrong = true;
            break;
          }
        }
      
        if (checkWrong) {
          console.log('wrong');
          playWrongSound();
          $('body').addClass('game-over');
          $('#level-title').text(`Game Over, Refresh Page to Restart`);
          setTimeout(() => {
            $('body').removeClass('game-over')
          }, 500);
          restartGame();
        } else {
          console.log('Success');
          console.log(`gamePattern: ${gamePattern}, userClickPattern: ${userClickPattern}`);
          console.log(`gamePattern.length: ${gamePattern.length}, userClickPattern.length: ${userClickPattern.length}`);
          setTimeout(() => {
            nextSequence();
            
          }, 1000);
        }
      }
      

function restartGame(){
    gameLevel = 0;
    gameStarted = false;
    gamePattern = [];
   
}

function playSound(buttonText){
    let audio = new Audio('/sounds/' + buttonText + '.mp3');
    audio.play();
}

function playWrongSound(){
    let audio = new Audio('/sounds/wrong.mp3');
    audio.play();
}
