var enumEntityState = require("EnumDef").eEntityState;

var cEntity = cc.Class({
    extends: cc.Node,

    properties: {
        m_entityId:0,
        m_entityType:0,
        m_State:enumEntityState.eESNull,
       // m_pUnitBody:null,     
       // m_p

    },

  
    init(entityType,unitId) {
       
        this.m_entityId = unitId;
        this.m_entityType = entityType;
        var pSelf= this;

        
        cc.resources.load("UiPrefab/Unit", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            var headIcon = newNode.getChildByName("headIcon");
            cc.FunctionHelp.setHeadIcon(headIcon,"");  
            headIcon.Scale = 0.6;
           // pSelf.m_pUnitBody = newNode;
            newNode.name = "ObjBody";
            pSelf.addChild(newNode)
        });  
          
    },

    onDestroy(){
        cc.resources.release("UiPrefab/Unit");
    },
   
});

module.exports = {cEntity};
