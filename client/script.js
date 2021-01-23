document.addEventListener("DOMContentLoaded", () => { 
    tileArray = [
        {
            number: 21,
            position: 0,
            worms: 1,
            img: "https://i.ibb.co/D11CHjn/Tile21.png",
        }, {
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
    ]
    
    
    topTiles = document.getElementById("top-tiles");
    pileLeft = document.getElementById("tile-left");
    pileRight = document.getElementById("tile-right");
    bankLeft = document.getElementById("bank-left");
    bankMiddle = document.getElementById("bank-middle");
    bankRight = document.getElementById("bank-right"); 
    leftScore = document.getElementById("score1number");
    rightScore = document.getElementById("score2number");
    playerBanks = [bankLeft,bankRight];
    playerPiles = [pileLeft,pileRight];
    banks = [bankLeft, bankMiddle, bankRight];
    scores = [leftScore,rightScore];
    j=0; 

//Creates the line of tiles at top of page. 
tileArray.forEach(element => { 
   let tile = document.createElement("img");
   tile.setAttribute("src", element.img);
   topTiles.appendChild(tile);
   tile.setAttribute("class", "tile");
   tile.setAttribute("data-id",j);
   tile.addEventListener("click", clickTile)
   j++;
})

//Creates divs to put the pictures of dice into.
const createBankDivs = (bank) => {
    for(let i=0; i<8; i++) {
        let div=document.createElement("div");   
        banks[bank].appendChild(div);
        div.setAttribute("class","dice-div");
        div.setAttribute("id",`${i}`);
    } 
}

//Puts blue pictures into the divs created in createBankDivs. 
bluePics = (bank) => { 
    let divs = banks[bank].querySelectorAll("div");
    for(let i=0; i<8; i++) {
        let dice = document.createElement("img");
        divs[i].appendChild(dice);
        dice.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
        dice.setAttribute("class","dice");
        dice.setAttribute("data-id", i);
        dice.addEventListener("click",entireGo)
    }
}

//Calls createBankDivs and bluePics for each of the three banks.
for(let i=0;i<3;i++){
    createBankDivs(i);
    bluePics(i);
}

//Puts a blue picture in to the div where the players banked tiles will appear.
const createPiles = (pile) => {
  let pilePic = playerPiles[pile];
  let pic=document.createElement("img");
  pilePic.appendChild(pic);
  pic.setAttribute("src", "https://i.ibb.co/Cw6ySLH/blue.png")
  pic.setAttribute("class","pile");
  pic.addEventListener("click", clickPile)
}

//Calls createPiles for both players piles. 
for(let i=0;i<2;i++) {
  createPiles(i);
}

})

const socket = io();
let playerBank = [];
let playerOnePile = [];
let playerTwoPile = []; 
let pileOneTwo = [playerOnePile,playerTwoPile];
let turn=0; 
let b=0;

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
 
//Displays d images of random dice in the middle bank.
const roll = () => {
    let d = 8-b;
    let currentDice = [];
    for(let i=0; i<d;i++){
      let m=Math.floor(Math.random()*6);
      currentDice.push(diceArray[m]);
    }
    socket.emit("roll", {
      currentDice: currentDice,
    });
}

//Displays dice roll on all screens connected to the website.
socket.on("rollreturn", function (data) {
  let currentDiceReturn = data.currentDiceReturn;
  let bankMiddlePics = bankMiddle.querySelectorAll("img");
  bankMiddlePics.forEach(pic => {
    pic.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
  })
  let i=0;
  currentDiceReturn.forEach(dice => {
  bankMiddlePics[i].setAttribute("src",dice.img)
  i++;
  })
})

//emits data of die to move and where to move it to, to node server.
const moveDie = (die, id) => {
  playerBank.push(die);
  b++;
  socket.emit("moveDie", {
    info: [die, id, playerBank],
  });
}

//Does the mechanics of moving a die from the middle bank to one of the two players.
socket.on("moveDieReturn", function (data) {
  let info = data.info;
  let die  = info[0];
  let id = info[1];
  let playerBank = info[2];
  let playerBankLength = playerBank.length-1;
  let bank = playerBanks[turn];
  let bankMiddlePics = bankMiddle.querySelectorAll("img");
  bankMiddlePics[id].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
  bankImg = bank.querySelectorAll("img");
  bankImg[playerBankLength].setAttribute("src",die.img);
  let score = scores[turn];
  let bankNumbers = playerBank.map(die => {
    return die.number;
  })
  let total = bankNumbers.reduce((acc,die) => {
    return acc + die;
  })
  score.innerHTML = total;
})

//Runs when user clicks on die. Gets data of dice clicked and feeds it into moveDie.
function entireGo() {
  let diceId=this.getAttribute("data-id");
  let image=this.getAttribute("src");
  let die=diceArray.find(die => die.img===image);
  moveDie(die,diceId);
}

//emits data of tile to move to node server.
const moveTile = (tile, id) => {
  socket.emit("moveTile", {
    info: [tile, id],
  });
}

//Does the mechanics of moving the tile to the correct players tile.
socket.on("moveTileReturn", function (data) {
  let info = data.info;
  let tile = info[0];
  let id = info[1];
  let topTilesPics=topTiles.querySelectorAll("img");
  topTilesPics[id].setAttribute("src","https://i.ibb.co/Cw6ySLH/blue.png")
  let pile=playerPiles[turn];
  pile=pile.querySelectorAll("img");
  pile[0].setAttribute("src",tile.img); 
  pileOneTwo[turn].unshift(tile);
  console.log(pileOneTwo[turn]);
})

//Runs when user clicks on tile. Gets data of tile clicked and feeds it into moveTile.
function clickTile() {
  let tileId = this.getAttribute("data-id");
  let image = this.getAttribute("src");
  let tile = tileArray.find(tile => tile.img===image);
  moveTile(tile,tileId);
}

//Runs when a player clicks button "end turn", it changes the variable turn, and emits a
//message to node server that triggers all images of dice to be set to blue.
const changeTurn = turnCheck => { 
  if (turnCheck === 0){
    turn = 1;
  } else {
    turn = 0;
  }
  //playerBank = [];
  socket.emit("blueDice", {
    turn: turn
  })
}

//Sets all images of dice to blue.
socket.on("blueDiceReturn", function(data) {
  let turnReturn = data.turn;
  turn = turnReturn;
  playerBank=[];
  let score = scores[Math.abs(turn-1)]; 
  score.innerHTML = 0;
  banks.forEach(bank => {
    let bankPics = bank.querySelectorAll("img");
    bankPics.forEach(pic => {
      pic.setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
    })
})
  b=0;
}) 

function clickPile() {
  console.log("hello")
  let topTile = pileOneTwo[turn][0];
  socket.emit("returnTile", { 
    topTile: topTile,
  })
} 

socket.on("returnTileReturn", function(data) {
  let topTile = data.topTile;
  let topTilesImgs = topTiles.querySelectorAll('img');
  topTilesImgs[topTile.position].setAttribute("src",topTile.img);
  pileOneTwo[turn].shift(); 
  let pile=playerPiles[turn];
  pile=pile.querySelectorAll("img");
  if(pileOneTwo[turn].length){
    pile[0].setAttribute("src",pileOneTwo[turn][0].img);
  } else {
    pile[0].setAttribute("src","https://i.ibb.co/Cw6ySLH/blue.png");
  }
})

//Just figuring out git hub
