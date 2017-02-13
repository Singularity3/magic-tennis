var circles = new Array(0);
var currEn = new Array(0);
var counter = 0;
var colR = 0;
var colG = 0;
var colB = 0;
var smoove = true;

function Ball(x, y, d, mx, my) {
    this.x = x;
    this.y = y;
    this.mx = mx;
    this.my = my;
    this.d = d;
    
    this.display = function(){
        fill(255-colR, 255-colG, 255-colB);
        ellipse(this.x, this.y, this.d, this.d);
    }
    
    this.update = function() {
        this.x += this.mx;
        this.y += this.my;
        if ((this.x+this.mx)>=(windowWidth-(this.d/2)) || ((this.x+this.mx)<=(this.d/2))) {
            this.mx *= -1;
        }
        if ((this.y+this.my)>=(windowHeight-(this.d/2)) || ((this.y+this.my)<=(this.d/2))) {
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
        fill(255-colR, 255-colG, 255-colB);
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
    textSize(40);
}

function draw() {
    if(counter%80 == 0){
        colR = random(255);
        colG = random(255);
        colB = random(255);
    }
    if(smoove){
    background(colR, colG, colB, 20);
    }
    else {
        if(counter%80 == 0) {
            background(colR, colG, colB);
        }
    }
    for(var i=0; i<circles.length; i++){
        circles[i].update();
        circles[i].display();
    }
    for(var i=0; i<currEn.length; i++){
        currEn[i].update();
        currEn[i].display();
    }
    fill(255, 255, 255);
    if(smoove) {
        text("fade", 10, 40);
    }
    else{
        text("solid", 10, 40);
    }
counter++;
}
function mousePressed() {
    for(var i=0; i<circles.length; i++){
        circles[i].poke();
    }
    if(dist(mouseX, mouseY, 50, 30)< 50) {
        smoove = !smoove;
        if(!smoove) {
            counter += (78 - counter%80);
        }
    }
    currEn.push(new Energy(mouseX, mouseY));
}