/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var MyCircle=Class(MyPhyObject,{
    construct: function(x,y,radius,speed) {
        this.radius = radius;
        this.speed  = speed;
        this.super(x,y);

        //debug
        this.body.velocity.y = this.body.velocity.x = 1;

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
