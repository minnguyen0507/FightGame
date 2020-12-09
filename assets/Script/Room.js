
cc.Class({
    extends: cc.Component,

    properties: {
       roomInfo:null,
       headRootLayer:null,
    },
    // onLoad () {},

    start () {
        var roomMgr = cc.WeixinSDK.getRoomMgr();
        var roomInfo = roomMgr.roomInfo;
        this.roomInfo = roomInfo;

        this.headRootLayer = this.node.getChildByName("HeadLayout"); 
        console.log(roomInfo);

        this.initRoomUi();
    },

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

        console.log(akCamp1Players)

        for(var key in akCamp1Players) {
            var tempPlayer = akCamp1Players[key];
            var tempIndex = Number(key) + 1;
            var headNodeStr = "Camp1HeadNode" + tempIndex;
            console.log(headNodeStr);
            var headNode = pSelf.headRootLayer.getChildByName(headNodeStr);
            
            cc.FunctionHelp.setHeadIcon(headNode,tempPlayer.customProfile);    
        }

        for(var key in akCamp2Players) {
            var tempPlayer = akCamp2Players[key];
            var tempIndex = Number(key) +1;
            var headNodeStr = "Camp2HeadNode" + tempIndex;
            var headNode = pSelf.headRootLayer.getChildByName(headNodeStr);
            
            cc.FunctionHelp.setHeadIcon(headNode,tempPlayer.customProfile);    
        }
    },



    // update (dt) {},
});
