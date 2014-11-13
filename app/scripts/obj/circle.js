/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var MyCircle=Class(MyPhyObject,{
    construct: function(x,y,radius,colour) {
        this.parent(x,y);
        this.radius = radius;
        this.new();
    },
    new:function(){
        this.feather.lineStyle(0);
        this.feather.beginFill(0xffffff);
        this.feather.drawCircle(0, 0,this.radius*2+0.5);
        this.feather.endFill();
        this.body.setCircle(this.radius);
    }
});
