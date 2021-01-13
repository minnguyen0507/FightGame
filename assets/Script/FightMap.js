

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

        var akPlayersInitInfo = cc.LogicMgr.getFrameInitPlayers();
        console.log("进入战斗场景");
        console.log(akPlayersInitInfo);
        akPlayersInitInfo.forEach(function(tempPlyer){
           var playerOpenId = tempPlyer.openid;
           var tempEntity = null;
           if(cc.LogicMgr.isMainPlyer(playerOpenId)){
                console.log("create main player+++++++++1111 ");
                tempEntity = pSelf.m_pTempEntityMgr.createEntity(cc.gameEnumDef.eEntityType.eETMainPlayer,tempPlyer.id);                 
           }else{
                tempEntity = pSelf.m_pTempEntityMgr.createEntity(cc.gameEnumDef.eEntityType.eETPlayer,tempPlyer.id);
           }
           if(tempEntity) {
                pSelf.m_pMap.addChild(tempEntity);
                tempEntity.setPosition(winsize.width/2,winsize.height/2);
                tempEntity.initPlayerData(tempPlyer);
           }
       });       
    },


    initMapPos()
    {
       // var winsize = cc.director.getWinSize();
       // this.m_pMap.setPosition(-winsize.width/2,-winsize.height/2);
    },  

  

    update (dt) {
        // var mainPlayer = this.m_pTempEntityMgr.pMainPlayer;
        // var mainPos = mainPlayer.getPosition();       
        // this.m_pMap.setPosition(-mainPos.x,-mainPos.y);      
        // this.m_pTempEntityMgr.syncPosition();
    },

    onDestroy(){        
        if(this.m_pEntityMgr != null)
        {
            this.m_pEntityMgr.onRelease();
        }         
    },
});
