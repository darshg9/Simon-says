//View's constructor
function View(model) {

    this.model = model;
    this.model.on("innerHTML", function(e){
        this.editInnerHTML(e.id, e.text);
    }.bind(this));

    EventEmitter.call(this);                                                    //Creates an event emitter for View

//***** List of events for each buttons *****//

    startBtn = document.getElementById("start");
    startBtn.addEventListener("click", this.emit.bind(this, "start"));
    redBtn = document.getElementById("redBtn");
    redBtn.addEventListener("click", this.emit.bind(this, "redBtn"));
    blueBtn = document.getElementById("blueBtn");
    blueBtn.addEventListener("click", this.emit.bind(this, "blueBtn"));
    greenBtn = document.getElementById("greenBtn");
    greenBtn.addEventListener("click", this.emit.bind(this, "greenBtn"));
    yellowBtn = document.getElementById("yellowBtn");
    yellowBtn.addEventListener("click", this.emit.bind(this, "yellowBtn"));

};

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

//Hides a specific "div", pointed by it's "id"
View.prototype.hideDiv = function(id) {

    div = document.getElementById(id);
    div.setAttribute("hidden", true);

}

//Opposite of the previous function
View.prototype.unHideDiv = function(id) {

    div = document.getElementById(id);
    div.removeAttribute("hidden");                                              //CAUTION! "div.setAttribute("hidden", false)" does NOT work!

}

//Edits the innerHTML of a specific "div", pointed by it's "id".
View.prototype.editInnerHTML = function(id, text) {

    div = document.getElementById(id);
    div.innerHTML = text;

}

//Edits the text color of a specific "div", pointed by it's "id"
View.prototype.changeTextColor = function(id, color) {

    div = document.getElementById(id);
    div.setAttribute("style", "color: "+color+";");

}

//Edits the background color of a specific "div", pointed by it's "id"
View.prototype.changeBackgroundColor = function(id, color) {

    div = document.getElementById(id);
    div.setAttribute("style", "background-color: "+color+";");

}
