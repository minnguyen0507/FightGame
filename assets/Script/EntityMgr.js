var cEntity = require("Entity").cEntity; 


var EntityMgr = cc.Class({

        properties: {
            pMainPlayer:null,
            akPlayerMap:[],      
        },


        createEntity(entityType,unitId){
            var tempEntity = new cEntity();
           
            tempEntity.init(entityType,unitId);

            if (entityType == cc.gameEnumDef.eEntityType.eETMainPlayer){
                this.pMainPlayer = tempEntity;
            }else
            {
                console.log("createEntity++++++++++++++++  ");
                console.log(unitId);
                this.akPlayerMap.push(tempEntity);
            }
           
            return tempEntity;
        },

        onRelease(){
            if (this.pMainPlayer != null){
                this.pMainPlayer.destroy(); 
            }
        },

        getEntityById(playerId){


             if (this.pMainPlayer.m_entityId === playerId){
                 return this.pMainPlayer;
             }
             this.akPlayerMap.forEach(function(element) {
                 if(element.m_entityId === playerId ){
                     return element
                 }                 
             }, this);
             return null;           
        },  

        syncPosition(){
            this.pMainPlayer.syncPosition();
            this.akPlayerMap.forEach(function(element) {
                element.syncPosition();              
            }, this);
        },      

        changeEntityState(playerId,tempState){

            console.log("changeEntityState++++++++++++++++  ");
            console.log(playerId);
            var tempEntity = this.getEntityById(playerId);
            if(tempEntity != null){
                tempEntity.DoChangeState(tempState)
            }
        },

        changeEntityDir(playerId,fDir){
            var tempEntity = this.getEntityById(playerId);
            if(tempEntity != null){
                tempEntity.DoChangeDir(fDir)
            }
        },      

        //逻辑帧驱动
        updateFrame(){
            if (this.pMainPlayer != null){
                this.pMainPlayer.Update();
            }
            this.akPlayerMap.forEach(function(element) {
                element.Update();              
            }, this);
        }


});


module.exports = {EntityMgr};
