cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {        

    },

    onClickMatchBtn:function(Btn){
        console.log("click match Btn");
        var roomMgr = cc.WeixinSDK.getRoomMgr();
        if (roomMgr === null ){
            return;
        }

        const playerInfo = {
                name: "Tom",
                customPlayerStatus: 1,
                customProfile: "https://xxx.com/icon.png",
                matchAttributes: [{
                    name: "skill1",
                    value: 99,
                }]
            };

        const matchPlayersPara = {
            playerInfo,
            matchCode: "play-xxx",
        };

        // 发起匹配
        roomMgr.matchPlayers(matchPlayersPara, event => {
            if (event.code === 0) {
                console.log("请求成功");
            } else {
                console.log("请求失败", event.code);
            }
        });

        // 监听匹配结果
        roomMgr.onMatch = (event) => {

            if (event.data.errCode === MGOBE.ErrCode.EC_OK) {
                console.log("组队匹配成功");
                roomMgr.initRoom(event.data.roomInfo);
                return;
            }
            // 匹配失败
            // ...
        };

    }, 

    // called every frame
    update: function (dt) {

    },
});
