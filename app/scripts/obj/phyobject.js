/**
 * Created by 2014-11-06 on 2014/11/13.
 */
var MyPhyObject = Class({
    construct: function(x,y,colour) {
        this.x = x;
        this.y = y;
        this.feather = game.add.graphics(this.x, this.y);
        this.body = game.add.sprite(this.x, this.y);
        game.physics.p2.enable(this.body);
        this.body = this.body.body;
    },
    new:function(){},
    update:function(callback){
        this.feather.x = this.body.x;
        this.feather.y = this.body.y;

        if(callback){
            if(isFunction(callback)){
                callback();
            }else{
                console.warn('PhyObject update with a wrond callback!');
            }
        }
    }
});