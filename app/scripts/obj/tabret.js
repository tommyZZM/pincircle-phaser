/**
 * Created by 2014-11-06 on 2014/11/13.
 */
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
