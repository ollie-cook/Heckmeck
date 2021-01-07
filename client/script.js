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
    pileOne = document.getElementById("tile-left");
    pileTwo = document.getElementById("tile-right");
    bankLeft = document.getElementById("bank-left");
    bankMiddle = document.getElementById("bank-middle");
    bankRight = document.getElementById("bank-right"); 

//Creates the line of tiles at top of page. 
tileArray.forEach(element => { 
   let tile = document.createElement("img");
   tile.setAttribute("src", element.img);
   topTiles.appendChild(tile);
   tile.setAttribute("class", "tile");
})


//Creates divs to put the pictures of dice into.
banks = [bankLeft, bankMiddle, bankRight] 
const createBankDivs = (bank) => {
    for(let i=0; i<8; i++) {
        let div=document.createElement("div");   
        banks[bank].appendChild(div);
        div.setAttribute("class","dice-div");
        div.setAttribute("id",`${i}`);
    } 
}

//Puts blue pictures into the divs. 
const createBanks = (bank) => {
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

//Calls the two above functions.
for(let i=0;1<2;i++){
    createBankDivs(i)
    createBanks(i);
}

})

const socket = io();
let playerBank = [];
let turn=0;

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
const roll = (d) => {
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
  let i=0;
  currentDiceReturn.forEach(dice => {
  bankMiddlePics[i].setAttribute("src",dice.img)
  i++;
  })
})

//Does the mechanics of moving a die from the middle bank to one of the two players.
//turn is 0 if it is player 1's go, or 1 if it is player 2's go.
const moveDie = (turn, die, id, playerBankLength) => {
  socket.emit("moveDie", {
    info: [die, id,playerBankLength],
  });
}

socket.on("moveDieReturn", function (data) {
  let info = data.info;
  let die  =info[0];
  let id = info[1];
  let playerBankLength = info[2];
  const playerBanks = [bankLeft, bankRight];
  let bank = playerBanks[turn];
  //console.log(bank);
  let bankMiddlePics = bankMiddle.querySelectorAll("img");
  bankMiddlePics[id].setAttribute("src", "https://i.ibb.co/gvGMJqW/blueDice.jpg");
  bankImg = bank.querySelectorAll("img");
  bankImg[playerBankLength].setAttribute("src",die.img);
})

//Runs when user clicks on die. 
function entireGo() {
  let diceId=this.getAttribute("data-id");
  let image=this.getAttribute("src");
  let die=diceArray.find(die => die.img===image);
  playerBank.push(die); 
  playerBankLength = playerBank.length-1;
  moveDie(turn,die,diceId,playerBankLength);
}


