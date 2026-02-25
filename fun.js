

console.log("alive");
function getData(){
    fetch("https://getpantry.cloud/apiv1/pantry/7df6772e-9065-4269-addc-811e682fa07a/basket/picnic-basket")
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => display(json))
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

async function submit(){
    const myHeaders = new Headers();
    let value = document.querySelector("input").value;
    myHeaders.append("Content-Type", "application/json");

    const myRequest = new Request("https://getpantry.cloud/apiv1/pantry/7df6772e-9065-4269-addc-811e682fa07a/basket/picnic-basket", {
    method: "PUT",
    body: JSON.stringify({ key: value }),
    headers: myHeaders,
    });

    const response = await fetch(myRequest);
    setTimeout(getData(),1000);
}

function display(input){
    document.querySelector("p").textContent = "\"" + input.key + "\"";
}

getData();