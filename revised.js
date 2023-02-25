let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let userChosenColor;
let gameLevel = 0;
let gameStarted = false;
let maxLevel;
let selectDifficultyLevel;
let numberOfLives;

if (!gameStarted) {
  $(".container").css("pointer-events", "none");
}

function difficultyLevel(selectDifficultyLevel) {
  switch (selectDifficultyLevel) {
    case "Easy":
      maxLevel = 20;
      numberOfLives = 0;
      break;
    case "Normal":
      maxLevel = 25;
      numberOfLives = 2;
      break;

    case "Difficult":
      maxLevel = 30;
      numberOfLives = 2;
      break;
    default:
      $("#enter").css("cursor", "none");
      break;
  }
  return { maxLevel, numberOfLives };
}

let difficulty = difficultyLevel(selectDifficultyLevel);
maxLevel = difficulty.maxLevel;
numberOfLives = difficulty.numberOfLives;

function reduceLives(numberOfLives) {
  console.log(`numberOfLives: ${numberOfLives}`);
  let lives = $(".heart");
  $(lives[numberOfLives]).css("opacity", "0.3");
}

function getDifficuiltyLevel(difficultyLevel) {
  $(".dropdown-content a").click(function () {
    const clickDropDownContent = $(this);
    if (
      selectDifficultyLevel !== "" &&
      clickDropDownContent.text() !== selectDifficultyLevel
    ) {
      $(".dropdown-content a").removeClass("pressed");
    }
    clickDropDownContent.addClass("pressed");
    selectDifficultyLevel = clickDropDownContent.text();
    difficultyLevel(selectDifficultyLevel); //callback function
  });
}
getDifficuiltyLevel(difficultyLevel);

function generateColorCombination(getGameLevel) {
  console.log(`buttonColors: ${buttonColors}`);
  userClickPattern = [];
  $("#level-title").text(`Level ${gameLevel}/Level ${maxLevel}`);
  $(".container").css("pointer-events", "auto");
  gamePattern = [];

  for (let i = 0; i < gameLevel; i++) {
    if (gameLevel > maxLevel) {
      checkWin();
      break;
    }
    const colorIndex = Math.floor(Math.random() * buttonColors.length);
    const color = buttonColors[colorIndex];
    gamePattern.push(color);
    gamePattern.forEach((color, index) => {
      setTimeout(() => {
        $("#" + color)
          .fadeOut(100)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
        playSound(color);
      }, index * 500);
    });
    console.log("gamePattern: " + gamePattern);
  }
  getGameLevel(gameLevel); //callback function
}

function getGameLevel(gameLevel) {
  return gameLevel;
}

function checkWin() {
  gameLevel = getGameLevel(gameLevel);
  if (gameLevel > maxLevel) {
    restartGame();
    $("#level-title").text(`We have got a Winner!`);
    $(".container").css("pointer-events", "none");
    playOtherSounds("winner");
  }
}

function reconcileGameAndUserPattern() {
  if (!gameStarted) {
    return;
  }
  let lastColor = userClickPattern.length - 1;
  if (
    userClickPattern[lastColor] !== gamePattern[lastColor] &&
    numberOfLives > 0
  ) {
    // console.log("userClickPattern[lastIndex]", userClickPattern[lastColor]);
    // console.log("gamePattern[lastIndex]", gamePattern[lastColor]);
    // console.log(selectDifficultyLevel);
    playOtherSounds("wrong");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);

    setTimeout(() => {
      generateColorCombination(getGameLevel);
    }, 1500);
    reduceLives(numberOfLives);
    numberOfLives--;
  } else if (
    userClickPattern[lastColor] !== gamePattern[lastColor] &&
    numberOfLives === 0
  ) {
    //comparing values in an array
    // console.log('wrong');
    // console.log("userClickPattern[lastIndex]", userClickPattern[lastColor]);
    // console.log("gamePattern[lastIndex]", gamePattern[lastColor]);
    playOtherSounds("wrong");
    gameOver();
    //return;
  } else if (userClickPattern.length === gamePattern.length) {
    // console.log('Success');
    gameLevel++;
    setTimeout(() => {
      generateColorCombination(getGameLevel);
    }, 1000);
  }
}

function gameOver() {
  $("body").addClass("game-over");
  $("#level-title").text(`Game Over!`);
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 500);
  $(".heart").css("opacity", "0.3");
  restartGame();
}

function restartGameToEasyModeApperance() {
  $("#level-title").html(
    '<h1 id="level-title">Press <span id="enter"> Enter</span> to Start</h1>'
  );
  $(".pixel-heart").css("display", "flex");
  $(".heart").css("opacity", "1");

  $(".pixel-btn").css("display", "none");
  $("#difficult-level").css("display", "none");
  $(".dropdown-content a").not(`:contains(${selectDifficultyLevel})`).css({
    "pointer-events": "auto",
    cursor: "pointer",
    opacity: "1",
  });
  $(".container").css("pointer-events", "auto");
  $(".dropdown-content a").removeClass("pressed");
}

function restartGame() {
  $(".container").css("pointer-events", "none");
  gameLevel = 0;
  gameStarted = false;
  gamePattern = [];
  $(".pixel-btn").css("display", "inline-block");
  $(".pixel-btn").click(function () {
    $(".pixel-btn").toggleClass("active");
    restartGameToEasyModeApperance();
    setUpEventListenersForStartGame();
    //location.reload();
  });
}

$(".btn").click(function () {
  buttonText = this.id;
  userChosenColor = buttonText;
  userClickPattern.push(userChosenColor);
  console.log(`userClick: ${userClickPattern}`);

  $("." + buttonText)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  switch (buttonText) {
    case "red":
    case "blue":
    case "green":
    case "yellow":
    case "orange":
    case "purple":
      playSound(buttonText);
      buttonPressed(buttonText);
      break;

    default:
      break;
  }
  reconcileGameAndUserPattern();
});

function removeAdditionalButtonColors() {
  //let orange = buttonColors.includes('orange');
  let orangeIndex = buttonColors.indexOf("orange");
  let purpleIndex = buttonColors.indexOf("purple");
  //let purple = buttonColors.includes('purple');
  if (buttonColors.includes("orange") && buttonColors.includes("purple")) {
    buttonColors.splice(orangeIndex);
    buttonColors.splice(purpleIndex);
  }
}

function setUpEventListenersForStartGame() {
  $("body").keypress(function (e) {
    console.log(e.key);
    if (e.key === "Enter" && !gameStarted && selectDifficultyLevel) {
      gameStarted = true;
      gameLevel++;
      maskDifficultyLevel();
      setTimeout(() => {
        generateColorCombination(getGameLevel);
      }, 1000);
    }
    switch (selectDifficultyLevel) {
      case "Easy":
        $(".pixel-heart").css("display", "none");
        removeAdditionalButtonColors();
        break;
      case "Normal":
        removeAdditionalButtonColors();
        break;
      case "Difficult":
        buttonColors.push("orange", "purple");
        $("#difficult-level").css("display", "flex");
        break;
      default:
        break;
    }
  });

  $("#enter").click(function () {
    if (!gameStarted && selectDifficultyLevel) {
      gameStarted = true;
      gameLevel++;
      maskDifficultyLevel();
      setTimeout(() => {
        generateColorCombination(getGameLevel);
      }, 1000);
    }
    switch (selectDifficultyLevel) {
      case "Easy":
        $(".pixel-heart").css("display", "none");
        removeAdditionalButtonColors();
        break;
      case "Normal":
        removeAdditionalButtonColors();
        break;
      case "Difficult":
        buttonColors.push("orange", "purple");
        $("#difficult-level").css("display", "flex");
        break;
      default:
        break;
    }
  });
}
setUpEventListenersForStartGame();

function buttonPressed(btnColor) {
  $("#" + btnColor).addClass("pressed");
  setTimeout(function () {
    $("#" + btnColor).removeClass("pressed");
  }, 200);
}

function playSound(buttonText) {
  let audio = new Audio("sounds/" + buttonText + ".mp3");
  audio.play();
}

function playOtherSounds(filename) {
  let audio = new Audio(`sounds/${filename}.mp3`);
  audio.play();
}

function maskDifficultyLevel() {
  $(".dropdown-content a").not(`:contains(${selectDifficultyLevel})`).css({
    "pointer-events": "none",
    opacity: "0.5",
  });
}
