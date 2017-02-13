var circles = new Array(0);
var currEn = new Array(0);
var counter = 0;
var colNum = 0;
var color1 = "#000000"
var color2 = "#ffffff";

function Ball(x, y, d, mx, my) {
    this.x = x;
    this.y = y;
    this.mx = mx;
    this.my = my;
    this.d = d;
    
    this.display = function(){
        fill(color2);
        ellipse(this.x, this.y, this.d, this.d);
    }
    
    this.update = function() {
        this.x += this.mx;
        this.y += this.my;
        if (this.x>=windowWidth-(this.d/2) || this.x<=this.d/2) {
            this.mx *= -1;
        }
        if (this.y>=windowHeight-(this.d/2) || this.y<=this.d/2) {
            this.my *= -1;
        }
        if(this.y > windowHeight- (this.d/2 + 1)){
            this.y = windowHeight - (this.d/2 + 1);
        }
        if(this.y < this.d/2 + 1){
            this.y = this.d/2 + 1;
        }
    }
    this.poke = function() {
        if(dist(this.x, this.y, mouseX, mouseY) <= d/2) {
            var spdM = 6/(Math.abs(mouseX - this.x) + Math.abs(mouseY - this.y));
            this.mx = (this.x - mouseX)*spdM;
            this.my = (this.y - mouseY)*spdM;
        }
    }
}

function Energy(x, y) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.lmx = mouseX;
    this.lmy = mouseY;
    this.active = true;
    
    this.display = function(){
        if(this.active){
        fill(color2);
        ellipse(this.x, this.y, this.d, this.d);
        }
    }
    
    this.update = function(){
        if(this.active && counter%3 == 0){
            this.d += dist(this.lmx, this.lmy, mouseX, mouseY)/20;
            if(this.d >= 200) {
                this.d = 200;
            }
            if(!mouseIsPressed) {
                if(this.d >=20){
                var spdM =6/(Math.abs(mouseX - this.x) + Math.abs(mouseY - this.y));
                circles.push(new Ball(this.x, this.y, this.d, (mouseX - this.x)*spdM, (mouseY - this.y)*spdM));
                }
                this.active = false;
            }
            this.lmx = mouseX;
            this.lmy = mouseY;
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    if(counter%80 == 0){
        colNum = Math.floor(Math.random()*16777215);
        color1 = '#' + colNum.toString(16);
        color2 = '#' + (16777215 - colNum).toString(16);
    background(color1)
    }
    for(var i=0; i<circles.length; i++){
        circles[i].update();
        circles[i].display();
    }
    for(var i=0; i<currEn.length; i++){
        currEn[i].update();
        currEn[i].display();
    }
counter++;
}
function mousePressed() {
    for(var i=0; i<circles.length; i++){
        circles[i].poke();
    }
    currEn.push(new Energy(mouseX, mouseY));
}