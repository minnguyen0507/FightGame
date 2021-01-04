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

        console.log("onUpdateStateCall+++++++++++++++++++++++++111")
        console.log(msgData)
        

    },

    onUpdateUnitDirCall(msgData){

        console.log("onUpdateUnitDirCall+++++++++++++++++++++++++222")
        console.log(msgData)

    }, 

     updateClientServerCmd(dt){
        if(this.akClientServerMsg.length > 0)
        {
            var clientServermsg = this.akClientServerMsg.shift();
            var playerId = clientServermsg.playerId;
            var msgData = clientServermsg.data;

            console.log("++++++updateClientServerCmd+++++")
            console.log(clientServermsg)
            this.DoHandleMsg(msgData);
        }

    },

    PushClientServerMsg(serverMSg){

        console.log("++++++++PushClientServerMsg++++++++++1111  ")
        console.log(serverMSg)


        this.akClientServerMsg.push(serverMSg)
    },

    DoHandleMsg(MSgData)
    {
        console.log("++++++++DoHandleMsg+++++++++++++++++++++++1111")
        var msgFun = this.MsgHandle[MSgData.msgId];       
        if(msgFun != null)
        {
            console.log("++++++++DoHandleMsg+++++++++++++++++++++++2222")
            msgFun(MSgData.MsgData);
        }
    },   

});

module.exports = {eMsgId,cClientServerMsg};

