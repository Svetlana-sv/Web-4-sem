class Fish {
    constructor(image, x, y,speed,size) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.loaded = false;
        this.dead = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () {
            obj.loaded = true;
        });


        this.image.addEventListener("click", function() {
            console.log("click");
            alert("click"); 
        });

        this.image.src = image;
    }
    Update() {
            this.x -= 1;
            this.y +=1;
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




const UPDATE_TIME = 1000/60;

var timer = null;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

var scale = 0.1; 

canvas.addEventListener("click", function(e){
    for (var i = 0; i < objects.length; i++) {
        var fish = objects[i];

        if (objects[i].x <= e.clientX && e.clientX<=objects[i].x+(fish.image.width*scale)){
            if (objects[i].y <= e.clientY && e.clientY<=objects[i].y + (fish.image.height*scale)){
                objects[i].dead = true;
                count_fish--;
                console.log("Рыбок осталось"+count_fish);
                return;
            }
        }

        // if (e.clientY < fish.y + fish.image.height * scale && e.clientY + this.image.height * scale > fish.y) //If there is collision by y
        // {
        //     if (e.clientX + this.image.width * scale > fish.x && e.clientX < fish.x + fish.image.width * scale) //If there is collision by x
        //     {
        //         alert("t");
        //     }
        // }
    }
});


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


function Start() {
		timer=setTimeout(Update, UPDATE_TIME); //Updating the game 60 times a second
        document.write("<h1>Привет мир!</h1>");
}

function Stop() {
    clearInterval(timer); //Game stop
    timer = null;
}

function Update() {

    if (RandomInteger(0, 10000) > 9800 && count_fish<11) // генерация рыбок
    {
        switch (RandomInteger(0,3)) {
            case 0:
                objects.push(new Fish("src/blue_goldfish.png", RandomInteger(50, 1400), RandomInteger(50,700),3,500));
                break;
            case 1:
                objects.push(new Fish("src/pretty_goldfish.png", RandomInteger(50, 1400), RandomInteger(50,700),3,5));
                break;
            case 2:
                objects.push(new Fish("src/red_goldfish.png", RandomInteger(50, 1400), RandomInteger(50,700),3,5));
                break;
        }

    }

    for (var i = 0; i < objects.length; i++) { // движения рыбок
        objects[i].Update();
    }

    Draw(); //отрисовка
    console.log("update");
    
}

function Draw() //графика
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //чистим canvas

    for (var i = 0; i < objects.length; i++) {
        if (!objects[i].dead)
        DrawFish(objects[i]);//добавляем рыбу
        count_fish++;
        console.log("Рыбка добавилась"+count_fish);
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
        fish.size,
        fish.speed,
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