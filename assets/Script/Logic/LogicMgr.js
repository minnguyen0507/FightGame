var cEntityMgr = require("EntityMgr").EntityMgr; 


var cLogicMgr = cc.Class({ 
    properties: {
        m_pEntityMgr:null, 
    },


    getEntityMgr(){
        return this.m_pEntityMgr;
    },
    
    initLogic(){
         this.m_pEntityMgr = new cEntityMgr();
    },


    //逻辑帧更新
    updateFrame(){
        if(this.m_pEntityMgr){
            this.m_pEntityMgr.updateFrame();
        } 
    },

});


module.exports = {cLogicMgr};
