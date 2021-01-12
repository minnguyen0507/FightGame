var eEntityState = cc.Enum({
        eESNull:0,
        eESStand:1,     //站立
        eESMove:2,      //移动
        
});

var eEntityType = cc.Enum({
        eETNull:0,
        eETMainPlayer:1,        //自己
        eETPlayer:2,            //玩家        
});


module.exports = {eEntityState,eEntityType};