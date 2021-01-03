document.addEventListener("DOMContentLoaded", () => {
  const tileArray = [
    {
      number: 21,
      position: 0,
      worms: 1,
      img: "https://i.ibb.co/D11CHjn/Tile21.png",
    },
    {
      number: 22,
      position: 1,
      worms: 1,
      img: "https://i.ibb.co/ZH0Tng0/Tile22.png",
    },
    {
      number: 23,
      position: 2,
      worms: 1,
      img: "https://i.ibb.co/RyHFQBV/Tile23.png",
    },
    {
      number: 24,
      position: 3,
      worms: 1,
      img: "https://i.ibb.co/h1fqj1F/Tile24.png",
    },
    {
      number: 25,
      position: 4,
      worms: 2,
      img: "https://i.ibb.co/Bysyxxv/Tile25.png",
    },
    {
      number: 26,
      position: 5,
      worms: 2,
      img: "https://i.ibb.co/XzhJWkj/Tile26.png",
    },
    {
      number: 27,
      position: 6,
      worms: 2,
      img: "https://i.ibb.co/09C1NHG/Tile27.png",
    },
    {
      number: 28,
      position: 7,
      worms: 2,
      img: "https://i.ibb.co/C1gRCv9/Tile28.png",
    },
    {
      number: 29,
      position: 8,
      worms: 3,
      img: "https://i.ibb.co/KKqSTyC/Tile29.png",
    },
    {
      number: 30,
      position: 9,
      worms: 3,
      img: "https://i.ibb.co/MCPTqC6/Tile30.png",
    },
    {
      number: 31,
      position: 10,
      worms: 3,
      img: "https://i.ibb.co/XYBSpfF/Tile31.png",
    },
    {
      number: 32,
      position: 11,
      worms: 3,
      img: "https://i.ibb.co/7KJVVsJ/Tile32.png",
    },
    {
      number: 33,
      position: 12,
      worms: 4,
      img: "https://i.ibb.co/DCT8VWY/Tile33.png",
    },
    {
      number: 34,
      position: 13,
      worms: 4,
      img: "https://i.ibb.co/8mD2yKm/Tile34.png",
    },
    {
      number: 35,
      position: 14,
      worms: 4,
      img: "https://i.ibb.co/rtkmBJ8/Tile35.png",
    },
    {
      number: 36,
      position: 15,
      worms: 4,
      img: "https://i.ibb.co/3WYDW5M/Tile36.png",
    },
  ];
  var socket = io();
  const grid1 = document.querySelector(".grid1");
  const grid1pics = grid1.querySelectorAll("img");
  const playerOne = document.querySelector(".player1");
  const playerTwo = document.querySelector(".player2");
  const pileOne = document.querySelector(".player1");
  const pileTwo = document.querySelector(".player2");

  //Creates the line of tiles at top of page.
  function createBoard() {
    for (let i = 0; i < tileArray.length; i++) {
      var tile = document.createElement("img");
      tile.setAttribute("src", tileArray[i].img);
      grid1.appendChild(tile);
      tile.setAttribute("class", "tile");
      tile.setAttribute("data-id", i);
      tile.addEventListener("click", bankTile);
      tilesArray.push(tileArray[i]);
    }
  }

  //Creates dice bank for player 1. Sets all dice spaces to blue.
  function createBank1() {
    var diceBank = document.querySelector(".bank1");
    for (let i = 0; i < 8; i++) {
      var dice = document.createElement("img");
      dice.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
      diceBank.appendChild(dice);
      dice.setAttribute("class", "dice");
    }
  }

  //Creates space where dice are rolled. Sets all dice spaces to blue.
  function createDice() {
    var diceRoll = document.querySelector(".diceRoll");
    for (let i = 0; i < 8; i++) {
      var dice = document.createElement("img");
      dice.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
      diceRoll.appendChild(dice);
      dice.setAttribute("class", "dice");
    }
  }

  //Creates dice bank for player 2. Sets all dice spaces to blue.
  function createBank2() {
    var diceBank = document.querySelector(".bank2");
    for (let i = 0; i < 8; i++) {
      var dice = document.createElement("img");
      dice.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
      diceBank.appendChild(dice);
      dice.setAttribute("class", "dice");
    }
  }

  //Creates tile bank for player1. Sets tile to blue.
  function tileOne() {
    var tile = document.createElement("img");
    tile.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png");
    playerOne.appendChild(tile);
  }

  //Creates tile bank for player1. Sets tile to blue.
  function tileTwo() {
    var tile = document.createElement("img");
    tile.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png");
    playerTwo.appendChild(tile);
  }

  //Call all above functions.
  createBoard();
  createDice();
  tileOne();
  tileTwo();
  createBank1();
  createBank2();

  //Runs when player wants to add tile to their pile, or flip over a tile.
  function bankTile() {
    if (signal === 0) {
      //signal checks if player has clicked "flip tile" button.
      //This is what happens if player has not clicked "flip tile" button.
      var tileId = this.getAttribute("data-id");
      if (counter % 2 !== 0) {
        // counter%2 checks whos turn it is.
        //counter%2 !== 0 means it is player 1's turn.
        if (rollCounter === bank1[bank1.length - 1].roll) {
          if (bankTotal1 >= tileArray[tileId].number) {
            if (bank1.includes(diceArray[5])) {
              //This is what happens if the bank total is high enough and they have banked a worm.
              pile1.push(tileArray[tileId]);
              returnChecker = 1;
              socket.emit("bankTile", {
                counter: counter,
                tileId: tileId,
                pile1: pile1,
              });
              finish();
            } else {
              alert("You need a worm to bank a tile");
            }
          } else {
            alert(
              `Your bank total is ${bankTotal1}, you need at least ${tileArray[tileId].number} to bank this tile.`
            );
          }
        } else {
          alert(
            "You can't bank a tile after rolling again. You must return the tile at the top of your pile."
          );
        }
      } else {
        //This is what happens when it is player 2's turn.
        if (rollCounter === bank2[bank2.length - 1].roll) {
          if (bankTotal2 >= tileArray[tileId].number) {
            if (bank2.includes(diceArray[5])) {
              pile2.push(tileArray[tileId]);
              returnChecker = 1;
              socket.emit("bankTile", {
                counter: counter,
                pile2: pile2,
                tileId: tileId,
              });
              finish();
            } else {
              alert("You need a worm to bank a tile");
            }
          } else {
            alert(
              `Your bank total is ${bankTotal2}, you need at least ${tileArray[tileId].number} to bank this tile.`
            );
          }
        } else {
          alert(
            "You can't bank a tile after rolling again. You must return the tile at the top of your pile."
          );
        }
      }
    } else {
      //This is what happens if player has clicked "flip tile" button.
      //The tile is set to blue.
      this.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png");
      signal = 0;
    }
  }

  socket.on("bankTileReturn", function (data) {
    var tileId = data.tileId;
    var pile1 = data.pile1;
    var pile2 = data.pile2;
    var counter = data.counter;
    console.log("running");
    if (counter % 2 !== 0) {
      this.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png");
      var piles1 = pileOne.querySelectorAll("img");
      piles1[0].setAttribute("src", pile1[pile1.length - 1].img);
      piles1[0].setAttribute("data-id", tileId);
      piles1[0].addEventListener("click", returnSteal);
      piles1[0].setAttribute("class", "tile1");
    } else { 
      this.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png");
      var piles2 = pileTwo.querySelectorAll("img");
      piles2[0].setAttribute("src", pile2[pile2.length - 1].img);
      piles2[0].setAttribute("data-id", tileId);
      piles2[0].addEventListener("click", returnSteal);
      piles2[0].setAttribute("class", "tile1");
    }
  });

  function flipTile() {
    tilesArray.pop();
    const grid1 = document.querySelector(".grid1");
    const grid1pics = grid1.querySelectorAll("img");
    grid1pics[tilesArray.length].setAttribute(
      "src",
      "https://i.ibb.co/Cw6ySLH/blue.png"
    );
  }

  //Runs when player returns tile.
  returnTile = () => {
    const grid1pics1 = grid1.querySelectorAll("img");
    if (counter % 2 !== 0) {
      //This is player 1's go.
      var tile1Id = pile1[pile1.length - 1].position;
      const grid1pics1 = grid1.querySelectorAll("img");
      //"position" tells us the original position of the tile at the top of page.
      grid1pics1[tile1Id].setAttribute("src", tileArray[tile1Id].img);
      pile1.pop();
      //removes tile from players tile pile.
      var piles = pileOne.querySelectorAll("img");
      piles[0].setAttribute("src", pile1[pile1.length - 1].img);
      //updates the image show on top of players tile pile to the one that was 'beneath' the removed tile.
    } else {
      //This is player 2's go.
      var tile2Id = pile2[pile2.length - 1].position;
      grid1pics1[tile2Id].setAttribute("src", tileArray[tile2Id].img);
      pile2.pop();
      var piles2 = pileTwo.querySelectorAll("img");
      piles2[0].setAttribute("src", pile2[pile2.length - 1].img);
    }
    returnChecker = 1;
    rollCounter = emptyBank();
    flipTile();
  }

  //Runs when player steals a tile.
  function stealTile() {
    var piles1 = pileOne.querySelectorAll("img");
    var piles2 = pileTwo.querySelectorAll("img");
    if (counter % 2 !== 0) {
      //Player 1's go.
      var tile2Id = pile2[pile2.length - 1].position;
      if (bankTotal1 === tileArray[tile2Id].number) {
        piles1[0].setAttribute("src", tileArray[tile2Id].img);
        piles1[0].setAttribute("class", "tile1");
        piles1[0].addEventListener("click", returnSteal);
        //Updates player 1's pile.
        pile1.push(tileArray[tile2Id]);
        pile2.pop();
        piles2[0].setAttribute("src", pile2[pile2.length - 1].img);
      } else {
        alert(
          "You can only steal a tile when your bank total is exactly the same number as that tile."
        );
      }
    } else {
      //Player 2's go.
      var tile1Id = pile1[pile1.length - 1].position;
      if (bankTotal2 === tileArray[tile1Id].number) {
        piles2[0].setAttribute("src", tileArray[tile1Id].img);
        piles2[0].setAttribute("class", "tile1");
        piles2[0].addEventListener("click", returnSteal);
        pile2.push(tileArray[tile1Id]);
        pile1.pop();
        piles1[0].setAttribute("src", pile1[pile1.length - 1].img);
      } else {
        alert(
          "You can only steal a tile when your bank total is exactly the same number as that tile."
        );
      }
    }
    returnChecker = 1;
    rollCounter = emptyBank();
  }

  //Runs when player returns or steals a tile.
  function returnSteal() {
    if (signal2 === 0) {
      returnTile();
    } else {
      stealTile();
      signal2 = 0;
    }
    finish();
  }
});

const diceArray = [
  {
    number: 1,
    img: "https://i.ibb.co/vJQVCfz/one.png",
    roll: 0,
    name: "one",
    position: 0,
  },
  {
    number: 2,
    img: "https://i.ibb.co/3Y7wPzx/two.png",
    roll: 0,
    name: "two",
    position: 1,
  },
  {
    number: 3,
    img: "https://i.ibb.co/W5YwBh9/three.png",
    roll: 0,
    name: "three",
    position: 2,
  },
  {
    number: 4,
    img: "https://i.ibb.co/7XcszFf/four.png",
    roll: 0,
    name: "four",
    position: 3,
  },
  {
    number: 5,
    img: "https://i.ibb.co/4VzQqzr/five.png",
    roll: 0,
    name: "five",
    position: 4,
  },
  {
    number: 5,
    img: "https://i.ibb.co/r3LWB6p/worm.png",
    roll: 0,
    name: "worm",
    position: 5,
  },
];

var bank1 = [];
var bankTotal1 = 0;
var counter = 1;
var bank2 = [];
var bankTotal2 = 0;
var rollCounter = 0;
var rollAgain = 1;
var signal = 0;
var signal2 = 0;
var dicesArray = [];
var returnChecker = 0;
var rollCounter1;
var rollCounter2;
var pile1 = [{number: 0, img: "https://i.ibb.co/Cw6ySLH/blue.png", worms: 0}];
var pile2 = [{number: 0, img: "https://i.ibb.co/Cw6ySLH/blue.png", worms: 0}];
var finalScore1 = 0;
var finalScore2 = 0;
var tilesArray = [];
var socket = io();

//Turns score red when player 1 banks a worm.
function redScore1(total, name) {
  if (name === "worm") {
    var red = document.getElementById("score1number");
    red.setAttribute("class", "score1numberred");
    red.innerHTML = total;
  } else {
    document.getElementById("score1number").innerHTML = total;
  }
}

//Turns score red when player 2 banks a worm.
function redScore2(total, name) {
  if (name === "worm") {
    var red = document.getElementById("score2number");
    red.setAttribute("class", "score1numberred");
    red.innerHTML = total;
  } else {
    document.getElementById("score2number").innerHTML = total;
  }
}

//Runs when player banks a die.
function bankIt() {
  if (counter % 2 !== 0) {
    //Player 1's go.
    var lb1 = bank1.length;
    //Selects all images in player 1's dice area.
    var diceId = this.getAttribute("data-id");
    /*gets data-id of dice clicked. This data-id is set when the dice are rolled,
       and it is equal to it's index in diceArray.*/
    var diceId2 = this.getAttribute("data-id2");
    function bankDice1() {
      bank1.push(diceArray[diceId]);
      bank1[lb1].roll = rollCounter;
      bankTotal1 = bankTotal1 + diceArray[diceId].number;
      dicesArray[diceId2] = 0;
      socket.emit("bankIt", {
        dice: diceArray[diceId],
        counter: counter,
        bankLength: lb1,
        diceId2: diceId2,
        bankTotal: bankTotal1,
        bank: bank1,
      });
    }
    if (dicesArray[diceId2] !== 0) {
      if (rollCounter === 1) {
        //What happens if it is the first roll.
        if (bank1.length === 0) {
          //What happens if it is the first die the player is banking.
          //this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice1();
        } else if (bank1.includes(diceArray[diceId])) {
          //If it's still the first roll but not the first die being banked.
          //this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice1();
        } else {
          //First roll and player tries to bank a different die to one already banked.
          alert(`You can only bank another ${bank1[bank1.length - 1].name}.`);
        }
      } else if (bank1.includes(diceArray[diceId])) {
        if (bank1[bank1.length - 1].img === diceArray[diceId].img) {
          if (bank1[bank1.length - 1].roll === rollCounter) {
            this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
            bankDice1();
          } else {
            alert(
              `You already have ${
                bank1[bank1.length - 1].name
              } in your bank. You can't bank the same dice on two different rolls`
            );
          }
        } else {
          alert(
            `You already have ${diceArray[diceId].name} in your bank. You can't bank the same dice on two different rolls.`
          );
        }
      } else {
        if (bank1[bank1.length - 1].roll !== rollCounter) {
          this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice1();
        } else {
          alert(`You can only bank another ${bank1[bank1.length - 1].name}.`);
        }
      }
    } else {
      alert("You must click on a dice.");
    }
  } else {
    //Player 2's go.

    var diceId = this.getAttribute("data-id");
    lb2 = bank2.length;
    var diceId2 = this.getAttribute("data-id2");

    function bankDice2() {
      bank2.push(diceArray[diceId]);
      bank2[lb2].roll = rollCounter;
      bankTotal2 = bankTotal2 + diceArray[diceId].number;
      dicesArray[diceId2] = 0;
      socket.emit("bankIt", {
        dice: diceArray[diceId],
        counter: counter,
        bankLength: lb2,
        diceId2: diceId2,
        bankTotal: bankTotal2,
        bank: bank2,
      });
    }
    if (dicesArray[diceId2] !== 0) {
      if (rollCounter === 1) {
        if (bank2.length === 0) {
          this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice2();
        } else if (bank2.includes(diceArray[diceId])) {
          this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice2();
        } else {
          alert(`You can only bank another ${bank2[bank2.length - 1].name}.`);
        }
      } else if (bank2.includes(diceArray[diceId])) {
        if (bank2[bank2.length - 1].img === diceArray[diceId].img) {
          if (bank2[bank2.length - 1].roll === rollCounter) {
            this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
            bankDice2();
          } else {
            alert(
              `You already have ${
                bank2[bank2.length - 1].name
              } in your bank. You can't bank the same dice on two different rolls`
            );
          }
        } else {
          alert(
            `You already have ${diceArray[diceId].name} in your bank. You can't bank the same dice on two different rolls.`
          );
        }
      } else {
        if (bank2[bank2.length - 1].roll !== rollCounter) {
          this.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
          bankDice2();
        } else {
          alert(`You can only bank another ${bank2[bank2.length - 1].name}.`);
        }
      }
    } else {
      alert("You must click on a dice.");
    }
  }
  rollAgain = 1;
}

socket.on("bankReturn", function (data) {
  var dice = data.dice;
  var counter = data.counter;
  var bankLength = data.bankLength;
  var diceId2 = data.diceId2;
  var bank = data.bank;
  var bankTotal = data.bankTotal;
  if (counter % 2 !== 0) {
    const Bank1 = document.querySelector(".bank1");
    var dices1 = Bank1.querySelectorAll("img");
    dices1[bankLength].setAttribute("src", dice.img);
    var diceBoard = document.querySelector(".diceRoll");
    var dices = diceBoard.querySelectorAll("img");
    dices[diceId2].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    redScore1(bankTotal, dice.name);
  } else {
    const Bank2 = document.querySelector(".bank2");
    var dices2 = Bank2.querySelectorAll("img");
    dices2[bankLength].setAttribute("src", dice.img);
    var diceBoard = document.querySelector(".diceRoll");
    var dices = diceBoard.querySelectorAll("img");
    dices[diceId2].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    redScore2(bankTotal, dice.name);
  }
});

  //Rolls the dice.
  function roll() {
    if (rollCounter === 0) {
      //If it is the first roll
      dicesArray = [];
      rollCounter = rollCounter + 1;
      for (let i = 0; i < 8; i++) {
        var m = Math.floor(Math.random() * 6);
        dicesArray.push(diceArray[m]);
      }
      socket.emit("roll", {
        dicesArray: dicesArray,
      });
      //rollAgain ensures the player banks a die. 
      rollAgain = 0;
    } else {
      if (rollAgain === 1) {
        //rollAgain is set to 1 in the bankIt function.
        if (
          dicesArray.includes(bank1[bank1.length - 1]) ||
          dicesArray.includes(bank2[bank2.length - 1])
        ) {
          alert("You must take all dice of the same kind");
        } else {
          dicesArray = [];
          rollCounter = rollCounter + 1;
          l = bank1.length + bank2.length;
          for (let i = 0; i < 8 - l; i++) {
            var m = Math.floor(Math.random() * 6);
            dicesArray.push(diceArray[m]);
          }
          socket.emit("roll", {
            dicesArray: dicesArray,
          });
        }
        rollAgain = 0;
      } else {
        alert("You must bank a die.");
      }
    }
  var rollNumbers = [];
  dicesArray.forEach(element => rollNumbers.push(element.name))
  var bankNumbers = [];
  bank1.forEach(element => bankNumbers.push(element.name))
  bank2.forEach(element => bankNumbers.push(element.name))
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  } 
  uniqueRoll = rollNumbers.filter(onlyUnique)
  uniqueBank = bankNumbers.filter(onlyUnique) 
  
  var allSame = uniqueRoll.filter(element => uniqueBank.includes(element))
  console.log(uniqueBank)
  console.log(uniqueRoll)
  console.log(allSame)

  setTimeout(checkIf,1000)
  function checkIf() {if (allSame.length === uniqueRoll.length){
    alert("You cant pick up any of these dice, they are all already in your bank. Please return your tile.") 
    if((counter%2 !== 0 && pile1.length === 1) || counter%2 === 0 && pile2.length === 1){
      finish()
    }
  }}
  }

socket.on("rollreturn", function (data) {
  var dicesArray3 = data.dicesArray2;
  var diceBoard = document.querySelector(".diceRoll");
  var dices = diceBoard.querySelectorAll("img");
  l = dicesArray3.length;
  for (let i = 0; i < 8; i++) {
    if (i < l) {
      dices[i].setAttribute("src", dicesArray3[i].img);
      dices[i].setAttribute("class", "dice");
      dices[i].setAttribute("data-id", dicesArray3[i].position);
      dices[i].setAttribute("data-id2", i);
      dices[i].addEventListener("click", bankIt);
    } else {
      dices[i].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    }
  }
});

function emptyBank() {
  if (bank1.length === 0) {
    return (rollCounter2 = bank2[bank2.length - 1].roll);
  } else {
    return (rollCounter1 = bank1[bank1.length - 1].roll);
  }
}

function finish() {
  if (counter % 2 !== 0) {
    if (
      pile1.length === 1 ||
      (returnChecker === 1 && rollCounter === emptyBank())
    ) {
      bank1 = [];
      counter++;
      bankTotal1 = 0;
      rollCounter = 0;
      rollAgain = 1;
      returnChecker = 0;
      socket.emit("clearBank", {
        counter: counter,
      });
    } else {
      alert("You must return the tile at the top of your pile.");
    }
  } else {
    if (
      pile2.length === 1 ||
      (returnChecker === 1 && rollCounter === emptyBank())
    ) {
      bank2 = [];
      counter++;
      bankTotal2 = 0;
      rollCounter = 0;
      rollAgain = 1;
      returnChecker = 0;
      socket.emit("clearBank", {
        counter: counter,
      });
    } else {
      alert("You must return the tile at the top of your pile.");
    }
  }
}

socket.on("clearBankReturn", function (data) {
  counter = data.counter;
  redScore1(0, "notWorm");
  redScore2(0, "notWorm");
  document.getElementById("score1number").setAttribute("class", "score1number");
  document.getElementById("score2number").setAttribute("class", "score1number");
  for (let i = 0; i < 8; i++) {
    const bank1f = document.querySelector(".bank1");
    var clear = bank1f.querySelectorAll("img");
    clear[i].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    const dicef = document.querySelector(".diceRoll");
    var cleard = dicef.querySelectorAll("img");
    cleard[i].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    const bank2f = document.querySelector(".bank2");
    var clear2 = bank2f.querySelectorAll("img");
    clear2[i].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
  }
});

function sign() {
  signal = 1;
}

function signTwo() {
  signal2 = 1;
}

function finishGame() {
  for (let i = 0; i < pile1.length; i++) {
    finalScore1 = finalScore1 + pile1[i].worms;
  }
  for (let i = 0; i < pile2.length; i++) {
    finalScore2 = finalScore2 + pile2[i].worms;
  }
  function winner(player1, player2) {
    if (player1 > player2) {
      return "Player 1 wins!";
    } else if (player1 < player2) {
      return "Player 2 wins!";
    } else {
      return "It's a tie!";
    }
  }
  alert(
    `Player 1 has ${finalScore1} worms, Player 2 has ${finalScore2} worms. ${winner(
      finalScore1,
      finalScore2
    )}`
  );
}
