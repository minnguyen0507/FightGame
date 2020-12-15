var cEntity = require("Entity").cEntity; 
var eEntityType = require("Entity").cEntity; 

var EntityMgr = cc.Class({

        createEntity(entityType,unitId,callFun){
            var tempEntity = new cEntity()
            tempEntity.init(entityType,unitId,callFun);
        }


});


module.exports = {EntityMgr};
