
var helpFun = {

   //时间转化成时间100 ==》 1:40 
   getTimeString(maoTime){      
       var tempstr = "" 
       var fenzhong = Math.floor(maoTime/60) ;     
       var miao = maoTime%60;
      
       if (fenzhong<10){
            tempstr = "0" + fenzhong.toString() +":" + miao.toString();            
       }else{
            tempstr = fenzhong.toString() +":" + miao.toString(); 
       }     
       return tempstr;
   },

   stringIsNull(stringParm){
        if (stringParm==null || stringParm==""){
            return true;
        }
        return false;
   },

   //在一个节点上添加个头像
   setHeadIcon(root,urlStr){
        if(root == null){
            return;
        } 
        var pSelf = this;
        cc.resources.load("UiPrefab/HeadIcon", function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            root.addChild(newNode);
            var pHeadIcon = newNode.getChildByName("Icon");          
            var tempsprite = pHeadIcon.getComponent(cc.Sprite);
            if ( ! pSelf.stringIsNull(urlStr) ){ 
                cc.assetManager.loadRemote(urlStr, {ext: '.png'}, (err, texture) =>
                {                      
                    if(err == null)
                    {
                        var spriteFrame = new cc.SpriteFrame(texture);
                        tempsprite.spriteFrame = spriteFrame;
                    }                            
                }); 
            }else{
                var noHeadStr = "ui/noHead";
                cc.resources.load(noHeadStr, cc.SpriteFrame, function (err, spriteFrame) {
                    tempsprite.spriteFrame = spriteFrame;
                });
            }                
        });

   },

   
};

module.exports = helpFun;


