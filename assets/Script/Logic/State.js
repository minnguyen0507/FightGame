

var cState = cc.Class({ 

   Enter(pEntity){
       console.log("base state Enter......")
   },

   Execute(pEntity){},

   Exit(pEntity){},
  
});

var cRunState = cc.Class({ 
    extends: cState,


   Enter(pEntity){
    console.log("cRunState state Enter......")
   },

   Execute(pEntity){


   },

   Exit(pEntity){},

   
  
});


module.exports = {cState};
