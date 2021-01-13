
cc.Class({
    extends: cc.Component,

    properties: {
       roomInfo:null,
       headRootLayer:null,
    },
    // onLoad () {},

    start () {
       

        this.headRootLayer = this.node.getChildByName("HeadLayout"); 
        this.startTimeGo = cc.find("startGame/TimeGo",this.node).getComponent(cc.Label); 

        this.count = 0;      
        this.schedule(this.timeCallBack, 1);
        this.startTimeGo.string = "20";
        if (cc.WeixinSDK != null){
            var roomMgr = cc.WeixinSDK.getRoomMgr();
            if (roomMgr != null){
                this.roomMgr = roomMgr;
                var roomInfo = roomMgr.roomInfo;
                this.roomInfo = roomInfo;
                this.initRoomUi();
            }
        }       

        var cancelBtn = this.node.getChildByName("StartButton"); 
        cancelBtn.on('click', this.cancelBtnClick, this);
    },

    timeCallBack(){
        var pSelf = this;
        if (pSelf.count === 21) {                
            this.unschedule(this.timeCallBack);
             //开始同步帧
           // pSelf.roomMgr.startFrameSync({}, (event) =>pSelf.onStartFrameSync(event)); 
            pSelf.roomMgr.startFrameSync({},function(event){});          
        }           
        pSelf.count++;   
        var  strTemp = 21 -  pSelf.count;      
        this.startTimeGo.string = strTemp;
    },

    // onStartFrameSync(event){
       
    //     var pSelf = this;
    //     if (event.code === 0) {
    //         console.log("开始帧同步成功");
    //          cc.LogicMgr.clearFrames();
    //          cc.LogicMgr.setLogicRoomDefauleInfo(pSelf.roomInfo);   
    //          cc.director.loadScene("fight");
    //     }
    // },

    initRoomUi(){
        var pSelf = this;
        var akPlayers= this.roomInfo.playerList;       
        var playerLen = akPlayers.length;
        var akCamp1Players = [];
        var akCamp2Players = [];
        for(var iloop=0;iloop<playerLen;iloop++){
            var tempPlayer = akPlayers[iloop]
            console.log(tempPlayer)
            var teamIndex = tempPlayer.teamId;
            if (teamIndex === "0"){
                akCamp1Players[akCamp1Players.length] = tempPlayer;
            }    
            else if(teamIndex === "1"){  
                akCamp2Players[akCamp2Players.length] = tempPlayer;  
            }
        }    

        for(var key in akCamp1Players) {
            var tempPlayer = akCamp1Players[key];
            var tempIndex = Number(key) + 1;
            var headNodeStr = "Camp1HeadNode" + tempIndex;        
            var headNode = pSelf.headRootLayer.getChildByName(headNodeStr);
            console.log(tempPlayer.customProfile);
            var tempheadStr= "";

            if(tempPlayer.customProfile != ""){
                var userInfoStr = tempPlayer.customProfile;
                var tempObj = JSON.parse(userInfoStr);//这里要注意 JSON.parse 转化函数对字符串有格式的要求
                tempheadStr = tempObj.avatarUrl 
            }       
            cc.FunctionHelp.setHeadIcon(headNode,tempheadStr);    
        }

        for(var key in akCamp2Players) {
            var tempPlayer = akCamp2Players[key];
            var tempIndex = Number(key) +1;
            var headNodeStr = "Camp2HeadNode" + tempIndex;
            var headNode = pSelf.headRootLayer.getChildByName(headNodeStr);
            
            console.log(tempPlayer.customProfile);
             var tempheadStr= "";
            if(tempPlayer.customProfile != "" ) {
                var userInfoStr = tempPlayer.customProfile;  
                var tempObj = JSON.parse(userInfoStr);  
                tempheadStr = tempObj.avatarUrl 
            }                  
            cc.FunctionHelp.setHeadIcon(headNode,tempheadStr);   
        }
    },

    cancelBtnClick(pram){

        console.log("++++++++cancelBtnClick+++++++")
        var roomMgr = cc.WeixinSDK.getRoomMgr();
        if (roomMgr === null ){
            return;
        }
        const cancelMatchPara = {
            matchType: MGOBE.ENUM.MatchType.PLAYER_COMPLEX,
        };

        roomMgr.cancelPlayerMatch(cancelMatchPara, event =>{
            console.log("取消匹配。。。。。。")
            console.log(event)
            cc.director.loadScene("login");
        });
    },

    onDestroy(){
        this.unschedule(this.timeCallBack);
    },
});
