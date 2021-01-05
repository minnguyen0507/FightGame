var eMsgId = cc.Enum({
    eMsgIdNull:0,
    eMsgUpdateState:1,
    eMsgUnitDir:2,
    eMsgIdNum:3,

});

var cClientServerMsg = cc.Class({

     properties: {
        MsgHandle:[],
        akClientServerMsg:[],
      
    },

    init(){
         this.MsgHandle[eMsgId.eMsgUpdateState] = this.onUpdateStateCall;
         this.MsgHandle[eMsgId.eMsgUnitDir] = this.onUpdateUnitDirCall;
    },  


    onUpdateStateCall(playerId,msgData){

        console.log("onUpdateStateCall+++++++++++++++++++++++++111")
        console.log(msgData)
        

    },

    onUpdateUnitDirCall(playerId,msgData){

        console.log("onUpdateUnitDirCall+++++++++++++++++++++++++222")
        console.log(msgData)

    }, 

     updateClientServerCmd(dt){
        if(this.akClientServerMsg.length > 0)
        {
            var clientServermsg = this.akClientServerMsg.shift();
            var playerId = clientServermsg.playerId;
            var msgData = clientServermsg.data;         
            this.DoHandleMsg(playerId,msgData);
        }

    },

    PushClientServerMsg(serverMSg){      

        this.akClientServerMsg.push(serverMSg)
    },

    DoHandleMsg(playerId,MSgData)
    {
       
        var msgFun = this.MsgHandle[MSgData.msgId];       
        if(msgFun != null)
        {           
            msgFun(playerId,MSgData.MsgData);
        }
    },   

});

module.exports = {eMsgId,cClientServerMsg};

