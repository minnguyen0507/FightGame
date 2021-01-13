var enumEntityState = require("EnumDef").eEntityState;
var cPropertyData = require("EntityPropertyData").cEntityPropertyData;
var cRunState = require("State").cRunState;
var cStandState = require("State").cStandState;


var cEntity = cc.Class({
    extends: cc.Node,

    properties: {
        m_entityId:0,
        m_entityType:0,
        m_pState:null,
        m_curtState:0,
        m_pUnitBody:null, 
        m_pEntityPropertyData:null,   
        m_fDir:0, 
        m_oldMoveForce:null,
        //局外传来的数据
        m_pServerPlayerData:null,
    },

  
    init(entityType,unitId) {

        console.log("Entity init++++++++++++++++++++++=1111");
       
        this.m_entityId             = unitId;
        this.m_entityType           = entityType;
        this.m_pEntityPropertyData  = new cPropertyData();
        

        this.m_oldMoveForce = cc.v2(0,0);
        
        var pSelf= this;

        cc.resources.load("UiPrefab/Unit", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            var headIcon = newNode.getChildByName("headIcon");
            cc.FunctionHelp.setHeadIcon(headIcon,"");  
            headIcon.scale = 0.5;
            newNode.name = "ObjBody";
            pSelf.addChild(newNode);
            pSelf.initEnd();
        });            
    },

    initPlayerData(playerData){
        this.m_pServerPlayerData = playerData;
    },


    initEnd(){
        var nameStr = "NodePlayer" + this.m_pServerPlayerData.id;
        this.name = nameStr;

        var unitNode = this.getChildByName("ObjBody");
        var unitNameNode = unitNode.getChildByName("UnitName"); 
        unitNameNode.getComponent(cc.Label).string = this.m_pServerPlayerData.kName;

        var rigidBody = this.addComponent(cc.RigidBody);
        rigidBody.linearDamping = 1;
        rigidBody.active = true;      
        rigidBody.fixedRotation = true; 
        this.m_pUnitBody = rigidBody;
        

        var tempState = new cStandState();
        this.m_curtState = cc.eEntityState.eESStand;
        this.m_pState = tempState;
        this.m_pState.Enter(this);
      
    },

    getEntityPropertyData(){
        return this.m_pEntityPropertyData;
    },

    isInState(tempState){
        return (tempState== this.m_curtState);
    },

    onDestroy(){
        cc.resources.release("UiPrefab/Unit");

        this.m_pEntityPropertyData=null;

        if(this.m_pUnitBody != null)
        {
           this.m_pUnitBody.destroy(); 
        }
    },

    syncPosition(){
        if(this.m_pUnitBody) {
            this.m_pUnitBody.syncPosition(false);
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
    },

    DoMove(vecMove)
    {           
        var linearVelocity = this.m_pUnitBody.linearVelocity;     

        var tempDes = vecMove.sub(linearVelocity);
        var tempmass = this.m_pUnitBody.getMass();

        var pcenterPos = this.m_pUnitBody.getWorldCenter();
        tempmass = tempmass.toFixed(1);   
        tempDes.x = tempmass * tempDes.x;
        tempDes.y = tempmass * tempDes.y;
        
        if (!this.m_oldMoveForce.equals(tempDes) ){
            this.m_oldMoveForce = tempDes;
            this.m_pUnitBody.applyLinearImpulse(tempDes,pcenterPos);           
        }         
    }, 

    DoStand(){
       // console.log(this.getPosition())
       // this.m_pUnitBody.linearVelocity.x = 0;
       // this.m_pUnitBody.linearVelocity.y = 0;
       // this.m_pUnitBody.linearVelocity.z = 0;
    },

    DoChangeState(tempState){

        this.m_curtState = tempState;
        if(tempState == cc.eEntityState.eESStand) {
            var tempState = new cStandState();
            this.ChangeState(tempState);
        }else if(tempState == cc.eEntityState.eESMove ){
            var tempState = new cRunState();
            this.ChangeState(tempState);
        }
    },

    DoChangeDir(fDir){
        this.m_fDir = fDir;
    },
   
});

module.exports = {cEntity};
