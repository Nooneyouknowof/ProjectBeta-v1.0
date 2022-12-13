// Player
var plyr = document.querySelector("#player");

var x = 0,
    y = 0,
    velY = 0,
    velX = 0,
    speed = 0.01,
    OGspeed = speed,
    sneakSpeed = 0.005,
    dash = 0.015,
    speedCap = 10,
    friction = 0.95,
    OGfriction = friction,
    bounce = 0.5,
    keys = [];

var dashcooldown = 1,
    dashing = false,
    Paused = false;

//Boss stuff

var BossToDo = [];

setInterval(function() {
    BossToDo.push([6,1,-12,0,200,200,100,0]);
},4000);

function update() {
    requestAnimationFrame(update);

    if (keys['S'] == true) {
        if (velY > -speedCap) {
            velY = velY + (5*speed);
        }
    }
    
    if (keys['W'] == true) {
        if (velY < speedCap) {
            velY = velY - (5*speed);
        }
    }

    if (keys['A'] == true) {
        if (velX < speedCap) {
            velX = velX - (5*speed);
        }
    }
    
    if (keys['D'] == true) {
        if (velX > -speedCap) {
            velX = velX + (5*speed);
        }
    }

    if (keys[' '] == true) {
        if (dashing == false) {
            dashing = true;
            console.log("Dashing: "+dashing);
            var prevspeed = speed;
            speed = prevspeed*10;
            setTimeout(function(){
                console.log("Fin: "+speed);
                speed = prevspeed;
                friction = 0.65;
                setTimeout(function(){
                    friction = OGfriction;
                    speed = OGspeed
                },100);
            },100);
            dash = false;
            setTimeout(function(){
                dashing = false;
                console.log("Dashing: "+dashing);
            },dashcooldown*1000);
        }
    }

    if (keys['ESCAPE'] == true) {
        keys['ESCAPE'] = false
        console.log("Game Paused")
        document.querySelector("#pause").style.opacity = "0.65";
        setTimeout(function(){
            alert("Game Paused");
            document.querySelector("#pause").style.opacity = "0";
            keys['W'] = false;
            keys['A'] = false;
            keys['S'] = false;
            keys['D'] = false;
        },100);
    }

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;
    if (keys['SHIFT'] == true) {
        var tempX = velX;
        velX = tempX*0.85
        var tempY = velY;
        velY = tempY*0.85
    }

    if (x < 0) {
        var prevvelX = velX;
        var prevvelY = velY;
        if (prevvelY < 0) {
            x = 0;
            velX = -prevvelX*bounce;
            velY = prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        } else {
            x = 0;
            velX = -prevvelX*bounce;
            velY = prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        }
    }

    if (x > 70) {
        var prevvelX = velX;
        var prevvelY = velY;
        if (prevvelY < 0) {
            x = 70;
            velX = -prevvelX*bounce;
            velY = prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        } else {
            x = 70;
            velX = -prevvelX*bounce;
            velY = prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        }
    }

    if (y < 0) {
        var prevvelX = velX;
        var prevvelY = velY;
        if (prevvelX < 0) {
            y = 0;
            velX = prevvelX*bounce;
            velY = -prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        } else {
            y = 0;
            velX = prevvelX*bounce;
            velY = -prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        }
    }

    if (y > 90) {
        var prevvelX = velX;
        var prevvelY = velY;
        if (prevvelX < 0) {
            y = 90;
            velX = prevvelX*bounce;
            velY = -prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        } else {
            y = 90;
            velX = prevvelX*bounce;
            velY = -prevvelY*bounce;
            Math.round(velX);
            Math.round(velY);
        }
    }
    var travelSpeed = (Math.abs(velX)+Math.abs(velY))/4;
    if (travelSpeed > 5) {
        travelSpeed = 5;
    }
    if (velX > 10) {
        velX = 10;
    }
    if (velY > 10) {
        velY = 10;
    }
    plyr.style.left = x+"%";
    plyr.style.top = y+"%";
    plyr.style.boxShadow = -velX+"vw " + -velY+"vh " + travelSpeed+"vw " + "black, " + -velX/2+"vw " + -velY/2+"vh " + travelSpeed/2+"vw " + "black";
    if (keys['SHIFT'] == false) {
        plyr.style.filter = "blur("+travelSpeed*2.5+"px)";
    } else {
        plyr.style.filter = "blur(0px)";
    }

    // BossUpdate Stuff
    /*
    for(var attack = 0; attack < BossToDo.length; attack++) {
        for(var arg = 0; arg < BossToDo[attack].length; arg++) {
            if (arg == 6) {
                BossToDo[attack][arg]++;
                BossToDo[attack][8] = attack;
            }
            if (arg == 7) {
                if (BossToDo[attack][arg] == 0) {
                    BossClockWiseAttack(BossToDo[attack][0],BossToDo[attack][1],BossToDo[attack][2],BossToDo[attack][3],BossToDo[attack][4],BossToDo[attack][5],BossToDo[attack][6],BossToDo[attack][7],BossToDo[attack][8]);
                }
                if (BossToDo[attack][arg] == 1) {
                    BossCounterClockWiseAttack(BossToDo[attack][0],BossToDo[attack][1],BossToDo[attack][2],BossToDo[attack][3],BossToDo[attack][4],BossToDo[attack][5],BossToDo[attack][6],BossToDo[attack][7],BossToDo[attack][8]);
                }
            }
        }
    }
*/
}
update();

document.addEventListener('keydown', (event) => {
    keys[event.key.toUpperCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keys[event.key.toUpperCase()] = false;
}, false);

// Boss functions

function BossClockWiseAttack(BulletCount,BulletSpeed,Radius,Rotation,X,Y,Stage,Index) {
    var totalPoints = BulletCount*10;
    var OGradi = Radius;
    var SpinSpeed = 10;
    
    // Algoritom
    var displayPoint = totalPoints - Stage;
    if (displayPoint < BulletCount) {
        if (displayPoint < 1) {
            Radius = (Radius-displayPoint);
        }
        displayPoint = BulletCount;
    }
    if (Radius >= 100) {
        BossToDo.splice(Index,0);
        return
    }
    for (var i = 1; i <= BulletCount; i++) {
        drawPoint(Radius, i, displayPoint, X, Y, 0);
    }
}

var unique
function createPoint() {  
    document.createElement('div');
}

function drawPoint(r, currentPoint, totalPoints, X, Y, rotation) {  
    var theta = ((Math.PI*2) / totalPoints);
    var angle = (theta * currentPoint);
    
    ball.setPosition((r * Math.cos(angle+rotation)+X)-20,(r * Math.sin(angle+rotation))+Y)-50;
    ball.setRotation((360/totalPoints)*currentPoint, 0);
    add(ball);
}