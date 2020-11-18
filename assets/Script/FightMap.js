
cc.Class({
    extends: cc.Component,

    properties: {       
        m_pMap:null,
        m_startPos:null,         
    },

     onLoad () {

           this.m_pMap = this.node.getChildByName("FightMap");  
     },

    start () {
        this.initMapPos();
    },


    initMapPos()
    {
        var winsize = cc.director.getWinSize();
        this.m_pMap.setPosition(-winsize.width/2,-winsize.height/2);
    },  

    // update (dt) {},
});
