
let question = "";
let answer = "";

let right = [];
let wrong = [];

let dark = false;

let fileData;

let selection = "nouns";


function reveal(){
  document.getElementById("answer").textContent = `Answer: ${answer}`;
}

function correct(){
    right.push(`${question}`);
    document.getElementById("answer").textContent = "";
    giveQuestion();
}

function incorrect(){
    wrong.push(`${question}`);
    document.getElementById("wrong").innerHTML += `${question}<br>`;
    document.getElementById("answer").textContent = "";
    giveQuestion();
}

function giveQuestion(){
  document.getElementById("percent").textContent = `${Math.round(right.length/(right.length+wrong.length) * 100)}% correct so far (${right.length}/${right.length+wrong.length})`;
  let first = document.getElementById("wordSelection").value-1;
  let second = document.getElementById("wordStart").value-1;
  if (second > fileData.length){
    console.log("number of questions to pick from is too big");
  }
  let index = Math.floor(Math.random() * (second - first+1) + first);
  console.log(index);
  if (fileData[index][1] === ""){
    giveQuestion();
    return;
  }
  question = fileData[index][0];
  answer = fileData[index][1];

  document.getElementById("word").innerHTML = question;
}

document.addEventListener("keydown", logKey);
function logKey(e) {
    if (e.key === "Enter" && !e.shiftKey){
        reveal();
    }
    if (e.key === "y" && !e.shiftKey){
        correct();
    }
    if (e.key === "n" && !e.shiftKey){
        incorrect();
    }
}

function processContents(contents){
  console.log(contents);
  // write code to process the file here

  // contents is a string
  // write the processed file to the fileData variable

  // If the CSV was saved in MS Excel, you may need to split on "​​\r\n"
  fileData = contents.split("\r\n");

  for (let i=0; i<fileData.length; i++) {
    fileData[i] = fileData[i].split("\t");
  }

  console.log(fileData);
  giveQuestion();
}

async function getData(){
  let url = document.getElementById("url").value;
  // url = url.slice(0,url.indexOf("/edit?"))
  // url += "/export?format=tsv";
  url = url.replace("edit?","export?format=tsv&");
  console.log(url);
  let response = await fetch(url);
  result = await response.text();
  console.log(result);
  processContents(result);
}


function clearList(){
  wrong = [];
  right = [];
  document.getElementById("wrong").innerHTML = "";
}

function toggleDark(){
  if (!dark){
    document.querySelector("body").style = "background-color:#121212; color: #FAF9F6; color-scheme: dark; border-color: #FAF9F6;";
    document.querySelector(".side").style.borderColor = "#FAF9F6";
    document.querySelector(".settings").style.borderColor = "#FAF9F6";
  } else {
    document.querySelector("body").style = "background-color: #FAF9F6; color: #121212; color-scheme: light; border-color: #121212;";
    document.querySelector(".side").style.borderColor = "#121212";
    document.querySelector(".settings").style.borderColor = "#121212";
  }
  dark = !dark;
}

getData();