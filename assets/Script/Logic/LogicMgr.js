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
        var playerList = this.m_kRoomInfo.playerList;

        for(var iloop=0;iloop<playerList.length;iloop++) {
            var playRoomInfo = playerList[iloop]
            var kPlayerInfo = {};
            kPlayerInfo.id = playRoomInfo.id;
            kPlayerInfo.kName = playRoomInfo.name;
            this.m_akFrameInitPlayerInfo.push(kPlayerInfo);
        }
        
    },

    getFrameInitPlayers(){
        return this.m_akFrameInitPlayerInfo;
    },


    //逻辑帧更新
    updateFrame(){
        if(this.m_pEntityMgr){
            this.m_pEntityMgr.updateFrame();
        } 
    },   

});


module.exports = {cLogicMgr};
