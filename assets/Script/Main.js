
var cWeixinSdk = require("WeixinSDK").WeixinSDK; 

cc.gameData = require("gameData");
var ClientGuiCmd = require("ClientGuiCmd").ClientGuiCmd;

var cClientServerMsg = require("ClientServerMsg").cClientServerMsg;
cc.eMsgId = require("ClientServerMsg").eMsgId
cc.eEntityState = require("EnumDef").eEntityState;

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

        if(cc.ClientServerMsg === undefined){
            cc.ClientServerMsg = new cClientServerMsg;
            cc.ClientServerMsg.init();
        } 

        if(cc.gameEnumDef === undefined ){
            cc.gameEnumDef = {};
            cc.gameEnumDef.eEntityType = require("EnumDef").eEntityType;            
        }

        this.initPhysics();        

        var pSelf = this;
        var sucFun = function(obj){
            cc.gameData.openid = obj.openid

            if( cc.gameData.openid == 0 ){
                 cc.director.loadScene("login"); 
            }else{
                console.log(cc.gameData)
                cc.WeixinSDK.weiXinSDkInit();  

                var getUserInfoFun = function(){
                    
                    cc.director.loadScene("login"); 
                }
                cc.WeixinSDK.WeixinGetUserInfo(getUserInfoFun); 
            }

           
           

                       
        }
        var failFun = function(){
            console.log("+++++++login fail");
        }

        cc.WeixinSDK.gameLogin(sucFun,failFun);

        
    },

     update (dt) {
       
        if(cc.ClientGuiCmd != undefined){
            cc.ClientGuiCmd.updateClientGuiCmd(dt);
        }
        if(cc.ClientServerMsg != undefined){

            cc.ClientServerMsg.updateClientServerCmd(dt);
        }
     },  


     initPhysics(){

        //物理系统
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        //    manager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //      cc.PhysicsManager.DrawBits.e_pairBit |
        //      cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //      cc.PhysicsManager.DrawBits.e_jointBit |
        //      cc.PhysicsManager.DrawBits.e_shapeBit
        //      ;
        manager.debugDrawFlags = 0;
        //重力加速度
        cc.director.getPhysicsManager().gravity = cc.v2(0,0);

        // 开启物理步长的设置
        manager.enabledAccumulator = true;

        // 物理步长，默认 FIXED_TIME_STEP 是 1/60
        manager.FIXED_TIME_STEP = 1/30;

        // 每次更新物理系统处理速度的迭代次数，默认为 10
        manager.VELOCITY_ITERATIONS = 6;

        // 每次更新物理系统处理位置的迭代次数，默认为 10
        manager.POSITION_ITERATIONS = 6;
     } ,

    onDestroy(){

        console.log("main node ++++++++++++destroy +++++ 11")

    },



});
