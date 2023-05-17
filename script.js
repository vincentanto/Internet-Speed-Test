let startTime, endTime;
let imageSize = "";
let image = new Image();
let kboutput = document.getElementById("mbs");
let mboutput = document.getElementById("kbs");

loader();
function loader() {
    kboutput.innerHTML = "Calculating"

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        kboutput.innerHTML += '.';

        // If the loading indicator has reached three dots, reset it
        if (kboutput.innerHTML === "Calculating....") {
            kboutput.innerHTML = "Calculating";
        }
    }, 300);
}

let imageLink = "https://source.unsplash.com/random?topics=nature";

image.onload = async function () {
    endTime = new Date().getTime();

    await fetch(imageLink).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;

    let loadedBits = imageSize * 8;
    let speedInBps = (loadedBits / timeDuration).toFixed(2);
    let speedInKbps = (speedInBps / 1024).toFixed(2);
    let speedInMbps = (speedInKbps / 1024).toFixed(2);
    clearInterval(loadInterval)
    kboutput.innerHTML = '';

    kboutput.innerHTML = `<span style="font-weight: bold">${speedInMbps} </span>mbps`;
    mboutput.innerHTML = `<span style="font-weight: bold">${speedInKbps} </span>Kbps`;
}

const init = async () => {
    startTime = new Date().getTime();
    image.src = imageLink;
};

window.onload = () => init();