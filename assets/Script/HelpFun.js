
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

   
};

module.exports = helpFun;


