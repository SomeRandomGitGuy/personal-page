
let chosenWord = "";
let answer = "";

let right = [];
let wrong = [];

let fileData;


function submit(){
    let entry = document.querySelector(".entry");
    if (entry.value == answer){
        document.getElementById("mark").innerHTML = "correct";
        right.push(chosenWord);
    }
    else {
        document.getElementById("mark").innerHTML = `wrong it was \'${answer}\'`;
        wrong.push(chosenWord);
    }
    entry.value = "";
    pickWord();
}

function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    processContents(reader.result);
    reader.close;
  }
}

function pickWord(){
    let index = Math.floor(Math.random() * fileData.length);
    chosenWord = fileData[index][0];
    answer = fileData[index][1];

    document.getElementById("word").innerHTML = chosenWord;
}

function processContents(contents){
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
