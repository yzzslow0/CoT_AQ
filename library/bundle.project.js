require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Game":[function(require,module,exports){
"use strict";
cc._RF.push(module, '10e84zfT9VGU6q5BtbS6H0f', 'Game');
// Script/Game.js

'use strict';

var Black = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];
var Red = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];

var ListChess = new Array(32);

cc.Class({
    extends: cc.Component,

    properties: {

        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        ListChessNode: { //棋子节点的集合，用一维数组表示二维位置
            default: [],
            type: [cc.node]
        },

        whiteSpriteFrame: { //棋的图片
            default: null,
            type: cc.SpriteFrame
        },

        blackSpriteFrame: { //wu棋的图片
            default: null,
            type: cc.SpriteFrame
        },

        touchChess: { //每一回合点击的棋子
            default: null,
            type: cc.Node,
            visible: false //属性窗口不显示
        },

        the_last_touchChess: {
            default: null,
            type: cc.Node,
            visible: false //属性窗口不显示
        },

        isDestory: cc.Boolean,

        pzChess: { //
            default: null,
            type: cc.Node,
            visible: false
        }

    },

    // use this for initialization
    onLoad: function onLoad() {
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

                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                this.node.addChild(newNode);

                if (parseInt(cc.random0To1() * 2) == 0) {

                    if (Red.length > 0) {
                        //红色


                        Chess.flag = 0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        Chess.name = Red[number];
                        Red.splice(number, 1);
                    } else {
                        //黑色
                        Chess.flag = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        Chess.name = Black[number];
                        Black.splice(number, 1);
                    }
                } else {
                    if (Black.length > 0) {
                        //黑色
                        Chess.flag = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        Chess.name = Black[number];
                        Black.splice(number, 1);
                    } else {
                        //红色
                        Chess.flag = 0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        Chess.name = Red[number];
                        Red.splice(number, 1);
                    }
                }

                Chess.positionX = (x + 5) * 105 - 890;
                Chess.positionY = (y + 2) * 110 - 370;

                newNode.setPosition(cc.p(Chess.positionX, Chess.positionY)); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置


                newNode.zIndex = 1; //层级管理   
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
                    this.zIndex = 100; //层级管理   
                    self.touchChess = this;
                    self.isDestory = false;

                    ListChess[this.tag].positionX = this.x;
                    ListChess[this.tag].positionY = this.y;

                    // cc.log(mChessModel.positionX+'----'+mChessModel.positionY);
                    cc.log('this.tag:' + this.tag);

                    self.setChess(ListChess[this.tag].flag, this);

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

                    this.zIndex = 1; //层级管理       

                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag; // 赋值tag
                    isMove = false;
                    // cc.log(self.positionX[this.tag] - this.position.x)
                    // cc.log(self.positionY[this.tag] - this.position.y)
                    cc.log(this.tag);

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
                });

                i++;
            }
        }
    },
    // called every frame
    update: function update(dt) {
        // this.btn_test.node.on(cc.Node.EventType.TOUCH_START, this.btn_test_func, this)
    },

    setChess: function setChess(flag, mNode) {
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

    destoryChess: function destoryChess(other, self) {
        this.isDestory = true;
        if (this.touchChess.tag == other.node.tag) {
            //有时候 不能分辨 是否是点中的棋子 判断棋子
            this.pzChess = self.node;
        } else {
            this.pzChess = other.node;
        }
        // this.pzChess = other;
    },

    notdestoryChess: function notdestoryChess(other, self) {
        this.isDestory = false;
    },

    getChessHZ: function getChessHZ(position, flag) {
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

    ChessPZ_function: function ChessPZ_function(X, Y, mFlag) {
        this.touchChess.x = X;

        this.touchChess.y = Y;

        this.ListChessNode[this.touchChess.tag].opacity = 0; //透明度

        ListChess[this.touchChess.tag].flag = 2;

        var old_name = ListChess[this.touchChess.tag].name;

        ListChess[this.touchChess.tag].name = 0;

        ListChess[this.pzChess.tag].flag = mFlag;

        ListChess[this.pzChess.tag].name = old_name;

        this.setChess(mFlag, this.ListChessNode[this.pzChess.tag]);
    },

    isDestoryfunction: function isDestoryfunction(X, Y) {
        if (this.isDestory) {
            // cc.log('销毁')
            // this.touchChess.x = this.pzChess.x;
            // this.touchChess.y = this.pzChess.y;

            if (ListChess[this.touchChess.tag].flag == 0 && ListChess[this.pzChess.tag].flag == 1) {
                //红吃黑
                if (ListChess[this.touchChess.tag].name > ListChess[this.pzChess.tag].name) {

                    //判断帅不能吃卒
                    if (ListChess[this.touchChess.tag].name == 15 && ListChess[this.pzChess.tag].name == 5) {

                        cc.log('帅不能吃卒');
                        this.touchChess.x = X;
                        this.touchChess.y = Y;
                    } else {

                        cc.log('红吃黑');

                        // this.touchChess.x = X;

                        // this.touchChess.y = Y;

                        // this.ListChessNode[this.touchChess.tag].opacity = 0;//透明度

                        // ListChess[this.touchChess.tag].flag = 2;

                        // var old_name = ListChess[this.touchChess.tag].name;

                        // ListChess[this.touchChess.tag].name = 0;

                        // ListChess[this.pzChess.tag].flag =0;

                        // ListChess[this.pzChess.tag].name = old_name;


                        // this.setChess(0,this.ListChessNode[this.pzChess.tag]);


                        this.ChessPZ_function(X, Y, 0);
                    }

                    // this.ListChessNode[this.pzChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                } else if (ListChess[this.touchChess.tag].name == ListChess[this.pzChess.tag].name) {
                    cc.log('不同色同样的棋子--销毁');

                    this.ChessPZ_function(X, Y, 0);
                } else if (ListChess[this.touchChess.tag].name == 5 && ListChess[this.pzChess.tag].name == 15) {

                    cc.log('兵可以吃将');

                    this.ChessPZ_function(X, Y, 0);
                } else {
                    cc.log('红吃黑--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else if (ListChess[this.touchChess.tag].flag == 1 && ListChess[this.pzChess.tag].flag == 0) {
                //黑吃红
                if (ListChess[this.touchChess.tag].name > ListChess[this.pzChess.tag].name) {

                    if (ListChess[this.touchChess.tag].name == 15 && ListChess[this.pzChess.tag].name == 5) {

                        cc.log('将不能吃兵');
                        this.touchChess.x = X;
                        this.touchChess.y = Y;
                    } else {

                        this.ChessPZ_function(X, Y, 1);
                    }
                } else if (ListChess[this.touchChess.tag].name == ListChess[this.pzChess.tag].name) {

                    cc.log('不同色同样的棋子--销毁');
                    this.ChessPZ_function(X, Y, 1);
                } else if (ListChess[this.touchChess.tag].name == 5 && ListChess[this.pzChess.tag].name == 15) {

                    cc.log('卒可以吃帅');
                    this.ChessPZ_function(X, Y, 1);
                } else {
                    cc.log('黑吃红--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else {
                if (ListChess[this.pzChess.tag].flag == 2) {

                    if (ListChess[this.touchChess.tag].flag == 1) {
                        cc.log('空棋子 黑');
                        this.ChessPZ_function(X, Y, 1);
                        this.ListChessNode[this.pzChess.tag].opacity = 255; //透明度
                    } else {
                        cc.log('空棋子 红');
                        this.ChessPZ_function(X, Y, 0);
                        this.ListChessNode[this.pzChess.tag].opacity = 255; //透明度
                    }
                } else {
                    cc.log('同色不销毁');
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

cc._RF.pop();
},{}],"Menu":[function(require,module,exports){
"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'Menu');
// Script/Menu.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        btn_statr: cc.Button,
        btn_exit: cc.Button

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = 'AQ';
    },

    // called every frame
    update: function update(dt) {

        this.btn_statr.node.on(cc.Node.EventType.TOUCH_START, this.btn_start_onclick, this);
        this.btn_exit.node.on(cc.Node.EventType.TOUCH_START, this.btn_exit_onClick, this);
    },
    btn_start_onclick: function btn_start_onclick(event) {
        console.log("btn_statr_onClick");
        //       cc.director.preloadScene('game', function () {
        //     cc.log('Next scene preloaded');
        // });
        cc.director.loadScene('game');
    },
    btn_exit_onClick: function btn_exit_onClick(event) {
        console.log("btn_exit_onClick");
    }

});

cc._RF.pop();
},{}],"PZ":[function(require,module,exports){
"use strict";
cc._RF.push(module, '3471aAh5MxFN5jeYF523SjR', 'PZ');
// Script/PZ.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        game: {
            default: null,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        /**
               * 碰撞相关
               */
        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();
        //开启碰撞检测系统
        manager.enabled = true;
        //debug 绘制
        manager.enabledDebugDraw = true;
        //绘制包围盒
        manager.enabledDrawBoundingBox = true;

        // PzTouchChess = getComponent('Star').game = this;
    },
    /**
    * 当碰撞产生的时候调用
    * @param  {Collider} other 产生碰撞的另一个碰撞组件
    * @param  {Collider} self  产生碰撞的自身的碰撞组件
    */
    onCollisionEnter: function onCollisionEnter(other, self) {
        // console.log('on collision enter');

        // // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        // var world = self.world;

        // // 碰撞组件的 aabb 碰撞框
        // var aabb = world.aabb;

        // // 上一次计算的碰撞组件的 aabb 碰撞框
        // var preAabb = world.preAabb;

        // // 碰撞框的世界矩阵
        // var t = world.transform;

        // // 以下属性为圆形碰撞组件特有属性
        // var r = world.radius;
        // var p = world.position;

        // // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        // var ps = world.points;

        this.game.destoryChess(other, self);
    },

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function onCollisionStay(other, self) {
        // console.log('on collision stay');

    },

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function onCollisionExit(other, self) {
        // console.log('on collision exit');
        this.game.notdestoryChess(other, self);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
},{}]},{},["Game","Menu","PZ"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyIsImFzc2V0cy9TY3JpcHQvUFouanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7O0FBSUE7O0FBRUE7QUFDSTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFGUztBQUliO0FBQ0k7QUFDQTtBQUZXOztBQUtmO0FBQ0k7QUFDQTtBQUZjOztBQUtsQjtBQUNJO0FBQ0E7QUFGYzs7QUFLbEI7QUFDSTtBQUNBO0FBQ0E7QUFIUTs7QUFNWjtBQUNJO0FBQ0E7QUFDQTtBQUhpQjs7QUFNckI7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFISzs7QUFuQ0Q7O0FBOENaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0k7O0FBSUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUxZOztBQVVaO0FBQ0E7O0FBRUE7O0FBRUk7QUFDSzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVIO0FBQ0c7QUFDRDs7QUFFQztBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBRUo7QUFDRztBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQU1BO0FBQ0E7OztBQUdBO0FBQ0k7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEOzs7QUFHQTs7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFHSDs7QUFFRDs7O0FBR0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFFSjs7QUFFRDtBQUNIO0FBRUo7QUFJSjtBQUNEO0FBQ0E7QUFDSTtBQUNIOztBQUlEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIOztBQUlEOztBQUdIOztBQUVEO0FBQ0k7QUFDQTtBQUE2QztBQUN6QztBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSjtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5REo7QUFpRUg7O0FBRUQ7QUFDbUI7O0FBRUM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBR0E7QUFHbkI7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7O0FBRUk7QUFDQTs7QUFFSTtBQUNBO0FBQ0E7QUFFSDs7QUFFRzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7OztBQUdDO0FBRUo7O0FBRUQ7QUFFSDtBQUNHOztBQUVGO0FBRUQ7O0FBRUc7O0FBRUQ7QUFDRjtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDRztBQUNBOztBQUVJOztBQUVJO0FBQ0E7QUFDQTtBQUVIOztBQUVEO0FBRUM7QUFJSjs7QUFFRztBQUNKO0FBRUM7O0FBR0c7QUFDRjtBQUlEO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNHOztBQUVJO0FBQ0k7QUFDQTtBQUNDO0FBQ0o7QUFDRztBQUNBO0FBQ0M7QUFDSjtBQUVKO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUVKO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7O0FBRUE7QUE3ZUs7Ozs7Ozs7Ozs7QUNQVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJTDtBQUNEOztBQU5POztBQVdaO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUdDO0FBQ0U7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ0g7QUFDQTtBQUNHO0FBQ0Y7O0FBcENJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkU7QUFYRTs7QUFpQlo7QUFDQTtBQUNJOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0g7QUFDRDs7Ozs7QUFLQTtBQUNJOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUM7QUFDSjs7QUFJRDs7Ozs7QUFLQTtBQUNJOztBQUVIOztBQUVEOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUEzRksiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmxhY2sgPSBbNSwgNSwgNSwgNSwgNSwgNiwgNiwgOCwgOCwgMTAsIDEwLCAxMiwgMTIsIDE0LCAxNCwgMTVdO1xudmFyIFJlZCA9IFs1LCA1LCA1LCA1LCA1LCA2LCA2LCA4LCA4LCAxMCwgMTAsIDEyLCAxMiwgMTQsIDE0LCAxNV07XG5cblxuXG52YXIgTGlzdENoZXNzID0gbmV3IEFycmF5KDMyKTsgXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgY2hlc3NQcmVmYWI6IHsvL+aji+WtkOeahOmihOWItui1hOa6kFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBMaXN0Q2hlc3NOb2RlOiB7Ly/mo4vlrZDoioLngrnnmoTpm4blkIjvvIznlKjkuIDnu7TmlbDnu4TooajnpLrkuoznu7TkvY3nva5cbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLm5vZGVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgd2hpdGVTcHJpdGVGcmFtZTogey8v5qOL55qE5Zu+54mHXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcblxuICAgICAgICBibGFja1Nwcml0ZUZyYW1lOiB7Ly93deaji+eahOWbvueJh1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG91Y2hDaGVzczogey8v5q+P5LiA5Zue5ZCI54K55Ye755qE5qOL5a2QXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcblxuICAgICAgICB0aGVfbGFzdF90b3VjaENoZXNzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcblxuICAgICAgICBpc0Rlc3Rvcnk6IGNjLkJvb2xlYW4sXG5cbiAgICAgICAgcHpDaGVzczogey8vXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgIFxuIFxuICAgIFxuICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpc0Rlc3RvcnkgPWZhbHNlO1xuICAgICAgICAvLyB2YXIga2V5MSA9ICfliqjmgIFrZXkxJztcbiAgICAgICAgLy8gdmFyIGtleTIgPSAn5Yqo5oCBa2V5Mic7XG4gICAgICAgIC8vIHZhciBtYXAgPSB7fTtcbiAgICAgICAgLy8gbWFwW2tleTFdID0gMTtcbiAgICAgICAgLy8gbWFwW2tleTJdID0gMjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXBba2V5MV0pOy8v57uT5p6c5pivMS5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWFwW2tleTJdKTsvL+e7k+aenOaYrzIubVxuXG4gICAgICAgIC8vIC8v5aaC5p6c6YGN5Y6GbWFwXG4gICAgICAgIC8vIGZvcih2YXIgcHJvcCBpbiBtYXApe1xuICAgICAgICAvLyAgICAgaWYobWFwLmhhc093blByb3BlcnR5KHByb3ApKXtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygna2V5IGlzICcgKyBwcm9wICsnIGFuZCB2YWx1ZSBpcycgKyBtYXBbcHJvcF0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdmFyIG1DaGVzc01vZGVsID0gY2MuQ2xhc3Moe1xuICAgICAgICAvLyAgIHBvc2l0aW9uWDogMCxcbiAgICAgICAgLy8gICAgIHBvc2l0aW9uWTogMCxcbiAgICAgICAgLy8gICAgIHRhZzogMCxcbiAgICAgICAgLy8gICAgIG5hbWU6ICcnLFxuICAgICAgICAvLyAgICAgZmxhZzogMFxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog5Yib5bu65qOL5a2QXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGlzTW92ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIExpc3RDaGVzc1tpXSA9IENoZXNzO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5qOL55uY5LiKMjI15Liq5qOL5a2Q6IqC54K577yM5bm25Li65q+P5Liq6IqC54K55re75Yqg5LqL5Lu2XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDg7IHgrKykge1xuXG5cblxuICAgICAgICAgICAgICAgIHZhciBDaGVzcyA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICB0YWc6IC0xLFxuICAgICAgICAgICAgICAgIGZsYWc6IC0xLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogMCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IDBcbiAgICAgICBcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGVzc1ByZWZhYik7Ly/lpI3liLZDaGVzc+mihOWItui1hOa6kFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdOb2RlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiAyKSA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy/nuqLoibJcblxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2hlc3MuZmxhZyA9MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiBSZWQubGVuZ3RoKTsgLy/pmo/mnLrkuIDkvY3mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygn6ZqP5py6JyArIFJlZFtudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIENoZXNzLm5hbWUgPSBSZWRbbnVtYmVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZC5zcGxpY2UobnVtYmVyLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/pu5HoibJcbiAgICAgICAgICAgICAgICAgICAgICAgQ2hlc3MuZmxhZyA9MTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIEJsYWNrLmxlbmd0aCk7IC8v6ZqP5py65LiA5L2N5pWwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ+maj+acuicgKyBCbGFja1tudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIENoZXNzLm5hbWUgID0gQmxhY2tbbnVtYmVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEJsYWNrLnNwbGljZShudW1iZXIsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQmxhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/pu5HoibJcbiAgICAgICAgICAgICAgICAgICAgICAgIENoZXNzLmZsYWcgPTE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiBCbGFjay5sZW5ndGgpOyAvL+maj+acuuS4gOS9jeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCfpmo/mnLonICsgQmxhY2tbbnVtYmVyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGVzcy5uYW1lICA9IEJsYWNrW251bWJlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBCbGFjay5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi6ImyXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGVzcy5mbGFnID0wO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIFJlZC5sZW5ndGgpOyAvL+maj+acuuS4gOS9jeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCfpmo/mnLonICsgUmVkW251bWJlcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hlc3MubmFtZSAgPSBSZWRbbnVtYmVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZC5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIENoZXNzLnBvc2l0aW9uWCA9ICh4ICsgNSkgKiAxMDUgLSA4OTA7XG4gICAgICAgICAgICAgICAgQ2hlc3MucG9zaXRpb25ZID0gKHkgKyAyKSAqIDExMCAtIDM3MDtcblxuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0UG9zaXRpb24oY2MucChDaGVzcy5wb3NpdGlvblgsIENoZXNzLnBvc2l0aW9uWSkpOy8v5qC55o2u5qOL55uY5ZKM5qOL5a2Q5aSn5bCP6K6h566X5L2/5q+P5Liq5qOL5a2Q6IqC54K55L2N5LqO5oyH5a6a5L2N572uXG5cblxuICAgICAgICAgICAgICAgIG5ld05vZGUuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgIFxuICAgICAgICAgICAgICAgIC8vIG5ld05vZGUuZ3JvdXAgPSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgIENoZXNzLnRhZyA9IGk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS50YWcgPSBpO1xuXG5cbiAgICAgICAgICAgICAgICBMaXN0Q2hlc3NbaV0gPSBDaGVzcztcbiAgICAgICAgICAgICAgICB0aGlzLkxpc3RDaGVzc05vZGUucHVzaChuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudCgnUFonKS5nYW1lID0gdGhpcztcblxuXG5cblxuXG4gICAgICAgICAgICAgICAgLy8gdmFyIG1DaGVzc01vZGVsID0gbmV3IENoZXNzTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDngrnlh7sgVE9VQ0hfU1RBUlRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSAxMDA7Ly/lsYLnuqfnrqHnkIYgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0Rlc3RvcnkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBMaXN0Q2hlc3NbdGhpcy50YWddLnBvc2l0aW9uWCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICAgICAgTGlzdENoZXNzW3RoaXMudGFnXS5wb3NpdGlvblkgPSB0aGlzLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKG1DaGVzc01vZGVsLnBvc2l0aW9uWCsnLS0tLScrbUNoZXNzTW9kZWwucG9zaXRpb25ZKTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCd0aGlzLnRhZzonK3RoaXMudGFnKVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2hlc3MoTGlzdENoZXNzW3RoaXMudGFnXS5mbGFnLHRoaXMpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lpoLmnpznrKzkuIDmrKHngrnlh7vkuI7mg7PopoHmi5bliqjnmoTmo4vlrZDkuLrlkIzkuIDkuKog5YiZ5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgIT0gbnVsbCAmJiBzZWxmLnRvdWNoQ2hlc3MudGFnID09IHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMubGFiZWwuc3RyaW5nID0gJzEyMzMyMSdcbiAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLmFkZENoaWxkKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLkxpc3RDaGVzc05vZGVbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnVE9VQ0hfU1RBUlQ6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICog54K55Ye7IFRPVUNIX0VORFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnID0gc2VsZi50b3VjaENoZXNzLnRhZzsvLyDotYvlgLx0YWdcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhzZWxmLnBvc2l0aW9uWFt0aGlzLnRhZ10gLSB0aGlzLnBvc2l0aW9uLngpXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhzZWxmLnBvc2l0aW9uWVt0aGlzLnRhZ10gLSB0aGlzLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyh0aGlzLnRhZylcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNEZXN0b3J5ZnVuY3Rpb24oTGlzdENoZXNzW3RoaXMudGFnXS5wb3NpdGlvblgsIExpc3RDaGVzc1t0aGlzLnRhZ10ucG9zaXRpb25ZKTtcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICog5ouW5YqoIFRPVUNIX01PVkVcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IGV2ZW50LnRvdWNoLmdldERlbHRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gZGVsdGEueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSBkZWx0YS55O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG5cbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vIHRoaXMuYnRuX3Rlc3Qubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fdGVzdF9mdW5jLCB0aGlzKVxuICAgIH0sXG5cblxuXG4gICAgc2V0Q2hlc3M6IGZ1bmN0aW9uIChmbGFnLG1Ob2RlKSB7XG4gICAgICAgIHZhciB0ZXN0X2xhYmVsID0gbU5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudG91Y2hDaGVzcy50YWcpXG4gICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgIHRlc3RfbGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDAsIDApO1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5zdHJpbmcgPSB0aGlzLmdldENoZXNzSFooTGlzdENoZXNzW21Ob2RlLnRhZ10ubmFtZSwgMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmxhZyA9PSAxKSB7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMCwgMCwgMCk7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLnN0cmluZyA9IHRoaXMuZ2V0Q2hlc3NIWihMaXN0Q2hlc3NbbU5vZGUudGFnXS5uYW1lLCAxKTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyAgdGhpcy5MaXN0Q2hlc3NOb2RlW3RoaXMudG91Y2hDaGVzcy50YWddLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aGl0ZVNwcml0ZUZyYW1lO1xuXG5cbiAgICB9LFxuXG4gICAgZGVzdG9yeUNoZXNzOiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5pc0Rlc3RvcnkgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy50b3VjaENoZXNzLnRhZyA9PSBvdGhlci5ub2RlLnRhZykgeyAvL+acieaXtuWAmSDkuI3og73liIbovqgg5piv5ZCm5piv54K55Lit55qE5qOL5a2QIOWIpOaWreaji+WtkFxuICAgICAgICAgICAgdGhpcy5wekNoZXNzID0gc2VsZi5ub2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wekNoZXNzID0gb3RoZXIubm9kZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnB6Q2hlc3MgPSBvdGhlcjtcbiAgICB9LFxuXG4gICAgbm90ZGVzdG9yeUNoZXNzOiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5pc0Rlc3RvcnkgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgZ2V0Q2hlc3NIWjogZnVuY3Rpb24gKHBvc2l0aW9uLCBmbGFnKSB7XG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIC8vIHZhciBSZWQgPSBbNSwgNSwgNSwgNSwgNSwgNiwgNiwgOCwgOCwgMTAsIDEwLCAxMiwgMTIsIDE0LCAxNCwgMTVdO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICflhbUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5Y2SJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICfngq4nO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiAn6amsJztcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICfovaYnO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn55u4JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+ixoSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5LuVJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+Wjqyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5biFJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+Wwhic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYXNlIDU6XG4gICAgICAgICAgICAvLyAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJzUnO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAnNSc7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gY2FzZSA2OlxuICAgICAgICAgICAgLy8gICAgIHJldHVybiAnNic7XG4gICAgICAgICAgICAvLyBjYXNlIDg6XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuICc4JztcbiAgICAgICAgICAgIC8vIGNhc2UgMTA6XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuICcxMCc7XG4gICAgICAgICAgICAvLyBjYXNlIDEyOlxuICAgICAgICAgICAgLy8gICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuICcxMic7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuICcxMic7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gY2FzZSAxNDpcbiAgICAgICAgICAgIC8vICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAnMTQnO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAnMTQnO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIGNhc2UgMTU6XG4gICAgICAgICAgICAvLyAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJzE1JztcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJzE1JztcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgXG4gICAgQ2hlc3NQWl9mdW5jdGlvbjogZnVuY3Rpb24gKFgsWSxtRmxhZykge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MaXN0Q2hlc3NOb2RlW3RoaXMudG91Y2hDaGVzcy50YWddLm9wYWNpdHkgPSAwOy8v6YCP5piO5bqmXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5mbGFnID0gMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9sZF9uYW1lID0gTGlzdENoZXNzW3RoaXMudG91Y2hDaGVzcy50YWddLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5uYW1lID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdENoZXNzW3RoaXMucHpDaGVzcy50YWddLmZsYWcgPW1GbGFnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBMaXN0Q2hlc3NbdGhpcy5wekNoZXNzLnRhZ10ubmFtZSA9IG9sZF9uYW1lO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2hlc3MobUZsYWcsdGhpcy5MaXN0Q2hlc3NOb2RlW3RoaXMucHpDaGVzcy50YWddKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBpc0Rlc3RvcnlmdW5jdGlvbjogZnVuY3Rpb24gKFgsIFkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0b3J5KSB7XG4gICAgICAgICAgICAvLyBjYy5sb2coJ+mUgOavgScpXG4gICAgICAgICAgICAvLyB0aGlzLnRvdWNoQ2hlc3MueCA9IHRoaXMucHpDaGVzcy54O1xuICAgICAgICAgICAgLy8gdGhpcy50b3VjaENoZXNzLnkgPSB0aGlzLnB6Q2hlc3MueTtcblxuICAgICAgICAgICAgaWYgKExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5mbGFnID09IDAgJiYgTGlzdENoZXNzW3RoaXMucHpDaGVzcy50YWddLmZsYWcgPT0gMSkge1xuICAgICAgICAgICAgICAgIC8v57qi5ZCD6buRXG4gICAgICAgICAgICAgICAgaWYgKExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5uYW1lID4gTGlzdENoZXNzW3RoaXMucHpDaGVzcy50YWddLm5hbWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreW4heS4jeiDveWQg+WNklxuICAgICAgICAgICAgICAgICAgICBpZiAoTGlzdENoZXNzW3RoaXMudG91Y2hDaGVzcy50YWddLm5hbWUgPT0gMTUgJiYgTGlzdENoZXNzW3RoaXMucHpDaGVzcy50YWddLm5hbWUgPT0gNSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+W4heS4jeiDveWQg+WNkicpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueSA9IFk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfnuqLlkIPpu5EnKVxuICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50b3VjaENoZXNzLnggPSBYO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRvdWNoQ2hlc3MueSA9IFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuTGlzdENoZXNzTm9kZVt0aGlzLnRvdWNoQ2hlc3MudGFnXS5vcGFjaXR5ID0gMDsvL+mAj+aYjuW6plxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10uZmxhZyA9IDI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBvbGRfbmFtZSA9IExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10ubmFtZSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5mbGFnID0wO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXN0Q2hlc3NbdGhpcy5wekNoZXNzLnRhZ10ubmFtZSA9IG9sZF9uYW1lO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0Q2hlc3MoMCx0aGlzLkxpc3RDaGVzc05vZGVbdGhpcy5wekNoZXNzLnRhZ10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZXNzUFpfZnVuY3Rpb24oWCxZLDApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLkxpc3RDaGVzc05vZGVbdGhpcy5wekNoZXNzLnRhZ10uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5uYW1lID09IExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn5LiN5ZCM6Imy5ZCM5qC355qE5qOL5a2QLS3plIDmr4EnKVxuXG4gICAgICAgICAgICAgICAgICB0aGlzLkNoZXNzUFpfZnVuY3Rpb24oWCxZLDApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10ubmFtZSA9PSA1ICYmIExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5uYW1lID09IDE1KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCflhbXlj6/ku6XlkIPlsIYnKVxuXG4gICAgICAgICAgICAgICAgICAgdGhpcy5DaGVzc1BaX2Z1bmN0aW9uKFgsWSwwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+e6ouWQg+m7kS0t5LiN6ZSA5q+BJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnggPSBYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueSA9IFk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10uZmxhZyA9PSAxICYmIExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5mbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAvL+m7keWQg+e6olxuICAgICAgICAgICAgICAgIGlmIChMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10ubmFtZSA+IExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5uYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5uYW1lID09IDE1ICYmIExpc3RDaGVzc1t0aGlzLnB6Q2hlc3MudGFnXS5uYW1lID09IDUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCflsIbkuI3og73lkIPlhbUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnggPSBYO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVzc1BaX2Z1bmN0aW9uKFgsWSwxKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChMaXN0Q2hlc3NbdGhpcy50b3VjaENoZXNzLnRhZ10ubmFtZSA9PSBMaXN0Q2hlc3NbdGhpcy5wekNoZXNzLnRhZ10ubmFtZSApIHtcblxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+S4jeWQjOiJsuWQjOagt+eahOaji+WtkC0t6ZSA5q+BJylcbiAgICAgICAgICAgICAgICB0aGlzLkNoZXNzUFpfZnVuY3Rpb24oWCxZLDEpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoTGlzdENoZXNzW3RoaXMudG91Y2hDaGVzcy50YWddLm5hbWUgPT0gNSAmJiBMaXN0Q2hlc3NbdGhpcy5wekNoZXNzLnRhZ10ubmFtZSAgPT0gMTUpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn5Y2S5Y+v5Lul5ZCD5biFJylcbiAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlc3NQWl9mdW5jdGlvbihYLFksMSk7XG4gICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6buR5ZCD57qiLS3kuI3plIDmr4EnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChMaXN0Q2hlc3NbdGhpcy5wekNoZXNzLnRhZ10uZmxhZyA9PSAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKExpc3RDaGVzc1t0aGlzLnRvdWNoQ2hlc3MudGFnXS5mbGFnID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn56m65qOL5a2QIOm7kScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZXNzUFpfZnVuY3Rpb24oWCxZLDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGlzdENoZXNzTm9kZVt0aGlzLnB6Q2hlc3MudGFnXS5vcGFjaXR5ID0gMjU1Oy8v6YCP5piO5bqmXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+epuuaji+WtkCDnuqInKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVzc1BaX2Z1bmN0aW9uKFgsWSwwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxpc3RDaGVzc05vZGVbdGhpcy5wekNoZXNzLnRhZ10ub3BhY2l0eSA9IDI1NTsvL+mAj+aYjuW6plxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+WQjOiJsuS4jemUgOavgScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy54ID0gWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2MubG9nKCfkuI3plIDmr4EnKVxuICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnggPSBYO1xuICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTsiLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgICAgYnRuX3N0YXRyOiBjYy5CdXR0b24sXG4gICAgICAgICBidG5fZXhpdDogY2MuQnV0dG9uLFxuXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSAnQVEnO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgdGhpcy5idG5fc3RhdHIubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fc3RhcnRfb25jbGljayx0aGlzKVxuICAgIHRoaXMuYnRuX2V4aXQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fZXhpdF9vbkNsaWNrLHRoaXMpXG4gXG5cbiAgICB9LFxuICAgICAgIGJ0bl9zdGFydF9vbmNsaWNrIDpmdW5jdGlvbihldmVudCl7XG4gICAgICAgY29uc29sZS5sb2coXCJidG5fc3RhdHJfb25DbGlja1wiKVxuLy8gICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdnYW1lJywgZnVuY3Rpb24gKCkge1xuLy8gICAgIGNjLmxvZygnTmV4dCBzY2VuZSBwcmVsb2FkZWQnKTtcbi8vIH0pO1xuICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgfSxcbiAgICBidG5fZXhpdF9vbkNsaWNrOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9leGl0X29uQ2xpY2tcIilcbiAgICB9LFxuICBcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgZ2FtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIOeisOaSnuebuOWFs1xuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgLy/ojrflj5bnorDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XG4gICAgICAgIC8v5byA5ZCv56Kw5pKe5qOA5rWL57O757ufXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIC8vZGVidWcg57uY5Yi2XG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XG4gICAgICAgIC8v57uY5Yi25YyF5Zu055uSXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XG5cbiAgICAgICAgLy8gUHpUb3VjaENoZXNzID0gZ2V0Q29tcG9uZW50KCdTdGFyJykuZ2FtZSA9IHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgKiDlvZPnorDmkp7kuqfnlJ/nmoTml7blgJnosIPnlKhcbiAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAqL1xuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb24gY29sbGlzaW9uIGVudGVyJyk7XG5cbiAgICAgICAgLy8gLy8g56Kw5pKe57O757uf5Lya6K6h566X5Ye656Kw5pKe57uE5Lu25Zyo5LiW55WM5Z2Q5qCH57O75LiL55qE55u45YWz55qE5YC877yM5bm25pS+5YiwIHdvcmxkIOi/meS4quWxnuaAp+mHjOmdolxuICAgICAgICAvLyB2YXIgd29ybGQgPSBzZWxmLndvcmxkO1xuXG4gICAgICAgIC8vIC8vIOeisOaSnue7hOS7tueahCBhYWJiIOeisOaSnuahhlxuICAgICAgICAvLyB2YXIgYWFiYiA9IHdvcmxkLmFhYmI7XG5cbiAgICAgICAgLy8gLy8g5LiK5LiA5qyh6K6h566X55qE56Kw5pKe57uE5Lu255qEIGFhYmIg56Kw5pKe5qGGXG4gICAgICAgIC8vIHZhciBwcmVBYWJiID0gd29ybGQucHJlQWFiYjtcblxuICAgICAgICAvLyAvLyDnorDmkp7moYbnmoTkuJbnlYznn6npmLVcbiAgICAgICAgLy8gdmFyIHQgPSB3b3JsZC50cmFuc2Zvcm07XG5cbiAgICAgICAgLy8gLy8g5Lul5LiL5bGe5oCn5Li65ZyG5b2i56Kw5pKe57uE5Lu254m55pyJ5bGe5oCnXG4gICAgICAgIC8vIHZhciByID0gd29ybGQucmFkaXVzO1xuICAgICAgICAvLyB2YXIgcCA9IHdvcmxkLnBvc2l0aW9uO1xuXG4gICAgICAgIC8vIC8vIOS7peS4i+WxnuaAp+S4uiDnn6nlvaIg5ZKMIOWkmui+ueW9oiDnorDmkp7nu4Tku7bnibnmnInlsZ7mgKdcbiAgICAgICAgLy8gdmFyIHBzID0gd29ybGQucG9pbnRzO1xuXG4gICAgICAgICB0aGlzLmdhbWUuZGVzdG9yeUNoZXNzKG90aGVyLHNlbGYpO1xuICAgIH0sXG5cblxuXG4gICAgLyoqXG4gICAgICog5b2T56Kw5pKe5Lqn55Sf5ZCO77yM56Kw5pKe57uT5p2f5YmN55qE5oOF5Ya15LiL77yM5q+P5qyh6K6h566X56Kw5pKe57uT5p6c5ZCO6LCD55SoXG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IG90aGVyIOS6p+eUn+eisOaSnueahOWPpuS4gOS4queisOaSnue7hOS7tlxuICAgICAqIEBwYXJhbSAge0NvbGxpZGVyfSBzZWxmICDkuqfnlJ/norDmkp7nmoToh6rouqvnmoTnorDmkp7nu4Tku7ZcbiAgICAgKi9cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb24gY29sbGlzaW9uIHN0YXknKTtcbiAgICAgICBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5b2T56Kw5pKe57uT5p2f5ZCO6LCD55SoXG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IG90aGVyIOS6p+eUn+eisOaSnueahOWPpuS4gOS4queisOaSnue7hOS7tlxuICAgICAqIEBwYXJhbSAge0NvbGxpZGVyfSBzZWxmICDkuqfnlJ/norDmkp7nmoToh6rouqvnmoTnorDmkp7nu4Tku7ZcbiAgICAgKi9cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIChvdGhlcixzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gZXhpdCcpO1xuICAgICAgICB0aGlzLmdhbWUubm90ZGVzdG9yeUNoZXNzKG90aGVyLHNlbGYpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTsiXSwic291cmNlUm9vdCI6IiJ9