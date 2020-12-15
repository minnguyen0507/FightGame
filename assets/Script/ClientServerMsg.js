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


    onUpdateStateCall(msgData){

    },

    onUpdateUnitDirCall(msgData){

    }, 

     updateClientGuiCmd(dt){
        if(this.akClientServerMsg.length > 0)
        {
            var clientServermsg = this.akClientServerMsg.shift();
            var playerId = clientServermsg.playerId;
            var msgData = clientServermsg.data;
            this.DoHandleMsg(msgData);
        }

    },

    PushClientServerMsg(serverMSg){
        this.akClientServerMsg.push(serverMSg)
    },

    DoHandleMsg(MSgData)
    {
        var msgFun = this.MsgHandle[MSgData.msgId];       
        if(msgFun != null)
        {
            msgFun(MSgData.MsgData);
        }
    },   

});

module.exports = {eMsgId,cClientServerMsg};

