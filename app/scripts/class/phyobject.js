/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var PhyObject = function(game,x,y,arg,mass){

    this.display = null;
    this.body = null;

    switch (arg.type){
        case 'cir' :{
            this.display = game.add.graphics(winWidth>>1, winHeight>>1);
            this.display.lineStyle(0);
            this.display.beginFill(0xffffff);
            this.display.drawCircle(0, 0,arg.r*2+0.5);
            this.body = game.add.sprite(winWidth>>1, winHeight>>1);
            game.physics.p2.enable(this.body);
            this.body.body.setCircle(arg.r);
            break;
        }
        default:
        case 'ret' :{
            break;
        }
    }

    this.render = function(){
        this.display.x = this.body.x;
        this.display.y = this.body.y;
    }

}