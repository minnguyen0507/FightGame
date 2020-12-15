var cEntityMgr = require("EntityMgr").EntityMgr; 


cc.Class({
    extends: cc.Component,

    properties: {       
        m_pMap:null,
        m_pEntityMgr:null, 
        m_startPos:null,         
    },

     onLoad () {
           this.m_pMap = this.node.getChildByName("FightMap");  
           this.m_pEntityMgr = new cEntityMgr();

     },

    start () {
        var pSelf = this;
        this.initMapPos();      
        var winsize = cc.director.getWinSize();  
        this.m_pEntityMgr.createEntity(cc.gameEnumDef.eEntityType.eETMainPlayer,0,
            function(entityNode){
                pSelf.m_pMap.addChild(entityNode);
                entityNode.setPosition(winsize.width/2-100,winsize.height/2);
            }
        );
    },


    initMapPos()
    {
        var winsize = cc.director.getWinSize();
        this.m_pMap.setPosition(-winsize.width/2,-winsize.height/2);
    },  

    // update (dt) {},
});
