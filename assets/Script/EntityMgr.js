var cEntity = require("Entity").cEntity; 


var EntityMgr = cc.Class({

        properties: {
            pMainPlayer:null,
            akPlayerMap:[],      
        },


        createEntity(entityType,unitId){
            var tempEntity = new cEntity();
            if (entityType == cc.gameEnumDef.eEntityType.eETMainPlayer){
                this.pMainPlayer = tempEntity;
            }
            tempEntity.init(entityType,unitId);
           
            return tempEntity;
        },

        onRelease(){
            if (this.pMainPlayer != null){
                this.pMainPlayer.destroy(); 
            }
        },

        //逻辑帧驱动
        updateFrame(){
              if (this.pMainPlayer != null){
                this.pMainPlayer.Update();
            }
        }


});


module.exports = {EntityMgr};
