console.log('\'Allo \'Allo!');

var winHeight;
var winWidth;

var game;
var text;
var button;

//bootstrap
$(function(){
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }else{
        winHeight = window.innerHeight;
        winWidth = window.innerWidth;
    }

    text = $('#text');
    button = $('#button');

    text.css('margin-left',-text.width()/2).show();

    $('#game').width(winWidth).height(winHeight);

    button.one("click",function(){
        game = new Phaser.Game(winWidth, winHeight, Phaser.CANVAS, 'game',//Phaser.AUTO
            { preload: preload, create: create, update: update ,render: render },false,true);
        $(this).hide();
        text.hide();
    });
});

var score = 0;

var curr_rows = 0;
var box_total = 0;
var box_offset = 0;
var box_width = 30;var box_space = 10;
var timeinterval;

var boxes = {arr:[],rows:0};
var boxpos = {};

var circle;
var tab;

var mouse;

function preload() {}

function create() {

    if(game.canvas.getContext('2d')){
        //canvas mode
    }else if(game.canvas.getContext('webgl')){
        //webgl mode
    }

    game.stage.backgroundColor = 0x2c3e50;

    init();
}

function onDrag(pointer){
    mouse = pointer;
}

function onHit(body, shapeA, shapeB, equation){
    if(body){
        if(body.parent instanceof MyBox){
            body.parent.destroy();
            boxes.arr[body.parent.vessel.i].length--;
            boxes.arr[body.parent.vessel.i].row[body.parent.vessel.j] = null;
            //console.log(boxes.arr[body.parent.vessel.i].length,' ',boxes.arr[body.parent.vessel.i].row.length);
            if(boxes.arr[body.parent.vessel.i].length == 0){
                boxes.rows--;
                console.log(boxes.arr[body.parent.vessel.i].length,' ',boxes.rows)
            }
            //console.log(body.parent.vessel.i,' ',body.parent.vessel.j,' ',boxes.arr[body.parent.vessel.i].length);
            score++;
        }
    }
    //console.log('onHit '+body);
}

function restart(){
    console.log('restart');
    button.hide();
    text.hide();
    console.log(game);
    clearInterval(timeinterval);
    score=0;
    init();

}

function init(){
    game.isRunning = true;
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.restitution = 0.9;

    if(circle){
        circle.destroy();
        tab.destroy();
        for(var i=0;i<boxes.arr.length;i++){
            for(var j=0;j<boxes.arr[i].row.length;j++){
                var box = boxes.arr[i].row[j];
                if(box){
                    box.destroy();
                }
            }
        }
    }
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
        boxes.arr[i] = {row:[]};
        for(var j=0;j<box_total;j++){
            boxes.arr[i].row[j] = new MyBox(boxpos.x,boxpos.y,box_width,'haha');
            boxes.arr[i].row[j].vessel.i = i;
            boxes.arr[i].row[j].vessel.j = j;
            boxpos.x += box_width+box_space;
        }

        boxes.arr[i].length = box_total;
        boxpos.resetx();
        boxpos.y += box_width+box_space;
    }
    boxes.rows = 1;
    //console.log(boxes,' ',box_total);
    boxpos.resetx();
    boxpos.y = -box_width/2;
    timeinterval = setTimeout(timecount,5000);

    game.input.addMoveCallback(onDrag, this);
    circle.body.onBeginContact.add(onHit, this);
}

function update() {
    if(game.isRunning){
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

        if(circle.body.y>tab.body.y){
            console.log('Over! Score:'+score);

            game.physics.destroy();

            text.html('Game Over!');
            text.show();

            button.html('重新开始');
            button.show();
            button.one("click",function(){
                restart();
            });

            //game.state.start('Over');
            game.isRunning = false;
        }

        //boxes
        for(var i=0;i<boxes.arr.length;i++){
            for(var j=0;j<boxes.arr[i].row.length;j++){
                var box = boxes.arr[i].row[j];
                if(box){
                    box.update();
                    if(box.is_moving){
                        if(box.body.y >= (box.last_y+box_width+box_space)){
                            box.body.y = box.last_y+box_width+box_space;
                            //console.log(box.body.y,' ',box.last_y);
                            box.body.velocity.y = 0;
                            box.is_moving = false;
                        }
                    }
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
    if(boxes.rows<3&&game.isRunning){
        var newrow = {row:[]};
        boxes.arr.push(newrow);
        for(var a=0;a<box_total;a++){
            newrow.row[a] = new MyBox(boxpos.x,boxpos.y,box_width,'haha');
            newrow.row[a].vessel.i = boxes.arr.length -1;
            newrow.row[a].vessel.j = a;
            boxpos.x += box_width+box_space;
        }
        newrow.length = box_total;
        boxpos.resetx();
        boxes.rows++;

        for(var i=0;i<boxes.arr.length;i++){
            //console.log(boxes.arr[i].row);
            for(var j=0;j<boxes.arr[i].row.length;j++){
                var box = boxes.arr[i].row[j];
                if(box){
                    box.is_moving = true;
                    box.last_y = box.body.y;
                    box.body.velocity.y = box_width*2;
                }
            }
        }
    }

    timeinterval = setTimeout(timecount,5000);
}

