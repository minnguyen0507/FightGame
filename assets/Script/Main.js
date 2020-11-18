// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var cWeixinSdk = require("WeixinSDK").WeixinSDK; 

cc.gameData = require("gameData");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.game.addPersistRootNode(this.node);

        cc.WeixinSDK = new cWeixinSdk;

        var pSelf = this;
        var sucFun = function(obj){
            cc.gameData.openid = obj.openid
            cc.WeixinSDK.weiXinSDkInit();
        }
        var failFun = function(){
            console.log("+++++++login fail");
        }

        cc.WeixinSDK.gameLogin(sucFun,failFun);

        
    },

    // update (dt) {},
});
