/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var MyPhyObject = Class({
    construct: function(x,y,colour) {
        this.x = x;
        this.y = y;
        this.feather = game.add.graphics(this.x, this.y);
        this.sprite = game.add.sprite(this.x, this.y);
        game.physics.p2.enable(this.sprite);
        this.body = this.sprite.body;
        this.body.parent = this;
        this.display();
    },
    display:function(){},
    update:function(){
        this.feather.x = this.body.x;
        this.feather.y = this.body.y;
        if(this.motion){
            this.motion();
        }
    },
    destroy:function(){
        this.sprite.kill();
        try{
            this.sprite.parent.removeChild(this.sprite);
            this.feather.parent.removeChild(this.feather);
        }catch(error){
        }
    },
    reset:function(x,y,velocity){
        console.log(this.body.y);
        this.body.x = x;
        this.body.y = y;
        if(!velocity){
            velocity = [0,0];
        }
        /*this.body.velocity.x = velocity[0];
        this.body.velocity.y = velocity[1];*/
    }
});

var MyCircle=Class(MyPhyObject,{
    construct: function(x,y,radius,speed) {
        this.radius = radius;
        this.speed  = speed;
        this.super(x,y);

        //debug
        this.body.velocity.y = -1;
        this.body.velocity.x = 0;

    },
    display:function(){
        this.feather.lineStyle(0);
        this.feather.beginFill(0xffffff);
        this.feather.drawCircle(0, 0,this.radius*2+0.5);
        this.feather.endFill();
        this.body.setCircle(this.radius);
    },
    motion:function(){
        if(this.body.velocity.y != 0){
            var angle = Math.atan2(this.body.velocity.y,this.body.velocity.x);
            this.body.velocity.x = Math.cos(angle)*this.speed;
            this.body.velocity.y = Math.sin(angle)*this.speed;
        }
    }
});

var MyTabRet=Class(MyPhyObject,{
    construct: function(x,y,width,height,colour) {
        this.width = width;
        this.height = height;
        this.super(x,y);
        this.body.kinematic = true;
    },
    display:function(){
        this.feather.lineStyle(0);
        this.feather.beginFill(0xffffff);
        this.feather.drawRect(-this.width/2, -this.height/2, this.width, this.height);
        this.feather.endFill();
        this.body.setRectangle(this.width,this.height);
    }
});

var MyBox=Class(MyPhyObject,{
    construct: function(x,y,size,type) {
        this.width = size;
        this.height = size;
        this.type = type;
        this.super(x,y);
        this.body.kinematic = true;

        this.is_moving = false;
        this.last_y = y;
        this.vessel = {i:0,j:0};
    },
    display:function(){
        switch (this.type){
            default :
            case 'normal':{
                this.feather.lineStyle(0);
                this.feather.beginFill(0xffffff);
                this.feather.drawRect(-this.width/2, -this.height/2, this.width, this.height);
                this.feather.endFill();
                this.body.setRectangle(this.width,this.height);
                break;
            }
            case 'haha':{
                this.feather.lineStyle(0);
                this.feather.beginFill(0xffffff);
                this.feather.drawRect(-this.width/2, -this.height/2, this.width, this.height);
                this.feather.endFill();
                this.feather.beginFill(0x2c3e50);
                this.feather.drawRect(-this.width*0.6/2, -this.height*0.6/2, this.width*0.6, this.height*0.6);
                this.feather.endFill();
                this.body.setRectangle(this.width,this.height);
                break;
            }
        }
    }
});

