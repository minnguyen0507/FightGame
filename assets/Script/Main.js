
var cWeixinSdk = require("WeixinSDK").WeixinSDK; 

cc.gameData = require("gameData");
var ClientGuiCmd = require("ClientGuiCmd").ClientGuiCmd;

var cClientServerMsg = require("ClientServerMsg").cClientServerMsg

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

        console.log("main++++++++++++++++++start")
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

        if(cc.ClientServerMsg === undefined){
            cc.ClientServerMsg = new cClientServerMsg;
            cc.ClientServerMsg.init();
        } 

        var pSelf = this;
        var sucFun = function(obj){
            cc.gameData.openid = obj.openid

            console.log(cc.gameData)
            cc.WeixinSDK.weiXinSDkInit();  

            var getUserInfoFun = function(){
                // var msgCmd = {};
                // msgCmd.UiMsgName = 'onLoginSuccess';
                // msgCmd.akMsgParame = cc.gameData.weixinUserInfo;  
                // cc.ClientGuiCmd.PushClientGuiMsg(msgCmd); 

                 cc.director.loadScene("login");  
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
