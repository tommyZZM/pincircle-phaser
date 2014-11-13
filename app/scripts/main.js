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

var game = new Phaser.Game(winWidth, winHeight, Phaser.CANVAS, '',
    { preload: preload, create: create, update: update ,render: render },false,true);
//Phaser.AUTO

var boxes = [];
var circle;
var tab;

var ui;

function preload() {}

function create() {

    if(game.canvas.getContext('2d')){
        //canvas mode
    }else if(game.canvas.getContext('webgl')){
        //webgl mode
    }

    game.stage.backgroundColor = 0x2c3e50;

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 200;
    game.physics.p2.restitution = 0.9;

    //
    circle = new PhyObject(game,winWidth>>1,winHeight>>1,{type:'cir',r:10},0);
}


function update() {
    circle.render()
}

function render() {}