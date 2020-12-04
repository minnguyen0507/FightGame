
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var roomMgr = cc.WeixinSDK.getRoomMgr();
        var roomInfo = roomMgr.roomInfo

        console.log(roomInfo)

    },

    // update (dt) {},
});
