//Model's constructor
function Model() {

    EventEmitter.call(this);
    this.sequence = [];                                                         //Sequence of colors
    this.colors = ["red", "blue", "green", "yellow"];                           //Table of colors
    this.setMax(3);                                                             //Length of the sequence, increase with each round
    this.setCount(0);                                                           //Number used to point at a specific offset of the sequence
    this.speed = 4000;                                                          //Delay after wich the sequence passes to the next offset, in milliseconds
    this.setScore(0);                                                           //Pretty self-explanatory, uh?
    this.setRound(1);                                                           //Same as above
    this.playersTurn = false;                                                   //Boolean to define if it's the player's turn or not
    this.setMessage("");
    this.setTimer("");

}

Model.prototype = Object.create(EventEmitter.prototype);
Model.prototype.constructor = Model;

//Resets the model's attributes
Model.prototype.reset = function() {

    this.sequence = [];
    this.setMax(3);
    this.setCount(0);
    model.setScore(0);
    this.speed = 4000;
    this.setRound(1);
    this.playersTurn = false;
    this.setTimer("");

}

//Generates a random sequence of colors, used once per play. Resets "count" too
Model.prototype.generateSequence = function() {

    this.setCount(0);
    for (var ii = 0; ii <= this.max; ii++) {                                    //
        this.addColor();                                                        //Adds colors to the sequence, the numbers being defined by "max"
    }                                                                           //

}

//Adds a new random color to the end of the sequence
Model.prototype.addColor = function() {

    model.sequence.push(model.colors[Math.floor(Math.random()*4)]);             //Generates a random number between 1 to 4, then adds the corresponding color
                                                                                //from the color table to the end of the sequence
}

//Switches between player's turn and sequence display. Resets "count" too
Model.prototype.switchTurn = function() {

    this.setCount(0);
    this.playersTurn = !this.playersTurn;                                       //Stores NOT"playersTurn" in "playersTurn", thus inverting it

}

//***** List of getters and setters *****//

Model.prototype.getSequence = function() {

    return this.sequence;

}

Model.prototype.getMax = function() {

    return this.max;

}

Model.prototype.setMax = function(max) {                                        //Setting "max" automatically change the corresponding display

    this.max = max;
    this.emit("innerHTML", {"id" : "count", "text" : "N° : "+this.getCount()+"/"+this.getMax()});
    return this;

}

Model.prototype.getCount = function() {

    return this.count;

}

Model.prototype.setCount = function(count) {                                    //Setting "count" automatically change the corresponding display

    this.count = count;
    this.emit("innerHTML", {"id" : "count", "text" : "N° : "+this.getCount()+"/"+this.getMax()});
    return this;

}

Model.prototype.getSpeed = function() {

    return this.speed;

}

Model.prototype.setSpeed = function(speed) {

    this.speed = speed;
    return this;

}

Model.prototype.getScore = function() {

    return this.score;

}

Model.prototype.setScore = function(score) {                                    //Setting "score" automatically change the corresponding display

    this.score = score;
    this.emit("innerHTML", {"id" : "score", "text" : "Score : "+this.getScore()});
    return this;

}

Model.prototype.getRound = function() {

    return this.round;

}

Model.prototype.setRound = function(round) {                                    //Setting "round" automatically change the corresponding display

    this.round = round;
    this.emit("innerHTML", {"id" : "round", "text" : "Round : "+this.getRound()});
    return this;

}

Model.prototype.getPlayersTurn = function() {

    return this.playersTurn;

}

Model.prototype.getMessage = function() {

    return this.message;

}

Model.prototype.setMessage = function(message) {                                //Setting "message" automatically change the corresponding display

    this.message = message;
    this.emit("innerHTML", {"id" : "message", "text" : this.getMessage()});
    return this;

}

Model.prototype.getTimer = function() {

    return this.timer;

}

Model.prototype.setTimer = function(timer) {                                    //Setting "timer" automatically change the corresponding display

    this.timer = timer;
    this.emit("innerHTML", {"id" : "display", "text" : this.getTimer()});
    return this;

}
