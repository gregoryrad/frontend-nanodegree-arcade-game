var canvasWidth = 550;
var gotcha = new Audio();
gotcha.src = 'sounds/monster.wav';

// Enemies our player must avoid
var Enemy = function(x,y,width,height,movement) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movement = movement;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-red.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x++;
    if (this.x <= canvasWidth) {
        this.x += this.movement * dt;
    }
    else {
        this.x = -100; // reset position
    }
    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function() {
    // debugger;
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // return true;
        gotcha.play();
        player.reset();
    } else {
    // return false;
    }
};

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x, this.y + 77, 100, 67, "yellow");
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //
    this.sprite = "images/char-princess-girl.png";
};

Player.prototype.handleInput = function(allowedKeys) {
    // debugger;
    switch (allowedKeys) {
      case 'left':
          if (this.x > 2) {
            this.x -= 100;
          }
          console.log("x =" + this.x + " y = " + this.y);
        break;
      case 'right':
          if (this.x < 402) {
            this.x += 100;
          }
        console.log("x =" + this.x + " y = " + this.y);
        break;
      case 'up':
      if (this.y > -12)
        this.y -= 84;
        // debugger;
        console.log("x =" + this.x + " y = " + this.y);
        break;
      case 'down':
        if (this.y < 408) {
            this.y += 84;
        }
        console.log("x =" + this.x + " y = " + this.y);
      default:
    }
};

Player.prototype.update = function(allowedKeys) {
    // Player.prototype.handleInput()
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // drawBox(this.x + 17, this.y + 62, 68, 80, "cyan");
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y =  408;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(-100,60,81,67,200));
allEnemies.push(new Enemy(-200,60,81,67,30));
allEnemies.push(new Enemy(-100,144,81,67,75));
allEnemies.push(new Enemy(-300,144,81,67,30));
allEnemies.push(new Enemy(-100,228,81,67,20));
allEnemies.push(new Enemy(-300,228,81,67,80));

// Place the player object in a variable called player
var player = new Player(202,408,61,50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
