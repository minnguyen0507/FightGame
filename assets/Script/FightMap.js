


cc.Class({
    extends: cc.Component,

    properties: {       
        m_pMap:null, 
        m_startPos:null,  
        m_pTempEntityMgr:null       
    },

     onLoad () {
            this.m_pMap = this.node.getChildByName("FightMap");  
            this.m_pTempEntityMgr = cc.LogicMgr.getEntityMgr();

     },

    start () {
        var pSelf = this;
        this.initMapPos();      
        var winsize = cc.director.getWinSize();  
        var tempEntity = this.m_pTempEntityMgr.createEntity(cc.gameEnumDef.eEntityType.eETMainPlayer,0);
        pSelf.m_pMap.addChild(tempEntity);
        tempEntity.setPosition(winsize.width/2,winsize.height/2);
        cc.ClientGuiCmd.registerClientGuiMsg("onUpdateEntityState",this.onUpdateEntityStateCall,this);
        cc.ClientGuiCmd.registerClientGuiMsg("onUpdateEntityDir",this.onUpdateEntityDirCall,this);
    },


    initMapPos()
    {
       // var winsize = cc.director.getWinSize();
       // this.m_pMap.setPosition(-winsize.width/2,-winsize.height/2);
    },  

     onUpdateEntityStateCall(msgdata,pSelf){

        cc.log("+++++++onLoginSuccessCall");
       
    },  

     onUpdateEntityDirCall(msgdata,pSelf){

        cc.log("+++++++onLoginSuccessCall");
           
    },  

    update (dt) {
        var mainPlayer = this.m_pTempEntityMgr.pMainPlayer;
        var mainPos = mainPlayer.getPosition();
        this.m_pMap.setPosition(-mainPos.x,-mainPos.y);
    },

    onDestroy(){        
        cc.ClientGuiCmd.unregisterClientGuiMsg("onUpdateEntityState");
        cc.ClientGuiCmd.unregisterClientGuiMsg("onUpdateEntityDir");
        if(this.m_pEntityMgr != null)
        {
            this.m_pEntityMgr.onRelease();
        }         
    },
});
