

let data = {};


document.addEventListener("keydown", logKey);

let replies = document.getElementById("replies");

function logKey(e) {
    if (e.key === "Enter" && !e.shiftKey){
        loadEntry();
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loadEntry(){
    let buffer = document.querySelector(".input").value;
    buffer = buffer.replaceAll('\n',' ');
    document.querySelector(".input").value = "";
    replies.innerHTML += `user: ${buffer}<br><br>`;
    let words = buffer.trim().split(" ");
    for (let i=0; i<words.length; i++){
        if (words[i] === ""){
            continue;
        }
        if (i === words.length-1){
            if (!(words[i] in data)){
                data[words[i]] = [];
            }
            continue;
        }
        if (words[i] in data){
            data[words[i]].push(words[i+1]);
        } else {
            data[words[i]] = [];
            data[words[i]].push(words[i+1]);
        }
    }
    console.log(data);
    replies.innerHTML += `mr markov: ${generateResponse()}<br><br>`;
    document.getElementById("data").textContent = JSON.stringify(data);
}

function generateResponse(){
    let starting = Object.keys(data);
    starting = starting[getRandomInt(starting.length)];
    let current = starting;
    let reponse = starting;
    let limit = 180;
    while (true){
        if (data[current].length > 0){
            current = data[current][getRandomInt(data[current].length)];
            reponse += ` ${current}`;
        } else {
            break;
        }
        limit--;
        if (limit < 1){
            break;
        }
    }
    return reponse;
}
