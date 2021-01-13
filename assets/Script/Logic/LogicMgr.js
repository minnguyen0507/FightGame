var cEntityMgr = require("EntityMgr").EntityMgr; 

/*var cFrameInitPlayerInfo ={
    kName:"",
    kId:"000000",
},*/

var cLogicMgr = cc.Class({ 
    properties: {
        m_pEntityMgr:null, 
        m_akFightFrames:[], //追帧时用
        m_kRoomInfo:null,   //战斗开始时房间消息(玩家的初始状态)
        m_akFrameInitPlayerInfo:[],        
    },


    getEntityMgr(){
        return this.m_pEntityMgr;
    },

    initLogic(){
         this.m_pEntityMgr = new cEntityMgr();
    },

    setLogicRoomDefauleInfo(roomInitInfo){
        this.m_kRoomInfo = roomInitInfo;

        console.log(this.m_kRoomInfo);
    },

    pushFrame(frameInfo){
        this.m_akFightFrames.push(frameInfo);
    },

    clearFrames(){
        this.m_akFightFrames = [];
    },

    reStartFrames(){
        setDefauleFrameState();
        frames.forEach(frame => {
            calcFrame(frame);
        });
    },

    //战斗开始初始状态
    setDefauleFrameState(){

        console.log(this.m_kRoomInfo)

        var playerList = this.m_kRoomInfo.playerList;

        for(var iloop=0;iloop<playerList.length;iloop++) {
            var playRoomInfo = playerList[iloop]
            var kPlayerInfo = {};
            kPlayerInfo.id = playRoomInfo.id;
            kPlayerInfo.kName = playRoomInfo.name;
            kPlayerInfo.isRobot = playRoomInfo.isRobot;
            if(kPlayerInfo.isRobot == false) {
                //自定义数据
                var userInfoObj = JSON.parse(playRoomInfo.customProfile);
                kPlayerInfo.avatarUrl = userInfoObj.avatarUrl;
                kPlayerInfo.openid = userInfoObj.openid;
            }
            this.m_akFrameInitPlayerInfo.push(kPlayerInfo);
        }
        
    },

    getFrameInitPlayers(){
        return this.m_akFrameInitPlayerInfo;
    },

    isMainPlyer(playOpenId){

        console.log("isMainPlayer++++++++++++++++++1111");
        console.log(playOpenId);
        console.log(cc.gameData.openid);

        return (cc.gameData.openid===playOpenId);
    },


    //逻辑帧更新
    updateFrame(){
        if(this.m_pEntityMgr){
            this.m_pEntityMgr.updateFrame();
        } 
    },   

});


module.exports = {cLogicMgr};
