var eMsgId = cc.Enum({
    eMsgIdNull:0,
    eMsgUpdateState:1,
    eMsgIdNum:2,

});

var cClientServerMsg = cc.Class({

     properties: {
        MsgHandle:[],
        akClientServerMsg:[],
      
    },

    init(){
         this.MsgHandle[eMsgId.eMsgUpdateState] = this.onUpdateStateCall;
    },  


    onUpdateStateCall(msgData){

    }, 

     updateClientGuiCmd(dt){
        if(this.akClientServerMsg.length > 0)
        {
            var clientServermsg = this.akClientServerMsg.shift();
            this.DoHandleMsg(clientServermsg);
        }

    },

    PushClientServerMsg:function(serverMSg){
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

