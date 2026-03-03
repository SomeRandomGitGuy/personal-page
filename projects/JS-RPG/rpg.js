// RPG in javascript

let prompt = document.querySelector(".prompt");
let dir = document.querySelector(".dir");

const canv = document.querySelector(".canv");
let ctx = canv.getContext("2d");
const dpr = window.devicePixelRatio;
const rect = canv.getBoundingClientRect();
canv.width = 200;
canv.height = 200;

ctx.font = "20px serif";
ctx.fillStyle = "white";
let mapar = [];

let talks = 0;
let messages = [
  "Why are you here?",
  "Shush",
  "Can you stop bugging me?",
  "oshan is here!",
  "haha just kidding youre stoopi",
  undefined,
  undefined,
  undefined,
  "or... is it?",
  "byee!",
  "there are ZERO other commands that work AHHAHA",
  "pls dont try `zpqzpq`",
];

Object.defineProperty(window, "hi", {
  get() {
    console.log(messages[talks]);
    talks++;
  },
});
Object.defineProperty(window, "zpqzpq", {
  get() {
    console.log("maybe the real stoopi was you! 🤣🫵");
  },
});

for (let o = 0; o < 10; o++) {
  mapar[o] = [];
  for (let p = 0; p < 10; p++) {
    mapar[o][p] = "î";
  }
}

mapar[4][9] = "o";
mapar[4][8] = "||";
mapar[4][7] = "||";
mapar[4][6] = "⌂";
mapar[4][5] = "||";
mapar[4][4] = "∆";
mapar[3][6] = "⌂";
mapar[2][6] = "o";
mapar[5][6] = "⌂";
let backup = JSON.parse(JSON.stringify(mapar));

let mappings = {
  start: [4, 9],
  path: [4, 8],
  path2: [4, 7],
  vilC: [4, 6],
  vilL: [3, 6],
  vilR: [5, 6],
  warn: [4, 5],
  vilL2: [2, 6],
  caveEnt: [4, 4],
  cave2: [4, 4],
  caveL: [4, 4],
  caveL2: [4, 4],
  caveL3: [4, 4],
  caveF: [4, 4],
  caveF2: [4, 4],
  caveR: [4, 4],
  caveR2: [4, 4],
  caveR3: [4, 4],
  caveR4: [4, 4],
  esc2: [2, 5],
  esc3: [2, 4],
  portal: [2, 3],
};

function rendMap() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let i = 0; i < 10; i++) {
    for (let o = 0; o < 10; o++) {
      if (mapar[i][o] === "~") {
        ctx.fillStyle = "#0d75d1";
      } else if (mapar[i][o] === "î") {
        ctx.fillStyle = "green";
      } else if (mapar[i][o] === "||" || mapar[i][o] === "o" || mapar[i][o] === "=") {
        ctx.fillStyle = "#719409";
      } else if (mapar[i][o] === "∆") {
        ctx.fillStyle = "grey";
      } else if (mapar[i][o] === "⌂") {
        ctx.fillStyle = "#f5e58e";
      } else if (mapar[i][o] === "V") {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "white";
      }
      console.log(ctx.fillStyle);
      if (mapar[i][o] != ".") ctx.fillText(mapar[i][o], i * 20 + 10, o * 20);
    }
  }
}

let currentplace = "start";
let action = "normal";

let beento = [];

let oldprom = "";

let tsincep = Date.now();

let prompts = {
  start: "You find yourself in a forest covered with fog. The air is thick with the smell of soil",
  path: "You see a long path ahead, with only the way forward. The dirt path is overgrown and looks unused",
  path2: "The path continues, with thick trees on each side of the path, towering over you",
  vilC: "You arrive at a quaint little town, in the marketplace centre. Nobody is at the market stalls",
  vilL: "You arrive at a secluded little farm. It looks empty beside from the warm glow coming from one of the windows",
  vilL2: "You climb over a hedge into a magical garden, with a glowing sword on a pedestal. You pick it up",
  vilR: "You arrive at a clearing with a small cottage. You can see an old woman out the front, on a rocking chair",
  warn: "You see a sign warning of dangerous monsters",
  caveEnt: "You arrive at the mouth of a foreboding cave, with stalactites that look like the teeth in the jaws of a dragon",
  cave2: "You venture deeper into the cave... the sound of dripping water echoes around you. There are three caves to continue into...",
  caveL: "The cave is dark, and keeps going",
  caveL2: "The cave is dark, and keeps going. The air is cold",
  caveL3: "You reach a dead end. Youll have to turn back...",
  caveF: "The cave opens up into a large cavern, with glowing fungi. You need to talk to the old woman to continue",
  caveF2: "You find a prize pumpkin on the floor!",
  caveR: "The cave narrows and you a blocked by a gate, requiring a key",
  caveR2: "The cave is lit by dim hanging lanterns",
  caveR3: "You find a goblin with a sword. You need a weapon to fight him",
  caveR4:
    "You managed to kill the goblin, and enter a room with a special smokey orb...<br>The orb was using magic to keep you here, by hiding the exit with all the fog<br>You see a little engraving of a sparkling pumpkin on the side...<br><br>You smash the orb, and the fog disappears from the town",
  esc1: "With the fog cleared, you can see a way out of the forest ahead.",
  esc2: "The forest is now lush and green",
  esc3: "You can see some sort of... portal in the distance",
  portal: "You reach the portal and can finally escape from this accursed place<br><br>You win! 🏆🥇🎖️🏅✨🍻👍",
};

let options = {
  start: ["Move", "Talk", "Fight", "View inventory", "View Map"],
  move: ["Forward", "Left", "Right", "Backward", "Return"],
};

let dialogue = {
  vilR: "Old Woman: Greetings traveller, i have not seen you in these parts before. Someone has stolen my prized pumpkin, would be be able to find it? <br>I think i last saw it in the cave to the north of the market...",
};

let properties = {
  gotPumpkin: false,
  goblinKilled: false,
  orbDest: false,
};

let pickup = {
  caveF2: "Pumpkin",
  vilL2: "Sword",
};

let movement = {
  // Forward, Left, Right, Backward
  start: ["path", "-", "-", "-"],
  path: ["path2", "-", "-", "start"],
  path2: ["vilC", "-", "-", "path"],
  vilC: ["warn", "vilL", "vilR", "path2"],
  vilL: ["-", "vilL2", "vilC", "-"],
  vilL2: ["-", "-", "vilL", "-"],
  vilR: ["-", "vilC", "-", "-"],
  warn: ["caveEnt", "-", "-", "vilC"],
  caveEnt: ["cave2", "-", "-", "warn"],
  cave2: ["caveF", "caveL", "caveR", "caveEnt"],
  caveL: ["-", "caveL2", "cave2", "-"],
  caveR: ["-", "cave2", "-", "-"],
  caveR2: ["caveR3", "-", "-", "caveR"],
  caveR3: ["-", "-", "-", "caveR2"],
  caveR4: ["-", "-", "-", "caveR3"],
  caveF: ["-", "-", "-", "cave2"],
  caveF2: ["-", "-", "-", "caveF"],
  caveL2: ["-", "caveL3", "caveL", "-"],
  caveL3: ["-", "-", "caveL2", "-"],
  esc1: ["-", "esc2", "warn", "-"],
  esc2: ["esc3", "-", "esc1", "-"],
  esc3: ["portal", "-", "-", "esc2"],
  portal: ["-", "-", "-", "esc3"],
};

let inventory = {};

function gameLoop() {
  let tprompt = "";
  if (tprompt != oldprom) {
    tsincep++;
  } else {
    tsincep = 0;
  }
  tprompt = prompts[currentplace];

  let dirstring = "You can move: ";
  if (movement[currentplace][0] != "-") dirstring += "↑";
  if (movement[currentplace][1] != "-") dirstring += "←";
  if (movement[currentplace][2] != "-") dirstring += "→";
  if (movement[currentplace][3] != "-") dirstring += "↓";
  dir.innerHTML = dirstring;

  if (pickup.hasOwnProperty(currentplace)) {
    inventory[pickup[currentplace]] = 1;
    delete pickup[currentplace];
  }

  if (currentplace === "caveR") {
    if (inventory.hasOwnProperty("Key")) {
      delete inventory["Key"];
    }
  }

  if (currentplace === "caveR4") {
    properties.orbDest = true;
    movement.warn[1] = "esc1";
    mapar[3][5] = "=";
    backup[3][5] = "=";
    mappings.esc1 = [3, 5];
    mapar[2][5] = "||";
    backup[2][5] = "||";
    mapar[2][4] = "||";
    backup[2][4] = "||";
    mapar[2][3] = "x";
    backup[2][3] = "x";
  }
  if (action === "mapping") {
    prompt.style.display = "none";
    canv.style.display = "block";
    rendMap();
  } else {
    prompt.style.display = "block";
    canv.style.display = "none";
  }

  if (action === "fighting" && currentplace === "caveR3" && "Sword" in inventory) {
    prompts.caveR3 = "You killed the goblin";
    movement.caveR3[0] = "caveR4";
  }
  if (action === "fighting" && currentplace === "vilR" && "Sword" in inventory) {
    prompts.vilR = "You dare fight the old woman, and she almost kills you and leaves you unable to escape...";
    movement.vilR[1] = "-";
  }

  mapar[mappings[currentplace][0]][mappings[currentplace][1]] = "V";

  if (action === "talking" && dialogue.hasOwnProperty(currentplace)) {
    if (currentplace === "vilR") {
      movement["caveF"][0] = "caveF2";
      prompts["caveF"] = "The cave opens up into a large cavern, with glowing fungi. You may continue";
    }
    tprompt = dialogue[currentplace];
    if ((inventory.hasOwnProperty("Pumpkin") && currentplace === "vilR") || properties.gotPumpkin) {
      tprompt = "Thank you for finding my pumpkin! Here is a key for your efforts";
      delete inventory["Pumpkin"];
      properties.gotPumpkin = true;
      inventory["Key"] = 1;
      prompts.caveR = "The gate unlocks using your key!";
      movement.caveR[0] = "caveR2";
    }
  }
  if (action === "inventory") {
    if (Object.keys(inventory).length < 1) {
      tprompt = "You have no items in your inventory";
    } else {
      let stringprom = "You have: <br>";
      for (prop in inventory) {
        stringprom += inventory[prop].toString() + " " + prop + "<br>";
      }
      tprompt = stringprom;
    }
  }

  if (tprompt != oldprom) {
    tsincep = Date.now();
  }
  let c = 0;
  let tstring = "​";
  for (let char of tprompt) {
    if (10 * c < Date.now() - tsincep) {
      tstring += char;
    }
    c++;
  }
  if (10 * tprompt.length < Date.now() - tsincep) {
    if (!beento.includes(currentplace)) {
      beento.push(currentplace);
    }
  }
  if (beento.includes(currentplace) && action != "talking") {
    tstring = tprompt;
  }
  prompt.innerHTML = tstring;
  oldprom = tprompt;
}

document.body.onkeydown = (e) => {
  switch (e.key) {
    case "w":
      if (movement[currentplace][0] != "-") {
        action = "normal";
        mapar[mappings[currentplace][0]][mappings[currentplace][1]] = backup[mappings[currentplace][0]][mappings[currentplace][1]];
        currentplace = movement[currentplace][0];
      }
      break;
    case "a":
      if (movement[currentplace][1] != "-") {
        action = "normal";
        mapar[mappings[currentplace][0]][mappings[currentplace][1]] = backup[mappings[currentplace][0]][mappings[currentplace][1]];
        currentplace = movement[currentplace][1];
      }
      break;
    case "d":
      if (movement[currentplace][2] != "-") {
        action = "normal";
        mapar[mappings[currentplace][0]][mappings[currentplace][1]] = backup[mappings[currentplace][0]][mappings[currentplace][1]];
        currentplace = movement[currentplace][2];
      }
      break;
    case "s":
      if (movement[currentplace][3] != "-") {
        action = "normal";
        mapar[mappings[currentplace][0]][mappings[currentplace][1]] = backup[mappings[currentplace][0]][mappings[currentplace][1]];
        currentplace = movement[currentplace][3];
      }
      break;
    case "t":
      action = "talking";
      break;
    case "f":
      action = "fighting";
      break;
    case "e":
      action = "inventory";
      break;
    case "m":
      action = "mapping";
      break;
    case " ":
      action = "normal";
      break;
  }
};

gameLoop();

setInterval(gameLoop, 1);
