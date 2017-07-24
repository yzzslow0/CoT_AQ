var Black = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];
var Red = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];



var ListChess = new Array(32); 

cc.Class({
    extends: cc.Component,

    properties: {

        chessPrefab: {//棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        ListChessNode: {//棋子节点的集合，用一维数组表示二维位置
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

        isDestory: cc.Boolean,

        pzChess: {//
            default: null,
            type: cc.Node,
            visible: false
        },
     
 
    
      
    },

    // use this for initialization
    onLoad: function () {
        // isDestory =false;
        // var key1 = '动态key1';
        // var key2 = '动态key2';
        // var map = {};
        // map[key1] = 1;
        // map[key2] = 2;

        // console.log(map[key1]);//结果是1.
        // console.log(map[key2]);//结果是2.m

        // //如果遍历map
        // for(var prop in map){
        //     if(map.hasOwnProperty(prop)){
        //         console.log('key is ' + prop +' and value is' + map[prop]);
        //     }
        // }

        // var mChessModel = cc.Class({
        //   positionX: 0,
        //     positionY: 0,
        //     tag: 0,
        //     name: '',
        //     flag: 0
        // });

        /**
         * 创建棋子
         */
        var i = 0;
        var self = this;
        var isMove = false;

        // ListChess[i] = Chess;

        //初始化棋盘上225个棋子节点，并为每个节点添加事件
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 8; x++) {



                var Chess = {
                name: '',
                tag: -1,
                flag: -1,
                positionX: 0,
                positionY: 0
       
            };


                var newNode = cc.instantiate(this.chessPrefab);//复制Chess预制资源
                this.node.addChild(newNode);

                if (parseInt(cc.random0To1() * 2) == 0) {

                    if (Red.length > 0) {
                         //红色

                      
                        Chess.flag =0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        Chess.name = Red[number];
                        Red.splice(number, 1);

                    } else {
                        //黑色
                       Chess.flag =1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        Chess.name  = Black[number];
                        Black.splice(number, 1);
                    }

                } else {
                    if (Black.length > 0) {
                        //黑色
                        Chess.flag =1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        Chess.name  = Black[number];
                        Black.splice(number, 1);
                    } else {
                        //红色
                        Chess.flag =0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        Chess.name  = Red[number];
                        Red.splice(number, 1);
                    }
                }

                Chess.positionX = (x + 5) * 105 - 890;
                Chess.positionY = (y + 2) * 110 - 370;

                newNode.setPosition(cc.p(Chess.positionX, Chess.positionY));//根据棋盘和棋子大小计算使每个棋子节点位于指定位置


                newNode.zIndex = 1;//层级管理   
                // newNode.group = "default"
                Chess.tag = i;
                newNode.tag = i;


                ListChess[i] = Chess;
                this.ListChessNode.push(newNode);
                newNode.getComponent('PZ').game = this;





                // var mChessModel = new ChessModel();
                /**
                 * 点击 TOUCH_START
                 */
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    this.zIndex = 100;//层级管理   
                    self.touchChess = this;
                    self.isDestory = false;

                    ListChess[this.tag].positionX = this.x;
                    ListChess[this.tag].positionY = this.y;

                    // cc.log(mChessModel.positionX+'----'+mChessModel.positionY);
                    cc.log('this.tag:'+this.tag)

                    self.setChess(ListChess[this.tag].flag,this);


                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.ListChessNode[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                    // cc.log('TOUCH_START:' + isMove)
                });

                /**
                * 点击 TOUCH_END
                */
                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {

                    this.zIndex = 1;//层级管理       

                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag;// 赋值tag
                    isMove = false;
                    // cc.log(self.positionX[this.tag] - this.position.x)
                    // cc.log(self.positionY[this.tag] - this.position.y)
                    cc.log(this.tag)


                    self.isDestoryfunction(ListChess[this.tag].positionX, ListChess[this.tag].positionY);

                    
                });

                /**
                * 拖动 TOUCH_MOVE
                */
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    //判断是否允许拖动
                    if (isMove) {
                        var delta = event.touch.getDelta();
                        this.x += delta.x;
                        this.y += delta.y;
                    }

                })

                i++;
            }

        }



    },
    // called every frame
    update: function (dt) {
        // this.btn_test.node.on(cc.Node.EventType.TOUCH_START, this.btn_test_func, this)
    },



    setChess: function (flag,mNode) {
        var test_label = mNode.getComponentInChildren(cc.Label);
        // console.log(this.touchChess.tag)
        if (flag == 0) {
            test_label.node.color = new cc.Color(255, 0, 0);
            test_label.string = this.getChessHZ(ListChess[mNode.tag].name, 0);
        } else if (flag == 1) {
            test_label.node.color = new cc.Color(0, 0, 0);
            test_label.string = this.getChessHZ(ListChess[mNode.tag].name, 1);
        }



        //  this.ListChessNode[this.touchChess.tag].getComponent(cc.Sprite).spriteFrame = this.whiteSpriteFrame;


    },

    destoryChess: function (other, self) {
        this.isDestory = true;
        if (this.touchChess.tag == other.node.tag) { //有时候 不能分辨 是否是点中的棋子 判断棋子
            this.pzChess = self.node;
        } else {
            this.pzChess = other.node;
        }
        // this.pzChess = other;
    },

    notdestoryChess: function (other, self) {
        this.isDestory = false;
    },

    getChessHZ: function (position, flag) {
        switch (position) {
            // var Red = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];
            case 5:
                if (flag == 0) {
                    return '兵';
                } else {
                    return '卒';
                }
            case 6:
                return '炮';
            case 8:
                return '马';
            case 10:
                return '车';
            case 12:
                if (flag == 0) {
                    return '相';
                } else {
                    return '象';
                }
            case 14:
                if (flag == 0) {
                    return '仕';
                } else {
                    return '士';
                }
            case 15:
                if (flag == 0) {
                    return '帅';
                } else {
                    return '将';
                }

            // case 5:
            //     if (flag == 0) {
            //         return '5';
            //     } else {
            //         return '5';
            //     }
            // case 6:
            //     return '6';
            // case 8:
            //     return '8';
            // case 10:
            //     return '10';
            // case 12:
            //     if (flag == 0) {
            //         return '12';
            //     } else {
            //         return '12';
            //     }
            // case 14:
            //     if (flag == 0) {
            //         return '14';
            //     } else {
            //         return '14';
            //     }
            // case 15:
            //     if (flag == 0) {
            //         return '15';
            //     } else {
            //         return '15';
            //     }
        }

    },
    
    ChessPZ_function: function (X,Y,mFlag) {
                       this.touchChess.x = X;
                        
                        this.touchChess.y = Y;
                        
                        this.ListChessNode[this.touchChess.tag].opacity = 0;//透明度

                        ListChess[this.touchChess.tag].flag = 2;

                        var old_name = ListChess[this.touchChess.tag].name;

                        ListChess[this.touchChess.tag].name = 0;

                        ListChess[this.pzChess.tag].flag =mFlag;

                        ListChess[this.pzChess.tag].name = old_name;


                        this.setChess(mFlag,this.ListChessNode[this.pzChess.tag]);
        
        
    },

    isDestoryfunction: function (X, Y) {
        if (this.isDestory) {
            // cc.log('销毁')
            // this.touchChess.x = this.pzChess.x;
            // this.touchChess.y = this.pzChess.y;

            if (ListChess[this.touchChess.tag].flag == 0 && ListChess[this.pzChess.tag].flag == 1) {
                //红吃黑
                if (ListChess[this.touchChess.tag].name > ListChess[this.pzChess.tag].name) {

                    //判断帅不能吃卒
                    if (ListChess[this.touchChess.tag].name == 15 && ListChess[this.pzChess.tag].name == 5) {

                        cc.log('帅不能吃卒')
                        this.touchChess.x = X;
                        this.touchChess.y = Y;

                    } else {

                        cc.log('红吃黑')
                       

                        // this.touchChess.x = X;
                        
                        // this.touchChess.y = Y;
                        
                        // this.ListChessNode[this.touchChess.tag].opacity = 0;//透明度

                        // ListChess[this.touchChess.tag].flag = 2;

                        // var old_name = ListChess[this.touchChess.tag].name;

                        // ListChess[this.touchChess.tag].name = 0;

                        // ListChess[this.pzChess.tag].flag =0;

                        // ListChess[this.pzChess.tag].name = old_name;


                        // this.setChess(0,this.ListChessNode[this.pzChess.tag]);


                         this.ChessPZ_function(X,Y,0);

                    }

                    // this.ListChessNode[this.pzChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;

                } else if (ListChess[this.touchChess.tag].name == ListChess[this.pzChess.tag].name) {
                    cc.log('不同色同样的棋子--销毁')

                  this.ChessPZ_function(X,Y,0);

                } else if (ListChess[this.touchChess.tag].name == 5 && ListChess[this.pzChess.tag].name == 15) {

                    cc.log('兵可以吃将')

                   this.ChessPZ_function(X,Y,0);
                } else {
                    cc.log('红吃黑--不销毁')
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else if (ListChess[this.touchChess.tag].flag == 1 && ListChess[this.pzChess.tag].flag == 0) {
                //黑吃红
                if (ListChess[this.touchChess.tag].name > ListChess[this.pzChess.tag].name) {

                    if (ListChess[this.touchChess.tag].name == 15 && ListChess[this.pzChess.tag].name == 5) {

                        cc.log('将不能吃兵')
                        this.touchChess.x = X;
                        this.touchChess.y = Y;

                    } else {

                    this.ChessPZ_function(X,Y,1);

                    }



                } else if (ListChess[this.touchChess.tag].name == ListChess[this.pzChess.tag].name ) {

                    cc.log('不同色同样的棋子--销毁')
                this.ChessPZ_function(X,Y,1);
                   
                } else if (ListChess[this.touchChess.tag].name == 5 && ListChess[this.pzChess.tag].name  == 15) {


                    cc.log('卒可以吃帅')
                  this.ChessPZ_function(X,Y,1);
                   


                } else {
                    cc.log('黑吃红--不销毁')
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else {
                if (ListChess[this.pzChess.tag].flag == 2) {

                    if (ListChess[this.touchChess.tag].flag == 1) {
                        cc.log('空棋子 黑')
                        this.ChessPZ_function(X,Y,1);
                         this.ListChessNode[this.pzChess.tag].opacity = 255;//透明度
                    } else {
                        cc.log('空棋子 红')
                        this.ChessPZ_function(X,Y,0);
                         this.ListChessNode[this.pzChess.tag].opacity = 255;//透明度
                    }

                } else {
                    cc.log('同色不销毁')
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            }

        } else {
            // cc.log('不销毁')
            this.touchChess.x = X;
            this.touchChess.y = Y;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});