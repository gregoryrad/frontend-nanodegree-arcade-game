var CANVAS_WIDTH = 550,
    score = 0,
    lives = 3;

var newGame = new Audio();
newGame.src = 'sounds/piano.wav'; // author: Bart Kelsey - https://opengameart.org/users/bart
var gotcha = new Audio();
gotcha.src = 'sounds/monster.wav'; // author: Bart Kelsey - https://opengameart.org/users/bart
var win = new Audio();
win.src = 'sounds/chipquest.wav'; // author: Bart Kelsey - https://opengameart.org/users/bart
var footstep = new Audio();
footstep.src = 'sounds/footstep00.wav'; // author: Kenny - https://opengameart.org/users/kenney

// function draws boxes used to outline enemies and player images to determine
// sizes for checking collisions
// function drawBox(x, y, width, height, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// }


// Enemy class for the player to avoid
var Enemy = function(x, y, width, height, speed, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.sprite = sprite;
};


// This method updates the enemy's position
// It takes a parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Determines the direction the bug should travel based on the y position
    // and resets the enemy to its starting point
    if (this.y <= 60) {
        this.x--;
        if (this.x >= -100) {
            this.x -= this.speed * dt;
        } else {
            this.x = 650; // reset position
        }
    } else if (this.y > 61 && this.y <= 144) {
        this.x++;
        if (this.x <= CANVAS_WIDTH) {
            this.x += this.speed * dt;
        } else {
            this.x = -100; // reset position
        }
    } else if (this.y > 144 && this.y <= 312) {
        this.x++;
        if (this.x <= CANVAS_WIDTH) {
            this.x += this.speed * dt;
        } else {
            this.x = -100; // reset position
        }
    } else if (this.y > 312) {
        this.x--;
        if (this.x >= -100) {
            this.x -= this.speed * dt;
        } else {
            this.x = 650; // reset position
        }
    }
    this.checkCollisions();
};


// This function defines the collision between the enemies and the player,
// and also updates the number of lives the player has left
Enemy.prototype.checkCollisions = function() {
    document.getElementById('lives').innerHTML = lives;
    // debugger;
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        gotcha.play();
        player.reset();
        lives -= 1;
        document.getElementById('lives').innerHTML = lives;
        if (lives === 0) {
            alert('GAME OVER!');
            alert('NEW GAME?');
            score = 0;
            document.getElementById('score').innerHTML = score;
            lives = 3;
            newGame.play();
        }
    } else {
    }
};


// This draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x, this.y + 77, 100, 67, "yellow");
};


// Player class
var Player = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = "images/char-horn-girl.png";
};

// This is a method for controlling the position of the player based on keyboard input
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > 2) {
                this.x -= 100;
                footstep.play();
            }
            break;
        case 'right':
            if (this.x < 402) {
                this.x += 100;
                footstep.play();
            }
            break;
        case 'up':
            if (this.y > -12) {
                this.y -= 84;
                footstep.play();
            }
            break;
        case 'down':
            if (this.y < 408) {
                this.y += 84;
                footstep.play();
            }
            break;
        default:
    }
};

// This is a method for updating the player score
Player.prototype.update = function(allowedKeys) {
    if (this.y < 60) {
        win.play();
        this.reset();
        score += 100;
        document.getElementById('score').innerHTML = score;
    }
};

// This draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x + 17, this.y + 62, 68, 80, "cyan");
};

// This resets the player to the starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 480;
};


// Instantiate the objects:

// This assigns the new Enemy constructor to an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(-100, 60, 81, 67, 145, 'images/enemy-bug-grn-rev.png'));
allEnemies.push(new Enemy(-200, 60, 81, 67, 105, 'images/enemy-bug-ylw-rev.png'));
allEnemies.push(new Enemy(-300, 60, 81, 67, 25, 'images/enemy-bug-red-rev.png'));
allEnemies.push(new Enemy(-100, 144, 81, 67, 120, 'images/enemy-bug-grn.png'));
allEnemies.push(new Enemy(-300, 144, 81, 67, 80, 'images/enemy-bug-ylw.png'));
allEnemies.push(new Enemy(-300, 144, 81, 67, 40, 'images/enemy-bug-red.png'));
allEnemies.push(new Enemy(-100, 312, 81, 67, 105, 'images/enemy-bug-grn.png'));
allEnemies.push(new Enemy(-100, 312, 81, 67, 55, 'images/enemy-bug-ylw.png'));
allEnemies.push(new Enemy(-300, 312, 81, 67, 35, 'images/enemy-bug-red.png'));
allEnemies.push(new Enemy(-100, 396, 81, 67, 100, 'images/enemy-bug-grn-rev.png'));
allEnemies.push(new Enemy(-100, 396, 81, 67, 60, 'images/enemy-bug-ylw-rev.png'));
allEnemies.push(new Enemy(-300, 396, 81, 67, 20, 'images/enemy-bug-red-rev.png'));



// This assigns the new Player constructor to a variable called player
var player = new Player(202, 480, 61, 50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    console.log(e);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});