

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
    for (let i=1; i<words.length-1; i++){
        if (words[i] === ""){
            continue;
        }
        if (words[i-1] in data){
            if (words[i] in data[words[i-1]]){
                data[words[i-1]][words[i]].push(words[i+1]);
            } else{
                data[words[i-1]][words[i]] = [];
                data[words[i-1]][words[i]].push(words[i+1]);
            }
            
        } else {
            data[words[i-1]] = {};
            data[words[i-1]][words[i]] = [];
            data[words[i-1]][words[i]].push(words[i+1]);
        }
    }
    console.log(data);
    replies.innerHTML += `mr markov: ${generateResponse()}<br><br>`;
    document.getElementById("data").textContent = JSON.stringify(data);
}

function generateResponse(){
    let starting = Object.keys(data);
    starting = starting[getRandomInt(starting.length)];
    console.log(starting);
    let starting2 = Object.keys(data[starting]);
    starting2 = starting2[getRandomInt(starting2.length)];
    console.log(starting2);
    let current = [starting,starting2];
    let reponse = `${starting} ${starting2}`;
    let limit = 180;
    while (true){
        if (current[0] in data && current[1] in data[current[0]]){
            current = [current[1],data[current[0]][current[1]][getRandomInt(data[current[0]][current[1]].length)]];
            reponse += ` ${current[1]}`;
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
