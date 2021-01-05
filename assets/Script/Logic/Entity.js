var enumEntityState = require("EnumDef").eEntityState;
var cPropertyData = require("EntityPropertyData").cEntityPropertyData;


var cEntity = cc.Class({
    extends: cc.Node,

    properties: {
        m_entityId:0,
        m_entityType:0,
        m_pState:null,
        m_pUnitBody:null, 
        m_pEntityPropertyData:null,    
       // m_p
    },

  
    init(entityType,unitId) {
       
        this.m_entityId             = unitId;
        this.m_entityType           = entityType;
        this.m_pEntityPropertyData  = new cPropertyData();
        var pSelf= this;

        
        cc.resources.load("UiPrefab/Unit", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            var headIcon = newNode.getChildByName("headIcon");
            cc.FunctionHelp.setHeadIcon(headIcon,"");  
            headIcon.Scale = 0.6;
            newNode.name = "ObjBody";
            pSelf.addChild(newNode);
            pSelf.initEnd();
        });            
    },


    initEnd(){
        var rigidBody = this.addComponent(cc.RigidBody);
        rigidBody.active = true;      
        rigidBody.fixedRotation = true; 
        this.m_pUnitBody = rigidBody;
    },

    onDestroy(){
        cc.resources.release("UiPrefab/Unit");

        this.m_pEntityPropertyData=null;

        if(this.m_pUnitBody != null)
        {
           this.m_pUnitBody.destroy(); 
        }

    },

    ChangeState(pNewState){

        this.m_pState.Exit(this);
        this.m_pState = pNewState;
        this.m_pState.Enter(this);

    },

    Update(){
        if(this.m_pState) {
           this.m_pState.Execute(this) ;
        }
    }
   
});

module.exports = {cEntity};
