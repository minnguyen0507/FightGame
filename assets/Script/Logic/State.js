

var cState = cc.Class({ 

   Enter(pEntity){
       console.log("base state Enter......")
   },

   Execute(pEntity){},

   Exit(pEntity){
       console.log("base state Exit......")
   },
  
});

var cRunState = cc.Class({ 
    extends: cState,


   Enter(pEntity){
    console.log("cRunState state Enter......")
   },

   Execute(pEntity){
        var curDir = pEntity.m_fDir;
        var proData = pEntity.getEntityPropertyData();
        var moveSpeed = proData.m_iMoveSpeed;
        moveSpeed = moveSpeed.toFixed(1);              
        var fdirhudu = curDir;
        var xTemp = Math.cos(fdirhudu)*moveSpeed;
        xTemp = xTemp.toFixed(1);
        var yTemp = Math.sin(fdirhudu)*moveSpeed;     
        yTemp = yTemp.toFixed(1);   
        var tempVec = cc.v2(xTemp,yTemp);
        pEntity.DoMove(tempVec);
   },

   Exit(pEntity){
         console.log("cRunState state Exit......")
   },
  
});


var cStandState = cc.Class({ 
    extends: cState,


   Enter(pEntity){
    console.log("cStandState state Enter......")
   },

   Execute(pEntity){
        pEntity.DoMove(cc.v2(0,0));
   },

   Exit(pEntity){
        console.log("cStandState state Exit......")
   },  
});


module.exports = {cState,cRunState,cStandState};
