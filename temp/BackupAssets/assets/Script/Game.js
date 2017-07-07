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
           touchChess:{//每一回合点击的棋子
            default:null,
            type:cc.Node,
            visible:false//属性窗口不显示
        },


    },

    // use this for initialization
    onLoad: function () {
        var i = 0;
        var self = this;
        //初始化棋盘上225个棋子节点，并为每个节点添加事件
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 8; x++) {
                var newNode = cc.instantiate(this.chessPrefab);//复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p((x + 5) * 105 - 890, (y + 2) * 110 - 370));//根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.tag = i;//根据每个节点的tag就可以算出其二维坐标

                
                this.chessList.push(newNode);

                //   newNode.on(cc.Node.EventType.TOUCH_END, this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {
                   self.touchChess = this;

                   self.test();

                    
                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;

                });
                // newNode.on(cc.Node.EventType.TOUCH_END,this.newNode_onClick,this)
                
                this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.whiteSpriteFrame;
                i++;
            }
            //   console.log(this.chessList.size)
        }
    },

    newNode_onClick: function () {
        console.log(newNode.tag)
        //  this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
    },
    test:function(){
         console.log(this.touchChess.tag)

        //  this.chessList[this.touchChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;

         var chess_label = this.touchChess.getComponent(cc.Label);
         chess_label.string='士'
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
