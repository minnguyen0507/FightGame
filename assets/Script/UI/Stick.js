

cc.Class({
    extends: cc.Component,

    properties: {
      
        stickBGR:0,       
        m_pArrow:null,
        pStickCenter:null,
        m_fAngle:0,    
        m_fOldAngle:0,
        m_pMainPlayer:null,
    },

    start () {
        var pStickBg = this.node;
        this.m_pArrow = pStickBg.getChildByName("stickArrow");
        this.m_pArrow.active = false;
        this.pStickCenter = pStickBg.getChildByName("stickMid");
        this.stickBGR = pStickBg.width * 0.5;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled,this);
        this.stickBGPosition = cc.v2(0,0);     

        this.m_pMainPlayer = cc.LogicMgr.getEntityMgr().pMainPlayer;  
    },
    getAnglePosition:function(r,angle)
    {
        return cc.v2(r * Math.cos(angle),r * Math.sin(angle));
    },
    onTouchBegan:function(event)
    {      
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        // 得到摇杆与触屏点所形成的角度
        var pvecDes = touchPos.sub(this.stickBGPosition);      
        var angle = Math.atan2(pvecDes.y,pvecDes.x); 
        var dist = (this.stickBGPosition.x - touchPos.x) * (this.stickBGPosition.x - touchPos.x) +
                    (this.stickBGPosition.y - touchPos.y) * (this.stickBGPosition.y - touchPos.y);
            
        var rad = this.stickBGR * this.stickBGR;
        if(dist >= rad)
        {
            var tempPos = this.getAnglePosition(this.stickBGR,angle);
            this.pStickCenter.setPosition(tempPos.add(this.stickBGPosition));
        }else
        {
            this.pStickCenter.setPosition(touchPos);
        }
        this.m_fAngle = angle;
        this.m_pArrow.active = true;
        //cc.log("this.m_fAngle begin+++   " + this.m_fAngle)
        this.updateArrow();
    },

    onTouchMoved:function(event)
    {         
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());       
         var pvecDes = touchPos.sub(this.stickBGPosition);
        var angle = Math.atan2(pvecDes.y,pvecDes.x); 
        var dist = (this.stickBGPosition.x - touchPos.x) * (this.stickBGPosition.x - touchPos.x) +
                   (this.stickBGPosition.y - touchPos.y) * (this.stickBGPosition.y - touchPos.y);
            
        var rad = this.stickBGR * this.stickBGR;
        if(dist >= rad)
        {
            var tempPos = this.getAnglePosition(this.stickBGR,angle);
            this.pStickCenter.setPosition(tempPos.add(this.stickBGPosition));

        }else
        {
            this.pStickCenter.setPosition(touchPos);
        }

        this.m_fAngle = angle;
       // cc.log("this.m_fAngle move+++   " + this.m_fAngle);
        this.updateArrow();
        if (this.m_pMainPlayer.isInState(cc.eEntityState.eESStand)){
            var msgData = {}
            msgData.msgId = cc.eMsgId.eMsgUpdateState;        
            msgData.MsgData =  cc.eEntityState.eESMove;      
            cc.WeixinSDK.sendServerMsg(msgData);  
        }  
    },

    onTouchEnded:function(event)
    {
       
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());       
        this.pStickCenter.stopAllActions();
        this.pStickCenter.runAction(cc.moveTo(0.08, this.stickBGPosition));
        //this.m_fAngle = 0.0;
        this.m_pArrow.active = false;        

        var msgData = {}
        msgData.msgId = cc.eMsgId.eMsgUpdateState;        
        msgData.MsgData =  cc.eEntityState.eESStand;      
        cc.WeixinSDK.sendServerMsg(msgData);
    },

    onTouchCancelled:function(event)
    {
        //cc.log("++++++++++++onTouchCancelled+++++++++");
        this.onTouchEnded(event);
    },

    updateArrow:function()
    {
        if(this.m_pArrow)
        {
            var tempPos = this.getAnglePosition(this.stickBGR,this.m_fAngle);
            this.m_pArrow.setPosition(tempPos.add(this.stickBGPosition));          
            this.m_pArrow.angle = this.m_fAngle / Math.PI * 180
        }
    },

    update (dt) {
       
        var nowAngle = this.m_fAngle.toFixed(2);
        if(this.m_fOldAngle != nowAngle)
        {
            this.m_fOldAngle = nowAngle;             
            var msgData = {}
            msgData.msgId = cc.eMsgId.eMsgUnitDir;        
            msgData.MsgData =  nowAngle;       
            cc.WeixinSDK.sendServerMsg(msgData);        
        }      
    },
});
