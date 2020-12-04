cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {      
        this.matchNode =  this.node.getChildByName("MatchBtn"); 
        this.headIconNode = this.node.getChildByName("HeadIconNode"); 
        
    },

    start (){
         cc.ClientGuiCmd.registerClientGuiMsg("onLoginSuccess",this.onLoginSuccessCall,this);
    },


    setBeginMatch(){

        var btnlabel = cc.find("Background/Label",this.matchNode).getComponent(cc.Label);
        this.count = 0;

        var pSelf = this;
        var callback = function () {
            if (pSelf.count === 100) {                
                btnlabel.unschedule(callback);
            }           
            pSelf.count++;
            var strTemp = cc.FunctionHelp.getTimeString(pSelf.count);
            strTemp = "匹配" + "("+strTemp+")";
            btnlabel.string = strTemp;
        }
        btnlabel.schedule(callback, 1);
        btnlabel.string = "匹配..."
    },



    onClickMatchBtn:function(Btn){
        console.log("click match Btn");
        var roomMgr = cc.WeixinSDK.getRoomMgr();
        if (roomMgr === null ){
            return;
        }

        if (cc.gameData.weixinUserInfo === null){
            return;
        }

        var userinfo = cc.gameData.weixinUserInfo;

        const playerInfo = {
                name: userinfo.nickName,
                customPlayerStatus: 1,
                customProfile: userinfo.avatarUrl,
                matchAttributes: [{
                    name: "skill1",
                    value: 99,
                }]
            };

        const matchPlayersPara = {
            playerInfo,
            matchCode: "match-4jee1g3a",
        };
        this.setBeginMatch();
        // 发起匹配
        roomMgr.matchPlayers(matchPlayersPara, event => {
            if (event.code === 0) {
                console.log("请求成功");
                console.log(event);
                roomMgr.initRoom(event.data.roomInfo);
            } else {
                console.log("请求失败", event.code);
            }
        });

        // 监听匹配结果
        roomMgr.onMatch = (event) => {

            console.log("监听匹配回调。。。。");
            console.log(event);
            if (event.data.errCode === MGOBE.ErrCode.EC_OK) {
                console.log("组队匹配成功");
                //roomMgr.initRoom(event.data.roomInfo);
                return;
            }
            // 匹配失败
            // ...
        };

    }, 

    onLoginSuccessCall(msgdata,pSelf){

        cc.log("+++++++onLoginSuccessCall");
        if(pSelf == null){
            return;
        }
        console.log(msgdata)
       
    },  

    // called every frame
    update: function (dt) {

    },
});
