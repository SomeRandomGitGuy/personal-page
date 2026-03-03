let kdoms = [];
let YEAR = 0;
let MONTH = 1;
const seasons = [
  "Mid Summer 🌻",
  "Late Summer 🌻",
  "Early Autumn 🍂",
  "Mid Autumn 🍂",
  "Late Autumn 🍂",
  "Early Winter 🌨️",
  "Mid Winter 🌨️",
  "Late Winter 🌨️",
  "Early Spring 🌷",
  "Mid Spring 🌷",
  "Late Spring 🌷",
  "Early Summer 🌻",
];
const conditions = [130, 120, 50, 20, 50, 120, 130, 120, 50, 20, 50, 120];

let worldharshness = 0;

const consumpt = 84; // 3 meals x 7 days x 4 weeks = one month of meals

let mapar = [];

const biomes = ["î", "#", "~", "∆", "◠"];

const seed = newran(200) - 100;

for (let o = 0; o < 100; o++) {
  mapar[o] = [];
  for (let p = 0; p < 100; p++) {
    mapar[o][p] = ".";
    if (newran(60) === 1) {
      mapar[o][p] = biomes[newran(5)];
      if (mapar[o][p] === "◠" && newran(10) < 8) {
        mapar[o][p] = biomes[newran(3)];
      }
      if (mapar[o][p] === "∆" && newran(2) === 1) {
        mapar[o][p] = biomes[newran(3)];
      }
      if (mapar[o][p] === "~" && newran(4) === 1) {
        mapar[o][p] = "#";
      }
      if (mapar[o][p] === "#" && newran(4) === 1) {
        mapar[o][p] = "î";
      }
    }
  }
}
let used = [];
function voronoi() {
  for (let v = 0; v < 2000; v++) {
    let temppos = { X: newran(100), Y: newran(100) };
    if (biomes.includes(mapar[temppos.X][temppos.Y]) === true && used.some((e) => e.X === temppos.X && e.Y === temppos.Y) === false) {
      try {
        used.push(temppos);

        if (mapar[temppos.X - 1][temppos.Y] === ".") mapar[temppos.X - 1][temppos.Y] = mapar[temppos.X][temppos.Y];
        if (mapar[temppos.X + 1][temppos.Y] === ".") mapar[temppos.X + 1][temppos.Y] = mapar[temppos.X][temppos.Y];
        if (mapar[temppos.X][temppos.Y - 1] === ".") mapar[temppos.X][temppos.Y - 1] = mapar[temppos.X][temppos.Y];
        if (mapar[temppos.X][temppos.Y + 1] === ".") mapar[temppos.X][temppos.Y + 1] = mapar[temppos.X][temppos.Y];
        //mapar[temppos.X][temppos.Y] = "*";
        continue;
      } catch {
        //console.log(temppos);
      }
    } else {
      continue;
    }
  }
}

let histroeis = [];
const vowels = ["a", "o", "e", "i", "u", "ä", "ö"];
let mtext = document.querySelector(".mont");
const canv = document.querySelector(".canv");
let ctx = canv.getContext("2d");
const dpr = window.devicePixelRatio;
const rect = canv.getBoundingClientRect();
canv.width = rect.width * dpr;
canv.height = rect.height * dpr;

ctx.font = "20px serif";
ctx.fillStyle = "white";

const conso = ["qu", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

const textstuff = document.querySelector(".info");

const species = ["Snails", "Gnomes", "Mushrooms"];

const snailnames = ["Snailbert", "Snolbert", "Snaileroma"];
const gnomenames = ["Gnomgomery", "Gnomerald", "Gnomalie"];
const mushnames = ["Mushroomy", "Mushroh", "Mushrothew"];

function newName() {
  let tempname = "";
  for (let i = 0; i < 1 + newran(3); i++) {
    if (i === 0) {
      tempname += vowels[newran(vowels.length)].toUpperCase();
    } else {
      tempname += vowels[newran(vowels.length)];
    }
    if (newran(2) === 1) {
      tempname += vowels[newran(vowels.length)];
    }
    tempname += conso[newran(conso.length)];
  }
  return tempname;
}

function newran(range) {
  return Math.floor(Math.random() * range);
}

function newKingdom(age) {
  let tempjobs = ["Blacksmith", "Fisher", "Butcher", "Miner"];
  kdoms.push([]);
  let tempindex = kdoms.length - 1;
  kdoms[kdoms.length - 1].King = [];
  kdoms[tempindex].King.KSpecies = species[newran(3)];
  kdoms[tempindex].Events = [];
  kdoms[tempindex].Supplies = [];
  kdoms[tempindex].Supplies.LFood = 0;
  kdoms[tempindex].Supplies.DeltaFood = 0;

  kdoms[tempindex].Pos = [];
  kdoms[tempindex].Pos.KX = newran(100);
  kdoms[tempindex].Pos.KY = newran(100);

  let tmpsp = kdoms[tempindex].King.KSpecies;

  kdoms[kdoms.length - 1].Age = age;
  kdoms[tempindex].Civtype = "Town";
  kdoms[tempindex].Popul = newran(20) + 30;
  kdoms[tempindex].Relations = [];
  kdoms[tempindex].Jobs = [];
  kdoms[tempindex].Jobs.Farmers = Math.floor(kdoms[tempindex].Popul * 0.55);
  kdoms[tempindex].Jobs.Children = Math.floor(kdoms[tempindex].Popul * 0.1);
  kdoms[tempindex].Jobs.Workers = Math.floor(kdoms[tempindex].Popul * 0.3);
  kdoms[tempindex].Jobs.Nobility = Math.floor(kdoms[tempindex].Popul * 0.05);
  kdoms[tempindex].Jobs.Farmers +=
    kdoms[tempindex].Popul - (kdoms[tempindex].Jobs.Farmers + kdoms[tempindex].Jobs.Children + kdoms[tempindex].Jobs.Workers + kdoms[tempindex].Jobs.Nobility);

  kdoms[tempindex].People = [];
  for (let repet = 0; repet < kdoms[tempindex].Jobs.Farmers; repet++) {
    kdoms[tempindex].People.push({ Name: newName(), Job: "Farmer", Age: newran(60) + 20 });
  }
  for (let repet = 0; repet < kdoms[tempindex].Jobs.Children; repet++) {
    kdoms[tempindex].People.push({ Name: newName(), Job: "Child", Age: newran(11) + 1 });
  }
  for (let repet = 0; repet < kdoms[tempindex].Jobs.Workers; repet++) {
    kdoms[tempindex].People.push({ Name: newName(), Job: tempjobs[newran(tempjobs.length)], Age: newran(60) + 20 });
  }
  for (let repet = 0; repet < kdoms[tempindex].Jobs.Nobility; repet++) {
    kdoms[tempindex].People.push({ Name: newName(), Job: "Noble", Age: newran(60) + 20 });
  }

  kdoms[tempindex].King.KName = "King " + kdoms[tempindex].People[kdoms[tempindex].People.length - 1].Name;

  console.log(kdoms[tempindex].Jobs);
  kdoms[tempindex].Supplies.SFood = newran(50) + kdoms[tempindex].Popul * 84 * 1.2;

  let tempname = newName();

  kdoms[tempindex].Name = `${kdoms[tempindex].Civtype} of ${tempname}`;
  kdoms[tempindex].ShorNam = tempname;
  mapar[kdoms[tempindex].Pos.KX][kdoms[tempindex].Pos.KY] = kdoms[tempindex].ShorNam[0];
  kdoms[kdoms.length - 1].Elem = document.createElement("p");
  kdoms[kdoms.length - 1].Title = document.createElement("h3");
  kdoms[kdoms.length - 1].Holder = document.createElement("div");
  textstuff.appendChild(kdoms[tempindex].Holder);
  kdoms[tempindex].Holder.className = "itemthing";
  kdoms[tempindex].Holder.appendChild(kdoms[tempindex].Title);
  kdoms[tempindex].Holder.appendChild(kdoms[tempindex].Elem);
}

function generatekdoms() {
  for (let i = 0; i < newran(5) + 4; i++) {
    newKingdom(newran(15));
  }
}

function fancymaths(pos1, pos2) {
  return Math.floor(Math.hypot(pos1.KX - pos2.KX, pos1.KY - pos2.KY));
}

function updateKniGNONIMDWS() {
  MONTH++;
  if (MONTH > 12) {
    MONTH = 1;
    YEAR++;
    console.log(kdoms);
    for (q of kdoms) {
      q.Age++;
    }
  }

  for (let thing of kdoms) {
    // Update stuff

    thing.Supplies.SFood -= consumpt * (thing.Popul - thing.Jobs.Children);
    let foodneccesary = (consumpt * (thing.Popul - thing.Jobs.Children)) / thing.Jobs.Farmers;
    thing.Supplies.SFood += thing.Jobs.Farmers * foodneccesary + (newran(200) - (conditions[MONTH - 1] + newran(30)));
    thing.Supplies.SFood -= worldharshness;

    thing.Supplies.SFood = Math.ceil(thing.Supplies.SFood);

    thing.Popul = thing.People.length;
    if (thing.Popul < 1) {
      eventCreator(`The ${thing.Name} has fallen`, "purple");
      thing.Elem.remove();
      thing.Title.remove();
      thing.Holder.remove();
      kdoms.splice(kdoms.indexOf(thing), 1);
    }



    for (let pers of thing.People) {
      if (MONTH === 1) {
        pers.Age++;
        if (pers.Age > 60 && newran(100) === 1) {
          thing.People.splice(thing.People.indexOf(pers), 1);
        }

      }
    }

    /*
    if (thing.Supplies.SFood > consumpt * (thing.Popul - thing.Jobs.Children + 1)) {
      if (newran(Math.ceil(10 - thing.Popul / 20)) === 1) {
        thing.People.push({ Name: newName(), Job: "Child", Age: newran(11) + 1 });
        thing.Popul++;
      }
    }
    */

    if (thing.Supplies.SFood < 1) {
      thing.Supplies.SFood = 0;
    }
    thing.Supplies.DeltaFood = thing.Supplies.SFood - thing.Supplies.LFood;

    if (thing.Relations.length != kdoms.length - 1) {
      for (let h = 0; h < kdoms.length; h++) {
        if (h >= thing.Relations.length && kdoms[h] != thing) {
          thing.Relations.push([]);
          thing.Relations[thing.Relations.length - 1].Thoughts = 50;
          thing.Relations[thing.Relations.length - 1].RName = kdoms[h].ShorNam;
          thing.Relations[thing.Relations.length - 1].RDist = fancymaths(kdoms[h].Pos, thing.Pos);
        }
      }
    }

    let newtext = "";
    for (item of thing.Relations) {
      newtext = newtext + item.RName + ": " + item.Thoughts + "<br>";
    }

    if (thing.Supplies.SFood - consumpt * (thing.Popul - thing.Jobs.Children) < 0) {
      if (histroeis.length > 0) {
        let found = false;
        for (let lem of histroeis) {
          //let section1 = lem.innerHTML[lem.innerHTML.indexOf("Year") + 5];
          //let section2 = lem.innerHTML[lem.innerHTML.indexOf("Year") + 6];
          let joined = Number.parseInt(lem.innerHTML.slice(lem.innerHTML.indexOf("Year") + 5, lem.innerHTML.indexOf("Year") + 8));
          if (lem.innerHTML.includes(thing.Name) && joined === YEAR) {
            if (Number.parseInt(lem.innerHTML[lem.innerHTML.length - 1]) > 8) {
              lem.innerHTML = lem.innerHTML.slice(0, lem.innerHTML.length - 1) + 9 + "+";
            } else if (Number.parseInt(lem.innerHTML[lem.innerHTML.length - 1]) < 9) {
              lem.innerHTML = lem.innerHTML.slice(0, lem.innerHTML.length - 1) + (Number.parseInt(lem.innerHTML[lem.innerHTML.length - 1]) + 1);
            }

            found = true;
            break;
          }
        }

        if (found === false) {
          eventCreator(` Month ${MONTH} Year ${YEAR}  <br> ${thing.Name} has ran out of food! x1`, "yellow");
        }
      } else {
        eventCreator(` Month ${MONTH} Year ${YEAR}  <br> ${thing.Name} has ran out of food! x1`, "yellow");
      }
    }
    thing.Title.innerHTML = thing.Name;
    thing.Elem.innerHTML =
      `Age: ${thing.Age}` +
      "<br>" +
      `King: ${thing.King.KName}` +
      "<br>" +
      `Thoughts: <br> ` +
      "<br>" +
      `Food: <br> ${thing.Supplies.SFood} with change of ${thing.Supplies.DeltaFood}` +
      "<br>" +
      `Food used per month: ${consumpt * (thing.Popul - thing.Jobs.Children)}` +
      "<br>" +
      `Food extra: ${thing.Supplies.SFood - consumpt * (thing.Popul - thing.Jobs.Children)}` +
      "<br>" +
      `Pop: ${thing.Popul}` +
      "<br> ===================== <br> <br>";
    thing.Supplies.LFood = thing.Supplies.SFood;
  }

  mtext.innerHTML = `Year: ${YEAR} <br> Month: ${seasons[MONTH - 1]}`;

  if (MONTH === 1) {
    if (newran(150) === 1) {
      worldharshness = newran(800);
      eventCreator("The world is enduring terrible conditions", "purple");
    }
  }
  if (worldharshness > 0) {
    worldharshness -= 2;
  }

  //console.log(MONTH);
}

function renderMap() {
  voronoi();
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let i = 0; i < 100; i++) {
    for (let o = 0; o < 100; o++) {
      if (vowels.includes(mapar[i][o].toLowerCase())) {
        ctx.fillStyle = "yellow";
        if (used.length > 9000) {
          try {
            if (mapar[i - 1][o] === "~") mapar[i - 1][o] = biomes[newran(2)];
            if (mapar[i + 1][o] === "~") mapar[i + 1][o] = biomes[newran(2)];
            if (mapar[i][o - 1] === "~") mapar[i][o - 1] = biomes[newran(2)];
            if (mapar[i][o + 1] === "~") mapar[i][o + 1] = biomes[newran(2)];
          } catch {}
        }
      } else if (mapar[i][o] === "~") {
        ctx.fillStyle = "#0d75d1";
      } else if (mapar[i][o] === "î") {
        ctx.fillStyle = "green";
      } else if (mapar[i][o] === "#") {
        ctx.fillStyle = "#719409";
      } else if (mapar[i][o] === "∆") {
        ctx.fillStyle = "grey";
      } else if (mapar[i][o] === "◠") {
        ctx.fillStyle = "#f5e58e";
      } else {
        ctx.fillStyle = "white";
      }
      if (mapar[i][o] != ".") ctx.fillText(mapar[i][o], i * 12, o * 12 + 20);
    }
  }
}

function eventCreator(event, color) {
  histroeis.push(document.createElement("p"));
  histroeis[histroeis.length - 1].innerHTML = event;
  histroeis[histroeis.length - 1].style.color = color;
  if (histroeis.length > 1) {
    document.querySelector(".histo").insertBefore(histroeis[histroeis.length - 1], histroeis[histroeis.length - 2]);
  } else {
    document.querySelector(".histo").appendChild(histroeis[histroeis.length - 1]);
  }
}

generatekdoms();
updateKniGNONIMDWS();
mapar[5][99] = "§";

setInterval(updateKniGNONIMDWS, 400);
renderMap();
setInterval(renderMap, 15);
