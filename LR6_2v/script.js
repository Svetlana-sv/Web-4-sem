const UPDATE_TIME = 1000 / 60;

var timer = null;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var scale = 0.1;

Resize(); //Changing the canvas size on startup

window.addEventListener("resize", Resize); //Change the canvas size with the window size

//Forbidding openning the context menu to make the game play better on mobile devices
canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
});

var objects = []; //Game objects

var count_fish = 0;

Start();

class Fish {
    constructor(image, x, y) {
        this.x = x;
        this.y = y;
        //this.speed = speed;
        this.loaded = false;
        this.dead = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () {
            obj.loaded = true;
        });

        this.image.src = image;
    }
    Update() {
        this.x += 1;

    }


    Collide(fish) {
        var hit = false;

        if (this.y < fish.y + fish.image.height * scale && this.y + this.image.height * scale > fish.y) //If there is collision by y
        {
            if (this.x + this.image.width * scale > fish.x && this.x < fish.x + fish.image.width * scale) //If there is collision by x
            {
                hit = true;
            }
        }

        return hit;
    }

}

canvas.addEventListener("click", function (e) {
    for (var i = 0; i < objects.length; i++) {
        var fish = objects[i];

        if (objects[i].x <= e.clientX && e.clientX <= objects[i].x + (fish.image.width * scale)) {
            if (objects[i].y <= e.clientY && e.clientY <= objects[i].y + (fish.image.height * scale)) {
                objects[i].dead = true;
                objects.splice(i, 1);
                console.log(objects);
                count_fish--;

                //console.log("Рыбок осталось"+count_fish);
                return;
            }

        }

    }
});

var timer_clock;
var seconds = 30;
clockStart();

function clockStart() {
    if (seconds > 0) {
        timer_clock = setInterval(function () {
            let hour = 00;
            let minutes = 00;
            seconds = seconds - 1;
            $("#timer").html(hour + ":" + minutes + ":" + seconds);

        }, 1000);
    } else {
        Stop();
    }
}

function Start() {
    timer = setInterval(Update, 1000 / 60); //Updating the game 60 times a second

}

function Stop() {
    clearInterval(timer);
    clearInterval(timer_clock);
    timer = null;
    timer_clock = null
}

function Update() {
    console.log("update");
    if (RandomInteger(0, 10000) > 9800 /*&& count_fish<11*/ ) // генерация рыбок
    {
        switch (RandomInteger(0, 3)) {
            case 0:
                objects.push(new Fish("src/blue_goldfish.png", RandomInteger(50, 1400), RandomInteger(50, 700)));
                break;
            case 1:
                objects.push(new Fish("src/pretty_goldfish.png", RandomInteger(50, 1400), RandomInteger(50, 700)));
                break;
            case 2:
                objects.push(new Fish("src/red_goldfish.png", RandomInteger(50, 1400), RandomInteger(50, 700)));
                break;
        }

    }



    for (var i = 0; i < objects.length; i++) { // движения рыбок
        objects[i].Update();
        if (objects[i].x <= 0 || objects[i].x >= canvas.width - 50 || objects[i].y >= canvas.height - 240 || objects[i].y <= 0) {
            objects[i].dead = true;
            objects.splice(i, 1);
            count_fish--;
            console.log(objects);
        }
    }

    Draw(); //отрисовка
    //console.log("update");

}

function Draw() //графика
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //чистим canvas
    var hit = false;
    for (var i = 0; i < objects.length; i++) {
        if(objects.length>1){
            
            //hit = object[i].Collide(objects[i + 1]);
            //if (hit) {
            //    DrawFish(objects[i]); //добавляем рыбу
            //    count_fish++;
            //}
        }else{
            DrawFish(objects[i]); //добавляем рыбу
                count_fish++;
        }
        
        //console.log("Рыбка добавилась"+count_fish);
    }
}

function DrawFish(fish) {
    ctx.drawImage(
        fish.image,
        0,
        0,
        fish.image.width,
        fish.image.height,
        fish.x,
        fish.y,
        fish.image.width * scale,
        fish.image.height * scale
    );
}



function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}