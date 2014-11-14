console.log('\'Allo \'Allo!');

var winHeight;
var winWidth;
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
}else{
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;
}

var game = new Phaser.Game(winWidth, winHeight, Phaser.CANVAS, '',//Phaser.AUTO
    { preload: preload, create: create, update: update ,render: render },false,true);


var mouseConstraint;

var boxes = [];
var circle;
var tab;

var ui;

var mouse;
var is_draging = false;

function preload() {}

function create() {

    if(game.canvas.getContext('2d')){
        //canvas mode
    }else if(game.canvas.getContext('webgl')){
        //webgl mode
    }

    game.stage.backgroundColor = 0x2c3e50;
    console.log(game);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.restitution = 0.9;

    mouseBody = new p2.Body();game.physics.p2.world.addBody(mouseBody);

    circle = new MyCircle(winWidth>>1,winHeight>>1,10,200);
    tab    = new MyTabRet(winWidth>>1,winHeight*0.66,80,10);

    //game.stage.events.onInputOver.add(function(){console.log(game.input.activePointer.position);});
    /*game.input.onDown.add(onDown, this);
    game.input.onUp.add(onRease, this);*/
    game.input.addMoveCallback(onDrag, this);
}

function onDrag(pointer){
    mouse = pointer;
}

function update() {
    //console.log(game.input.x,' ',game.input.y);
    circle.update();
    tab.update();

    if(mouse){
        if(mouse.position.x<tab.body.x||mouse.position.x>tab.body.x){
            var pos_offset = mouse.position.x - tab.body.x;
            tab.body.velocity.x = pos_offset*10;//pos_offset/Math.abs(pos_offset) * 100;
        }else{
            tab.body.velocity.x = 0;
        }
    }

    if((tab.body.x-tab.width/2)<0){
        tab.body.x = tab.width/2+1;
        tab.body.velocity.x = 0;
    }else if((tab.body.x+tab.width/2)>game.width){
        tab.body.x = game.width - tab.width/2 - 1;
        tab.body.velocity.x = 0;
    }

    //console.log(tab.body.velocity.x);
    //boxes.update();
}

function render() {
}