var canvasWidth = 550;

// Enemies our player must avoid
var Enemy = function(x,y,movement) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.movement = movement;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
// TODO define collisions
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    //
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(dt) {
    //if..elseif statement here

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(-100,60,200));
allEnemies.push(new Enemy(-200,60,30));
allEnemies.push(new Enemy(-100,144,75));
allEnemies.push(new Enemy(-300,144,30));
allEnemies.push(new Enemy(-100,228,50));
allEnemies.push(new Enemy(-300,228,80));

// Place the player object in a variable called player
var player = new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.prototype.handleInput(allowedKeys[e.keyCode]);
});
