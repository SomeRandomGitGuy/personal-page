
let question = "";
let answer = "";

let right = [];
let wrong = [];

let dark = false;

let fileData;

let selection = "nouns";



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
  pickWord();
}

async function getData(){
  let url = document.getElementById("url").value;
  url = url.slice(0,url.indexOf("/edit?"))
  url += "/export?format=tsv";
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