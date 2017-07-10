cc.Class({
    extends: cc.Component,

    properties: {

        chessPrefab: {//棋子的预制资源
            default: null,
            type: cc.Prefab
        },

        chessList: {//棋子节点的集合，用一维数组表示二维位置
            default: [],
            type: [cc.node]
        },

        whiteSpriteFrame: {//棋的图片


            default: null,
            type: cc.SpriteFrame
        },
        blackSpriteFrame: {//wu棋的图片
            default: null,
            type: cc.SpriteFrame
        },
        touchChess: {//每一回合点击的棋子
            default: null,
            type: cc.Node,
            visible: false//属性窗口不显示
        },
        the_last_touchChess: {
            default: null,
            type: cc.Node,
            visible: false//属性窗口不显示
        },
        btn_test: cc.Button,

    },

    // use this for initialization
    onLoad: function () {

        // var key1 = '动态key1';
        // var key2 = '动态key2';
        // var map = {};
        // map[key1] = 1;
        // map[key2] = 2;

        // console.log(map[key1]);//结果是1.
        // console.log(map[key2]);//结果是2.

        // //如果遍历map
        // for(var prop in map){
        //     if(map.hasOwnProperty(prop)){
        //         console.log('key is ' + prop +' and value is' + map[prop]);
        //     }
        // }


        var i = 0;
        var self = this;
        var isMove = false;
        //初始化棋盘上225个棋子节点，并为每个节点添加事件
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 8; x++) {
                var newNode = cc.instantiate(this.chessPrefab);//复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p((x + 5) * 105 - 890, (y + 2) * 110 - 370));//根据棋盘和棋子大小计算使每个棋子节点位于指定位置

                newNode.zIndex = 1;//层级管理   

                newNode.tag = i;

                this.chessList.push(newNode);

                //   newNode.on(cc.Node.EventType.TOUCH_END, this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    this.zIndex = 100;//层级管理   
                    self.touchChess = this;
                    self.setChess();

                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                    cc.log('TOUCH_START:' + isMove)
                });

                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {

                    this.zIndex = 1;//层级管理       

                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag;// 赋值tag
                    isMove = false;
                    cc.log('TOUCH_END:' + isMove)
                    cc.log("Node zIndex: " + this.zIndex);
                });
                // newNode.on(cc.Node.EventType.TOUCH_END,this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    cc.log('TOUCH_MOVE:' + isMove)
                    if (isMove) {
                        var delta = event.touch.getDelta();
                        this.x += delta.x;
                        this.y += delta.y;
                    }
                    // console.log('deltax:'+delta.x+'----'+'deltay:'+delta.y);
                    // console.log('this.x:'+this.x+'----'+' this.y:'+this.y);
                    // console.log('deltax:' + delta.x + '----' + 'deltay:' + delta.y)
                })
                this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.whiteSpriteFrame;
                i++;
            }
            //   console.log(this.chessList.size)
        }
        // this.btn_test.node.on(cc.Node.EventType.TOUCH_END,function(event){

        //     this.getComponent(cc.Label).string ='123'
        // });



    },
    // called every frame
    update: function (dt) {
        this.btn_test.node.on(cc.Node.EventType.TOUCH_START, this.btn_test_func, this)
    },



    newNode_onClick: function () {
        console.log(newNode.tag)
        //  this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
    },




    setChess: function () {
        console.log(this.touchChess.tag)


        var test_label = this.touchChess.getComponentInChildren(cc.Label);
        if (test_label.string == '士') {
            test_label.string = '卒'
        } else {
            test_label.string = '士'
        }

        //  this.chessList[this.touchChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;





    },
    btn_test_func: function (event) {
        this.getComponent(cc.Label).string = '123'
    },
    getName: function () {
        return 'test'
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
