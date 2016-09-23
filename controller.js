//Controller's constructor
function Controller(model, view) {

//***** List of View's events watched by Controller *****//

    view.on("start", this.startGame.bind(this));
    view.on("redBtn", this.redBtn.bind(this));
    view.on("blueBtn", this.blueBtn.bind(this));
    view.on("greenBtn", this.greenBtn.bind(this));
    view.on("yellowBtn", this.yellowBtn.bind(this));

};

//Starts a new game or round
Controller.prototype.startGame = function() {

    view.hideDiv("start");
    view.changeTextColor("message", "blue");

    if(model.getRound() == 1) {                                                 //If it's the first round of the play
        model.generateSequence();                                               //generates a whole new sequence
    }                                                                           //
    else {                                                                      //
        model.addColor();                                                       //Else just add a new color to the existing sequence
    }                                                                           //

    this.displaySequence();                                                     //Start the sequence display

}

//Display each colors of the sequence consecutively
Controller.prototype.displaySequence = function() {

    view.unHideDiv("message");
    model.setMessage("Prêt?");                                                  //Starts a countdown so the player can ready himself to memorize
    sequence = model.getSequence();
    setTimeout(function() {
        model.setMessage("3...");
        setTimeout(function() {
            model.setMessage("3...2...");
            setTimeout(function() {
                model.setMessage("3...2...1...");
                setTimeout(ctrl.displayColor.bind(ctrl), 1000);
                setTimeout(function() {
                    model.setMessage("Mémorisez...");
                    sequenceInt = setInterval(ctrl.displayColor.bind(ctrl), model.getSpeed());  //Start an interval. Each iteration displays the next color
                }, 1000);                                                                       // of the sequence
                }, 1000);
            }, 1000);}
        , 2000);

}

//Display the next color of the sequence and switch to player's turn if this was the last one
Controller.prototype.displayColor = function() {
    view.changeBackgroundColor("display", sequence[model.getCount()]);
    model.setCount(model.getCount()+1);
    if(model.getCount() == model.getMax()) {                                    //
                                                                                //
        clearInterval(sequenceInt);                                             //If the color was the last one, stop the interval and starts player's turn
        sequenceInt = 0;                                                        //
        setTimeout(ctrl.playersTurn, model.getSpeed());                         //

    }

}

//Announces the player's turn and starts the answer's timer
Controller.prototype.playersTurn = function() {

    view.changeBackgroundColor("display", "white");
    model.setMessage("A vous!");
    model.switchTurn();
    ctrl.finalCountdown();                                                      //Great song from Europe! (sorry for this one, couldn't resist)

}

//When the player clicks on a color, one of the 4 following function executes
//itself, depending of the color. Each checks if this is the player's turn and
//then start a color check
Controller.prototype.redBtn = function() {

    if(model.getPlayersTurn()) {

        this.checkColor("red");

    }

}

Controller.prototype.blueBtn = function() {

    if(model.getPlayersTurn()) {

        this.checkColor("blue");

    }

}

Controller.prototype.greenBtn = function() {

    if(model.getPlayersTurn()) {

        this.checkColor("green");

    }

}

Controller.prototype.yellowBtn = function() {

    if(model.getPlayersTurn()) {

        this.checkColor("yellow");

    }

}

//Check if the clicked color corresponds to the next color in the sequence
Controller.prototype.checkColor = function(color) {

    this.stopCountdown();
    if(color == sequence[model.getCount()]) {                                   //If the color is right
                                                                                //
        model.setScore(model.getScore()+model.getTimer());                      //The score increases by the number of seconds left to answer
        model.setCount(model.getCount()+1);                                     //
        view.changeTextColor("message", "green");                               //
        model.setMessage("Bien!");
        if(model.getCount() == model.getMax()) {                                ////Then, if it was the last color in the sequence,
            this.newRound();                                                    ////starts the events previous to a new round
        }                                                                       ////
        else {                                                                  ////
            this.finalCountdown();                                              ////Else, restarts the answer's timer
        }                                                                       ////
                                                                                //
    }                                                                           //
    else {                                                                      //Else...
                                                                                //
        this.gameOver();                                                        //Well, seems the player screwed up...
                                                                                //
    }                                                                           //

}

//Starts a new round after increasing difficulty
Controller.prototype.newRound = function() {

    this.stopCountdown();
    model.switchTurn();
    model.setTimer("");
    model.setRound(model.getRound()+1);
    view.changeTextColor("message", "blue")
    model.setMessage("Bravo!")
    model.setMax(model.getMax()+1);                                             //Adds 1 to the sequence's length

    if(model.getSpeed() > 500 && (model.getRound()%2)) {                        //Every 2 rounds, decreases the colors display time by half a second,
        model.setSpeed(model.getSpeed()-500);                                   //until it reaches half a second
    }                                                                           //
    setTimeout(this.startGame.bind(this), 2000);

}

//Resets the game and allow to start a new play
Controller.prototype.gameOver = function() {

    view.changeTextColor("message", "red");
    model.setMessage("Perdu! Score final : "+model.getScore());
    model.reset();
    this.stopCountdown();
    start.removeAttribute("hidden");

}

//Answer's timer
Controller.prototype.finalCountdown = function() {

    model.setTimer(5);
    playerInt = setInterval(this.timerMinus, 1000);

}

//Decreases the timer by 1
Controller.prototype.timerMinus = function() {

    model.setTimer(model.getTimer()-1);
    if(model.getTimer() == 0) {
        ctrl.gameOver();
    }

}

//Stops the timer
Controller.prototype.stopCountdown = function() {

    clearInterval(playerInt);
    playerInt = 0;
    view.editInnerHTML("display","");

}
