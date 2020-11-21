
var cWeixinSdk = require("WeixinSDK").WeixinSDK; 

cc.gameData = require("gameData");

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.game.addPersistRootNode(this.node);

        cc.WeixinSDK = new cWeixinSdk;

        var pSelf = this;
        var sucFun = function(obj){
            cc.gameData.openid = obj.openid

            console.log(cc.gameData)
            cc.WeixinSDK.weiXinSDkInit();            
        }
        var failFun = function(){
            console.log("+++++++login fail");
        }

        cc.WeixinSDK.gameLogin(sucFun,failFun);

        
    },

    // update (dt) {},
});
