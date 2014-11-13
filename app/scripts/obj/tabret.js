/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var MyTabRet=Class(MyPhyObject,{
    construct: function(x,y,wdith,height,colour) {
        this.parent(x);
        this.parent(y);
        this.wdith = wdith;
        this.height = height;
    },
    display:function(){
        this.feather.lineStyle(0);
        this.feather.beginFill(0xffffff);
        this.feather.drawRect(-this.wdith/2, -this.height/2, this.wdith, this.height);
        this.feather.endFill();
        this.body.setRectangle(this.wdith,this.height);
    }
});
