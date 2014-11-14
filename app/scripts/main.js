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

var status = 1;

var curr_rows = 0;
var box_total = 0;
var box_offset = 0;
var box_width = 30;var box_space = 10;

var boxes = [];
var boxpos = {};

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

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.restitution = 0.9;

    circle = new MyCircle(winWidth>>1,winHeight>>1,10,200);
    tab    = new MyTabRet(winWidth>>1,winHeight*0.66,80,10);

    var count = numSplit((game.width-box_space)/(box_width+box_space));
    box_total = count.integer;

    /*************************
     * init boxes
     *************************/
    boxpos = {
        x:(game.width - ((box_total*box_width)+(box_total-1)*box_space))/2+box_width/2,
        y:box_width/2+box_space,
        resetx:function(){
            this.x = (game.width - ((box_total*box_width)+(box_total-1)*box_space))/2+box_width/2;
        }
    };
    for(var i=0;i<1;i++){
        boxes[i] = [];
        for(var j=0;j<box_total;j++){
            boxes[i][j] = new MyBox(boxpos.x,boxpos.y,box_width,'haha');
            boxpos.x += box_width+box_space;
        }
        boxpos.resetx();
        boxpos.y += box_width+box_space;
    }
    curr_rows = 1;
    boxpos.resetx();
    boxpos.y = -box_width/2;
    setTimeout(timecount,5000);

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
        if(mouse.position.x<(tab.body.x-tab.width/2)||mouse.position.x>(tab.body.x+tab.width/2)){
            var pos_offset = mouse.position.x - tab.body.x;
            tab.body.velocity.x = pos_offset*10;//pos_offset/Math.abs(pos_offset) * 100;
        }else{
            tab.body.velocity.x = 0;
        }
    }

    if((tab.body.x-tab.width/2)<0){
        tab.body.x = tab.width/2+0.5;
        tab.body.velocity.x = 0;
    }else if((tab.body.x+tab.width/2)>game.width){
        tab.body.x = game.width - tab.width/2 - 0.5;
        tab.body.velocity.x = 0;
    }

    //boxes
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].length;j++){
            var box = boxes[i][j];
            box.update();
            if(box.is_moving){
                if(box.body.y >= (box.last_y+box_width+box_space)){
                    box.body.y = box.last_y+box_width+box_space;
                    console.log(box.body.y,' ',box.last_y);
                    box.body.velocity.y = 0;
                    box.is_moving = false;
                }
            }
        }
    }

    //console.log(tab.body.velocity.x);
    //boxes.update();
}

function render() {
}

function timecount()
{
    if(curr_rows<3){
        var newrow = [];
        for(var a=0;a<box_total;a++){
            newrow[a] = new MyBox(boxpos.x,boxpos.y,box_width,'haha');
            boxpos.x += box_width+box_space;
        }
        boxpos.resetx();
        boxes.push(newrow);
        curr_rows++

        for(var i=0;i<boxes.length;i++){
            for(var j=0;j<boxes[i].length;j++){
                var box = boxes[i][j];
                if(box.body.y < box.body.y+(box_width+box_space)){
                    box.is_moving = true;
                    box.last_y = box.body.y;
                    box.body.velocity.y = box_width*2;
                }
            }
        }
    }

    setTimeout(timecount,5000);
}