cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
          btn_statr: cc.Button,
         btn_exit: cc.Button,

        
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = '123321';
    },

    // called every frame
    update: function (dt) {

    this.btn_statr.node.on(cc.Node.EventType.TOUCH_START, this.btn_start_onclick,this)
    this.btn_exit.node.on(cc.Node.EventType.TOUCH_START, this.btn_exit_onClick,this)
 

    },
       btn_start_onclick :function(event){
       console.log("btn_statr_onClick")
//       cc.director.preloadScene('game', function () {
//     cc.log('Next scene preloaded');
// });
       cc.director.loadScene('game');
   },
    btn_exit_onClick:function(event){
       console.log("btn_exit_onClick")
    },
  
});
