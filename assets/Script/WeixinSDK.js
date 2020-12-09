var WeixinSDK = cc.Class({

    properties: {
        roomMgr:null,
        cloudMgr:null,
       
    },

    getRoomMgr(){
        return this.roomMgr;
    },

    gameLogin(sucFun,failFun){
        if(typeof(wx) != "undefined"){ 
            if(typeof(wx.login)=="function"){
                var pself = this;
                console.log("+++++++++++++gameLogin+++++++++++++11")
                wx.login({
                    success:function(res){
                        if(res.code){                            
                            if(res != null){
                                console.log(res); 
                                 pself.WeixinCloudGetOpenId(sucFun)                         
                            }else{
                                failFun();                               
                            }    
                                               
                        }
                    }
                });
            }
        }else{
            //其他登陆默认成功

           
            var obj = {};
            obj.openid = 0;
            sucFun(obj);
        }
    },

    weiXinSDkInit(){
        // 实例化 Room 对象
        const gameInfo = {
            gameId: 'obg-kd9fmh4m',
            secretKey: '893504c8ce8709776714d05de48c8d59b8efcb18',
            openId: cc.gameData.openid,
        };

        const config = {
            url: 'kd9fmh4m.wxlagame.com',
            reconnectMaxTimes: 5,
            reconnectInterval: 1000,
            resendInterval: 1000,
            resendTimeout: 10000,
        };

        
        MGOBE.Listener.init(gameInfo, config, event => {
        if (event.code === MGOBE.ErrCode.EC_OK) {
                console.log("初始化成功");
                this.roomMgr = new MGOBE.Room();
                MGOBE.Listener.add(this.roomMgr);   
                // 监听匹配结果
                this.roomMgr.onMatch = (event) =>this.onMatch(event); 
                this.roomMgr.onCancelMatch = (event) => this.onCancelMatch(event);
            }
        });
    },

    WeixinCloudGetOpenId(sucFun){
        // 初始化方法，从配置中读取参数
        console.log("+++wx.cloud.init+++2222");
        wx.cloud.init({
            env: 'testgame-2cf6a5',
            traceUser:true,          
        });

        wx.cloud.callFunction(
            {
                // 要调用的云函数名称
                name: 'GameLogin',
                // 传递给云函数的event参数
                data: {                        
                }
            }).then(res=>{
                 console.log("+++wx.cloud.init+++33333");
                 console.log(res)
                 var obj = {};
                 obj.openid = res.result;
                 sucFun(obj);
            });       
    },

    WeixinGetUserInfo(sucFun){
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.userInfo']) {
                        wx.authorize({
                                scope: 'scope.userInfo',
                                success () {
                                    console.log("userInfo  authorize  success")
                                    wx.getUserInfo({
                                        success(res) {                                         
                                            console.log(res);
                                            cc.gameData.weixinUserInfo = res.userInfo;
                                            sucFun()
                                        }
                                    });                           
                                }
                            });
                        }else{
                            console.log("userInfo no authorize")
                             wx.getUserInfo({
                                success(res) {                                      
                                    console.log(res);
                                    cc.gameData.weixinUserInfo = res.userInfo;
                                    sucFun()
                                }
                            }); 
                        }
                    }
            });
    },

    onMatch(event){
        console.log("监听匹配回调。。。。");
        console.log(event);
        if (event.data.errCode === MGOBE.ErrCode.EC_OK) {
            console.log("组队匹配成功");
            //roomMgr.initRoom(event.data.roomInfo);
            return;
        }
    },

    onCancelMatch(event){
         console.log("监听取消匹配回调。。。。");

    },

});

module.exports = {WeixinSDK};