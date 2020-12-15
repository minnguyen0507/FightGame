var enumEntityState = require("EnumDef").eEntityState;

var cEntity = cc.Class({
  

    properties: {
        m_entityId:0,
        m_entityType:0,
        m_State:enumEntityState.eESNull,
        m_pUnitBody:null,     
        
    },

  
    init(entityType,unitId,callFun) {
       
        this.m_entityId = unitId;
        this.m_entityType = entityType;
        var pSelf= this;

        
        cc.resources.load("UiPrefab/Unit", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            var headIcon = newNode.getChildByName("headIcon");
            cc.FunctionHelp.setHeadIcon(headIcon,"");  
            headIcon.Scale = 0.6;
            pSelf.m_pUnitBody = newNode;
            callFun(newNode)
        });
    },
   
});

module.exports = {cEntity};
