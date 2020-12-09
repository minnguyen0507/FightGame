
var cWeixinSdk = require("WeixinSDK").WeixinSDK; 

cc.gameData = require("gameData");
var ClientGuiCmd = require("ClientGuiCmd").ClientGuiCmd;

cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    editor: {
        executionOrder: -1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.game.addPersistRootNode(this.node);

        if(cc.FunctionHelp == null)
        {
            cc.FunctionHelp = require("HelpFun");
        }

        cc.WeixinSDK = new cWeixinSdk;

        if(cc.ClientGuiCmd === undefined){
            cc.ClientGuiCmd = new ClientGuiCmd;
            cc.ClientGuiCmd.initClientGuiCmd();
        }

        var pSelf = this;
        var sucFun = function(obj){
            cc.gameData.openid = obj.openid

            console.log(cc.gameData)
            cc.WeixinSDK.weiXinSDkInit();  

            var getUserInfoFun = function(){
                var msgCmd = {};
                msgCmd.UiMsgName = 'onLoginSuccess';
                msgCmd.akMsgParame = cc.gameData.weixinUserInfo;  
                cc.ClientGuiCmd.PushClientGuiMsg(msgCmd);   
            }
            cc.WeixinSDK.WeixinGetUserInfo(getUserInfoFun); 

                       
        }
        var failFun = function(){
            console.log("+++++++login fail");
        }

        cc.WeixinSDK.gameLogin(sucFun,failFun);

        
    },

     update (dt) {
        if(cc.ClientGuiCmd !== undefined){
            cc.ClientGuiCmd.updateClientGuiCmd(dt);
        }
     },   



});
