const overlay = document.getElementById('overlay');
const card = document.getElementById('card');
let numbers = document.querySelectorAll("#lucky");
const nextBtn = document.getElementById('next');
let money = document.getElementById('money');
let moneyAmount = 100;

const AllOptions = ["1000", "100", "100", "100", "100", "100", "50", "50", "50", "50", "50", "50", "50", "50", "50", "50", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10"];
for(let i = 36; i < 100; i++){
    AllOptions.push("0");
}

//Shuffle
for(let i = 0; i < AllOptions.length; i++){
    let tmp;
    let newpos = Math.floor(Math.random() * AllOptions.length);
    //Switch
    tmp = AllOptions[newpos];
    AllOptions[newpos] = AllOptions[i];
    AllOptions[i] = tmp;
}

function GenerateCard(){
    //Take a random winning chance from the array, and take it out

    if (AllOptions.length == 0) {
        print("No more scratchers for you!");
    } else {
        let currentChance = AllOptions[AllOptions.length - 1];//Get the last one and "pop" it.
        //AllOptions.pop();

        let options = [-1, -1, -1, -1];
        console.log("Our current chance: " + currentChance)

        switch (currentChance) {
            case "0":
                options[0] = 10;
                options[1] = 50;
                options[2] = 100;
                options[3] = 1000;
                break;

            case "10":
                options[0] = 10;
                options[1] = 10;
                options[2] = 10;
                options[3] = { other: [50, 100, 1000] };
                break;

            case "50":
                options[0] = 50;
                options[1] = 50;
                options[2] = 50;
                options[3] = { other: [10, 100, 1000] };
                break;

            case "100":
                options[0] = 100;
                options[1] = 100;
                options[2] = 100;
                options[3] = { other: [10, 50, 1000] };
                break;

            case "1000":
                options[0] = 1000;
                options[1] = 1000;
                options[2] = 1000;
                options[3] = { other: [10, 50, 100] };
                break;

            default:
                break;
        }
        //Shuffle options
        for (let i = 0; i < options.length; i++) {
            let tmp;
            let newpos = Math.floor(Math.random() * options.length);
            //Switch
            tmp = options[newpos];
            options[newpos] = options[i];
            options[i] = tmp;
        }

        for (let index = 0; index < numbers.length; index++) {
            let insert;
            if (typeof options[index] == "object") {
                insert = options[index].other[Math.floor(Math.random() * 3)];
            } else {
                insert = options[index];
            }
            numbers[index].innerText = insert;
        }
        return currentChance;
    }
}

//Overlay stuff
let mouseX = 0;
let mouseY = 0;
let ctx = overlay.getContext('2d');
let deleting = false;

function init(){
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX - card.offsetLeft;
        mouseY = e.clientY - card.offsetTop; //this updates the mouse coordinates
    });

    if (typeof mousemove != "undefined") {
        window.addEventListener("mousemove", mousemove);
    }
}

function draw() {
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, overlay.width, overlay.height);
}

function update() {
    if (deleting) {
        ctx.clearRect(mouseX - 15, mouseY - 15, 30, 30); 
    }
}

//Button click stuff
nextBtn.addEventListener('click', () => {
    if (moneyAmount > 0) {
        AllOptions.pop();
        let chance = GenerateCard();
        setTimeout(() => {
            MoneyUpdate(chance);
        }, 3000);
        draw();
    } else {
        alert("STAHP IT");
    }
}); 

let MoneyUpdate = (chance) =>{
    moneyAmount -= 10;
    if (chance > 0) {
        moneyAmount += chance * 1;
    }
    money.innerText = "Your money: " + moneyAmount;
}

GenerateCard();
update();
setInterval(update, 1); //JavaScript must keep checking if you're deleting anything. You can decrease the interval for more frequent updating.
draw();

