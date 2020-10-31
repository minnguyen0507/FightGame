const gameInfo = {
    gameId: 'obg-kd9fmh4m',
    secretKey: '893504c8ce8709776714d05de48c8d59b8efcb18',
    openId: '10000001',
};

const config = {
    url: 'kd9fmh4m.wxlagame.com',
    reconnectMaxTimes: 5,
    reconnectInterval: 1000,
    resendInterval: 1000,
    resendTimeout: 10000,
};




var WeixinSDK = cc.Class({


    gameLogin(sucFun,failFun){
        if(typeof(wx) != "undefined"){ 
            if(typeof(wx.login)=="function"){
                var pself = this;
                wx.login({
                    success:function(res){
                        if(res.code){                            
                            if(res != null){
                                console.log(res);                                  
                                sucFun();
                            }else{
                                failFun();
                                console.log("+++++wx.login+++++fail");
                            }    
                                               
                        }
                    }
                });
            }
        }else{
            //其他登陆默认成功
            sucFun();
        }
    },

    weiXinSDkInit(){
        // 实例化 Room 对象
        const room = new MGOBE.Room();
        MGOBE.Listener.init(gameInfo, config, event => {
        if (event.code === 0) {
            console.log("初始化成功");
            // 初始化成功之后才能调用其他 API
            // 查询玩家自己的房间
            room.getRoomDetail(event => {
                    if (event.code !== 0 && event.code !== 20011) {
                        return console.log(event);
                    }
                    console.log("查询成功");
                    if (event.code === 20011) {
                        console.log("玩家不在房间内");
                    } else {
                        // 玩家已在房间内
                        console.log("房间名", event.data.roomInfo.name);
                    }
                });
            }
        });
    },

    


});

module.exports = {WeixinSDK};