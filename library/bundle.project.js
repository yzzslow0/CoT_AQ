require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Game":[function(require,module,exports){
"use strict";
cc._RF.push(module, '10e84zfT9VGU6q5BtbS6H0f', 'Game');
// Script/Game.js

'use strict';

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Black = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];
var Red = [5, 5, 5, 5, 5, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 15];
cc.Class({
    extends: cc.Component,

    properties: (_properties = {

        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        chessList: { //棋子节点的集合，用一维数组表示二维位置
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

        btn_test: cc.Button,
        isDestory: cc.Boolean,

        pzChess: { //
            default: null,
            type: cc.Node,
            visible: false
        },
        names: {
            default: [],
            type: [cc.String]
        },

        positionX: {
            default: [],
            type: [cc.Integer]
        },
        positionY: {
            default: [],
            type: [cc.Integer]
        },
        // ChessModel:{
        //     default:[],
        Red_names: [cc.String],
        Black_names: [cc.String]
    }, _defineProperty(_properties, 'positionX', [cc.Integer]), _defineProperty(_properties, 'positionY', [cc.Integer]), _defineProperty(_properties, 'flag', [cc.Integer]), _defineProperty(_properties, 'eatChess', { //
        default: null,
        type: cc.Node,
        visible: false
    }), _properties),

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
        //初始化棋盘上225个棋子节点，并为每个节点添加事件
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 8; x++) {
                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                this.node.addChild(newNode);

                if (parseInt(cc.random0To1() * 2) == 0) {

                    if (Red.length > 0) {
                        //红色
                        self.flag[i] = 0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        self.Red_names[i] = Red[number];
                        Red.splice(number, 1);
                    } else {
                        //黑色
                        self.flag[i] = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        self.Black_names[i] = Black[number];
                        Black.splice(number, 1);
                    }
                } else {
                    if (Black.length > 0) {
                        //黑色
                        self.flag[i] = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        // cc.log('随机' + Black[number]);
                        self.Black_names[i] = Black[number];
                        Black.splice(number, 1);
                    } else {
                        //红色
                        self.flag[i] = 0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        // cc.log('随机' + Red[number]);
                        self.Red_names[i] = Red[number];
                        Red.splice(number, 1);
                    }
                }

                self.positionX[i] = (x + 5) * 105 - 890;
                self.positionY[i] = (y + 2) * 110 - 370;

                newNode.setPosition(cc.p(self.positionX[i], self.positionY[i])); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置


                newNode.zIndex = 1; //层级管理   
                // newNode.group = "default"
                newNode.tag = i;

                this.chessList.push(newNode);
                newNode.getComponent('PZ').game = this;

                // var mChessModel = new ChessModel();
                /**
                 * 点击 TOUCH_START
                 */
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    this.zIndex = 100; //层级管理   
                    self.touchChess = this;
                    self.isDestory = false;

                    self.positionX[this.tag] = this.x;
                    self.positionY[this.tag] = this.y;

                    // cc.log(mChessModel.positionX+'----'+mChessModel.positionY);
                    self.setChess(self.flag[this.tag]);

                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
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

                    self.isDestoryfunction(self.positionX[this.tag], self.positionY[this.tag]);
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

    setChess: function setChess(flag) {
        var test_label = this.touchChess.getComponentInChildren(cc.Label);
        console.log(this.touchChess.tag);
        if (flag == 0) {
            test_label.node.color = new cc.Color(255, 0, 0);
            test_label.string = this.getChessHZ(this.Red_names[this.touchChess.tag], 0);
        } else {
            test_label.node.color = new cc.Color(0, 0, 0);
            test_label.string = this.getChessHZ(this.Black_names[this.touchChess.tag], 1);
        }

        //  this.chessList[this.touchChess.tag].getComponent(cc.Sprite).spriteFrame = this.whiteSpriteFrame;

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
            // case 5:
            //     if (flag == 0) {
            //         return '兵';
            //     } else {
            //         return '卒';
            //     }
            // case 6:
            //     return '炮';
            // case 8:
            //     return '马';
            // case 10:
            //     return '车';
            // case 12:
            //     if (flag == 0) {
            //         return '相';
            //     } else {
            //         return '象';
            //     }
            // case 14:
            //     if (flag == 0) {
            //         return '仕';
            //     } else {
            //         return '士';
            //     }
            // case 15:
            //     if (flag == 0) {
            //         return '帅';
            //     } else {
            //         return '将';
            //     }

            case 5:
                if (flag == 0) {
                    return '5';
                } else {
                    return '5';
                }
            case 6:
                return '6';
            case 8:
                return '8';
            case 10:
                return '10';
            case 12:
                if (flag == 0) {
                    return '12';
                } else {
                    return '12';
                }
            case 14:
                if (flag == 0) {
                    return '14';
                } else {
                    return '14';
                }
            case 15:
                if (flag == 0) {
                    return '15';
                } else {
                    return '15';
                }
        }
    },

    isDestoryfunction: function isDestoryfunction(X, Y) {
        if (this.isDestory) {
            cc.log('销毁');
            this.touchChess.x = this.pzChess.x;
            this.touchChess.y = this.pzChess.y;

            if (this.flag[this.touchChess.tag] == 0 && this.flag[this.pzChess.tag] == 1) {
                //红吃黑
                if (this.Red_names[this.touchChess.tag] > this.Black_names[this.pzChess.tag]) {
                    // this.pzChess.opacity = 0;
                    // // this.pzChess.destroy();   //吃子
                    //  this.Black_names[this.pzChess.tag] = this.pzChess.x*10;

                    // this.pzChess = cc.instantiate(this.chessPrefab);//复制Chess预制资源
                    cc.log('红吃黑');
                    this.pzChess.x = this.positionX[this.touchChess.tag];
                    this.pzChess.y = this.positionY[this.touchChess.tag];

                    this.chessList[this.pzChess.tag].opacity = 0;
                    this.Black_names[this.pzChess.tag] = 0;
                    this.flag[this.pzChess.tag] = 2;
                    this.chessList[this.pzChess.tag].zIndex = 0;

                    // this.chessList[this.pzChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                } else if (this.Red_names[this.touchChess.tag] == this.Black_names[this.pzChess.tag]) {
                    cc.log('不同色同样的棋子--销毁');

                    this.pzChess.x = this.positionX[this.touchChess.tag];
                    this.pzChess.y = this.positionY[this.touchChess.tag];

                    this.chessList[this.pzChess.tag].opacity = 0;
                    this.Black_names[this.pzChess.tag] = 0;
                    this.flag[this.pzChess.tag] = 2;
                    this.chessList[this.pzChess.tag].zIndex = 0;
                    // this.pzChess.destroy();   //吃子


                    // this.Black_names[this.pzChess.tag] = this.pzChess.x*10;
                } else {
                    cc.log('红吃黑--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else if (this.flag[this.touchChess.tag] == 1 && this.flag[this.pzChess.tag] == 0) {
                //黑吃红
                if (this.Black_names[this.touchChess.tag] > this.Red_names[this.pzChess.tag]) {

                    cc.log('黑吃红');

                    this.pzChess.x = this.positionX[this.touchChess.tag];
                    this.pzChess.y = this.positionY[this.touchChess.tag];

                    this.chessList[this.pzChess.tag].opacity = 0;
                    this.Red_names[this.pzChess] = 0;
                    this.flag[this.pzChess.tag] = 2;
                    this.chessList[this.pzChess.tag].zIndex = 0;
                } else if (this.Black_names[this.touchChess.tag] == this.Red_names[this.pzChess.tag]) {

                    cc.log('不同色同样的棋子--销毁');
                    this.pzChess.x = this.positionX[this.touchChess.tag];
                    this.pzChess.y = this.positionY[this.touchChess.tag];

                    this.chessList[this.pzChess.tag].opacity = 0;
                    this.Red_names[this.pzChess] = 0;
                    this.flag[this.pzChess.tag] = 2;
                    this.chessList[this.pzChess.tag].zIndex = 0;

                    // this.Red_names[this.pzChess.tag] = this.pzChess.x*10;
                } else {
                    cc.log('黑吃红--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else {
                if (this.flag[this.pzChess.tag] == 2) {

                    if (this.flag[this.touchChess.tag] == 1) {

                        this.pzChess.x = this.positionX[this.touchChess.tag];
                        this.pzChess.y = this.positionY[this.touchChess.tag];

                        this.chessList[this.pzChess.tag].opacity = 0;
                        this.Red_names[this.pzChess] = 0;
                        this.flag[this.pzChess.tag] = 2;
                        this.chessList[this.pzChess.tag].zIndex = 0;
                        cc.log('空棋子 黑');
                    } else {

                        this.pzChess.x = this.positionX[this.touchChess.tag];
                        this.pzChess.y = this.positionY[this.touchChess.tag];

                        this.chessList[this.pzChess.tag].opacity = 0;
                        this.Black_names[this.pzChess] = 0;
                        this.flag[this.pzChess.tag] = 2;
                        this.chessList[this.pzChess.tag].zIndex = 0;
                        cc.log('空棋子 红');
                    }
                } else {
                    cc.log('同色不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            }
        } else {
            cc.log('不销毁');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyIsImFzc2V0cy9TY3JpcHQvUFouanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDSTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFGUztBQUliO0FBQ0k7QUFDQTtBQUZPOztBQUtYO0FBQ0k7QUFDQTtBQUZjOztBQUtsQjtBQUNJO0FBQ0E7QUFGYzs7QUFLbEI7QUFDSTtBQUNBO0FBQ0E7QUFIUTs7QUFNWjtBQUNJO0FBQ0E7QUFDQTtBQUhpQjs7QUFNckI7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUhLO0FBS1Q7QUFDSTtBQUNBO0FBRkc7O0FBTVA7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGTztBQUlYO0FBQ0E7QUFDQTtBQUNBO0FBMURKO0FBZ0VRO0FBQ0E7QUFDQTtBQUhNOztBQVlkO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVKO0FBQ0c7QUFDSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0k7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEOzs7QUFHQTs7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDs7QUFFRDs7O0FBR0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFFSjs7QUFFRDtBQUNIO0FBRUo7QUFJSjtBQUNEO0FBQ0E7QUFDSTtBQUNIOztBQUlEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIOztBQUlEOztBQUdIOztBQUVEO0FBQ0k7QUFDQTtBQUE2QztBQUN6QztBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFRTtBQUNFO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDTDtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDTDtBQUNJO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDTDtBQUNJO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUE5RFQ7QUFpRUg7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDtBQUNHOztBQUdEO0FBQ0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDRztBQUNBOztBQUVJOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFSDs7QUFFRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7QUFDRzs7QUFFSTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUVKO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUVKO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7O0FBRUE7QUExY0s7Ozs7Ozs7Ozs7QUNGVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJTDtBQUNEOztBQU5POztBQVdaO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUdDO0FBQ0U7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ0g7QUFDQTtBQUNHO0FBQ0Y7O0FBcENJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkU7QUFYRTs7QUFpQlo7QUFDQTtBQUNJOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0g7QUFDRDs7Ozs7QUFLQTtBQUNJOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUM7QUFDSjs7QUFJRDs7Ozs7QUFLQTtBQUNJOztBQUVIOztBQUVEOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUEzRksiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmxhY2sgPSBbNSwgNSwgNSwgNSwgNSwgNiwgNiwgOCwgOCwgMTAsIDEwLCAxMiwgMTIsIDE0LCAxNCwgMTVdO1xudmFyIFJlZCA9IFs1LCA1LCA1LCA1LCA1LCA2LCA2LCA4LCA4LCAxMCwgMTAsIDEyLCAxMiwgMTQsIDE0LCAxNV07XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIGNoZXNzUHJlZmFiOiB7Ly/mo4vlrZDnmoTpooTliLbotYTmupBcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgY2hlc3NMaXN0OiB7Ly/mo4vlrZDoioLngrnnmoTpm4blkIjvvIznlKjkuIDnu7TmlbDnu4TooajnpLrkuoznu7TkvY3nva5cbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLm5vZGVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgd2hpdGVTcHJpdGVGcmFtZTogey8v5qOL55qE5Zu+54mHXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcblxuICAgICAgICBibGFja1Nwcml0ZUZyYW1lOiB7Ly93deaji+eahOWbvueJh1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG91Y2hDaGVzczogey8v5q+P5LiA5Zue5ZCI54K55Ye755qE5qOL5a2QXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcblxuICAgICAgICB0aGVfbGFzdF90b3VjaENoZXNzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcblxuICAgICAgICBidG5fdGVzdDogY2MuQnV0dG9uLFxuICAgICAgICBpc0Rlc3Rvcnk6IGNjLkJvb2xlYW4sXG5cbiAgICAgICAgcHpDaGVzczogey8vXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWVzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TdHJpbmddLFxuICAgICAgICAgICAgLy8g55SoIHR5cGUg5oyH5a6a5pWw57uE55qE5q+P5Liq5YWD57Sg6YO95piv5a2X56ym5Liy57G75Z6LXG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zaXRpb25YOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5JbnRlZ2VyXVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvblk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLkludGVnZXJdXG4gICAgICAgIH0sXG4gICAgICAgIC8vIENoZXNzTW9kZWw6e1xuICAgICAgICAvLyAgICAgZGVmYXVsdDpbXSxcbiAgICAgICAgUmVkX25hbWVzOiBbY2MuU3RyaW5nXSxcbiAgICAgICAgQmxhY2tfbmFtZXM6IFtjYy5TdHJpbmddLFxuICAgICAgICBwb3NpdGlvblg6IFtjYy5JbnRlZ2VyXSxcbiAgICAgICAgcG9zaXRpb25ZOiBbY2MuSW50ZWdlcl0sXG4gICAgICAgIC8vIHRhZzpbY2MuSW50ZWdlcl0sXG4gICAgICAgIGZsYWc6IFtjYy5JbnRlZ2VyXSxcbiAgICAgICAgZWF0Q2hlc3M6IHsvL1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG5cblxuXG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGlzRGVzdG9yeSA9ZmFsc2U7XG4gICAgICAgIC8vIHZhciBrZXkxID0gJ+WKqOaAgWtleTEnO1xuICAgICAgICAvLyB2YXIga2V5MiA9ICfliqjmgIFrZXkyJztcbiAgICAgICAgLy8gdmFyIG1hcCA9IHt9O1xuICAgICAgICAvLyBtYXBba2V5MV0gPSAxO1xuICAgICAgICAvLyBtYXBba2V5Ml0gPSAyO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hcFtrZXkxXSk7Ly/nu5PmnpzmmK8xLlxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXBba2V5Ml0pOy8v57uT5p6c5pivMi5tXG5cbiAgICAgICAgLy8gLy/lpoLmnpzpgY3ljoZtYXBcbiAgICAgICAgLy8gZm9yKHZhciBwcm9wIGluIG1hcCl7XG4gICAgICAgIC8vICAgICBpZihtYXAuaGFzT3duUHJvcGVydHkocHJvcCkpe1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdrZXkgaXMgJyArIHByb3AgKycgYW5kIHZhbHVlIGlzJyArIG1hcFtwcm9wXSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgbUNoZXNzTW9kZWwgPSBjYy5DbGFzcyh7XG4gICAgICAgIC8vICAgcG9zaXRpb25YOiAwLFxuICAgICAgICAvLyAgICAgcG9zaXRpb25ZOiAwLFxuICAgICAgICAvLyAgICAgdGFnOiAwLFxuICAgICAgICAvLyAgICAgbmFtZTogJycsXG4gICAgICAgIC8vICAgICBmbGFnOiAwXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliJvlu7rmo4vlrZBcbiAgICAgICAgICovXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgIC8v5Yid5aeL5YyW5qOL55uY5LiKMjI15Liq5qOL5a2Q6IqC54K577yM5bm25Li65q+P5Liq6IqC54K55re75Yqg5LqL5Lu2XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGVzc1ByZWZhYik7Ly/lpI3liLZDaGVzc+mihOWItui1hOa6kFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdOb2RlKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiAyKSA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+e6ouiJslxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbGFnW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiBSZWQubGVuZ3RoKTsgLy/pmo/mnLrkuIDkvY3mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygn6ZqP5py6JyArIFJlZFtudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUmVkX25hbWVzW2ldID0gUmVkW251bWJlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWQuc3BsaWNlKG51bWJlciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+m7keiJslxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbGFnW2ldID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIEJsYWNrLmxlbmd0aCk7IC8v6ZqP5py65LiA5L2N5pWwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ+maj+acuicgKyBCbGFja1tudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQmxhY2tfbmFtZXNbaV0gPSBCbGFja1tudW1iZXJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgQmxhY2suc3BsaWNlKG51bWJlciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChCbGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+m7keiJslxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbGFnW2ldID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIEJsYWNrLmxlbmd0aCk7IC8v6ZqP5py65LiA5L2N5pWwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ+maj+acuicgKyBCbGFja1tudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQmxhY2tfbmFtZXNbaV0gPSBCbGFja1tudW1iZXJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgQmxhY2suc3BsaWNlKG51bWJlciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+e6ouiJslxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mbGFnW2ldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChjYy5yYW5kb20wVG8xKCkgKiBSZWQubGVuZ3RoKTsgLy/pmo/mnLrkuIDkvY3mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygn6ZqP5py6JyArIFJlZFtudW1iZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUmVkX25hbWVzW2ldID0gUmVkW251bWJlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWQuc3BsaWNlKG51bWJlciwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnBvc2l0aW9uWFtpXSA9ICh4ICsgNSkgKiAxMDUgLSA4OTA7XG4gICAgICAgICAgICAgICAgc2VsZi5wb3NpdGlvbllbaV0gPSAoeSArIDIpICogMTEwIC0gMzcwO1xuXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihjYy5wKHNlbGYucG9zaXRpb25YW2ldLCBzZWxmLnBvc2l0aW9uWVtpXSkpOy8v5qC55o2u5qOL55uY5ZKM5qOL5a2Q5aSn5bCP6K6h566X5L2/5q+P5Liq5qOL5a2Q6IqC54K55L2N5LqO5oyH5a6a5L2N572uXG5cblxuICAgICAgICAgICAgICAgIG5ld05vZGUuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgIFxuICAgICAgICAgICAgICAgIC8vIG5ld05vZGUuZ3JvdXAgPSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgIG5ld05vZGUudGFnID0gaTtcblxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3QucHVzaChuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICBuZXdOb2RlLmdldENvbXBvbmVudCgnUFonKS5nYW1lID0gdGhpcztcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIHZhciBtQ2hlc3NNb2RlbCA9IG5ldyBDaGVzc01vZGVsKCk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog54K55Ye7IFRPVUNIX1NUQVJUXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gMTAwOy8v5bGC57qn566h55CGICAgXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG91Y2hDaGVzcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNEZXN0b3J5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3NpdGlvblhbdGhpcy50YWddID0gdGhpcy54O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc2l0aW9uWVt0aGlzLnRhZ10gPSB0aGlzLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKG1DaGVzc01vZGVsLnBvc2l0aW9uWCsnLS0tLScrbUNoZXNzTW9kZWwucG9zaXRpb25ZKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVzcyhzZWxmLmZsYWdbdGhpcy50YWddKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5aaC5p6c56ys5LiA5qyh54K55Ye75LiO5oOz6KaB5ouW5Yqo55qE5qOL5a2Q5Li65ZCM5LiA5LiqIOWImeWFgeiuuOaLluWKqFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50aGVfbGFzdF90b3VjaENoZXNzICE9IG51bGwgJiYgc2VsZi50b3VjaENoZXNzLnRhZyA9PSBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmxhYmVsLnN0cmluZyA9ICcxMjMzMjEnXG4gICAgICAgICAgICAgICAgICAgIC8vICAgbmV3Tm9kZS5hZGRDaGlsZChsYWJlbClcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jaGVzc0xpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnVE9VQ0hfU1RBUlQ6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICog54K55Ye7IFRPVUNIX0VORFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnID0gc2VsZi50b3VjaENoZXNzLnRhZzsvLyDotYvlgLx0YWdcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0Rlc3RvcnlmdW5jdGlvbihzZWxmLnBvc2l0aW9uWFt0aGlzLnRhZ10sIHNlbGYucG9zaXRpb25ZW3RoaXMudGFnXSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICog5ouW5YqoIFRPVUNIX01PVkVcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IGV2ZW50LnRvdWNoLmdldERlbHRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gZGVsdGEueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSBkZWx0YS55O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG5cbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vIHRoaXMuYnRuX3Rlc3Qubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fdGVzdF9mdW5jLCB0aGlzKVxuICAgIH0sXG5cblxuXG4gICAgc2V0Q2hlc3M6IGZ1bmN0aW9uIChmbGFnKSB7XG4gICAgICAgIHZhciB0ZXN0X2xhYmVsID0gdGhpcy50b3VjaENoZXNzLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvdWNoQ2hlc3MudGFnKVxuICAgICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAwLCAwKTtcbiAgICAgICAgICAgIHRlc3RfbGFiZWwuc3RyaW5nID0gdGhpcy5nZXRDaGVzc0haKHRoaXMuUmVkX25hbWVzW3RoaXMudG91Y2hDaGVzcy50YWddLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlc3RfbGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigwLCAwLCAwKTtcbiAgICAgICAgICAgIHRlc3RfbGFiZWwuc3RyaW5nID0gdGhpcy5nZXRDaGVzc0haKHRoaXMuQmxhY2tfbmFtZXNbdGhpcy50b3VjaENoZXNzLnRhZ10sIDEpO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vICB0aGlzLmNoZXNzTGlzdFt0aGlzLnRvdWNoQ2hlc3MudGFnXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2hpdGVTcHJpdGVGcmFtZTtcblxuXG4gICAgfSxcblxuICAgIGRlc3RvcnlDaGVzczogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIHRoaXMuaXNEZXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hDaGVzcy50YWcgPT0gb3RoZXIubm9kZS50YWcpIHsgLy/mnInml7blgJkg5LiN6IO95YiG6L6oIOaYr+WQpuaYr+eCueS4reeahOaji+WtkCDliKTmlq3mo4vlrZBcbiAgICAgICAgICAgIHRoaXMucHpDaGVzcyA9IHNlbGYubm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHpDaGVzcyA9IG90aGVyLm5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5wekNoZXNzID0gb3RoZXI7XG4gICAgfSxcblxuICAgIG5vdGRlc3RvcnlDaGVzczogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIHRoaXMuaXNEZXN0b3J5ID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGdldENoZXNzSFo6IGZ1bmN0aW9uIChwb3NpdGlvbiwgZmxhZykge1xuICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAvLyB2YXIgUmVkID0gWzUsIDUsIDUsIDUsIDUsIDYsIDYsIDgsIDgsIDEwLCAxMCwgMTIsIDEyLCAxNCwgMTQsIDE1XTtcbiAgICAgICAgICAgIC8vIGNhc2UgNTpcbiAgICAgICAgICAgIC8vICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAn5YW1JztcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJ+WNkic7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gY2FzZSA2OlxuICAgICAgICAgICAgLy8gICAgIHJldHVybiAn54KuJztcbiAgICAgICAgICAgIC8vIGNhc2UgODpcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gJ+mprCc7XG4gICAgICAgICAgICAvLyBjYXNlIDEwOlxuICAgICAgICAgICAgLy8gICAgIHJldHVybiAn6L2mJztcbiAgICAgICAgICAgIC8vIGNhc2UgMTI6XG4gICAgICAgICAgICAvLyAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJ+ebuCc7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuICfosaEnO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIGNhc2UgMTQ6XG4gICAgICAgICAgICAvLyAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJ+S7lSc7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuICflo6snO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIGNhc2UgMTU6XG4gICAgICAgICAgICAvLyAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gJ+W4hSc7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuICflsIYnO1xuICAgICAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnNSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHJldHVybiAnNic7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc4JztcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcxMCc7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcxMic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcxMic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICBpZiAoZmxhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTQnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzE1JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzE1JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpc0Rlc3RvcnlmdW5jdGlvbjogZnVuY3Rpb24gKFgsIFkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0b3J5KSB7XG4gICAgICAgICAgICBjYy5sb2coJ+mUgOavgScpXG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IHRoaXMucHpDaGVzcy54O1xuICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSB0aGlzLnB6Q2hlc3MueTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmxhZ1t0aGlzLnRvdWNoQ2hlc3MudGFnXSA9PSAwICYmIHRoaXMuZmxhZ1t0aGlzLnB6Q2hlc3MudGFnXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy/nuqLlkIPpu5FcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5SZWRfbmFtZXNbdGhpcy50b3VjaENoZXNzLnRhZ10gPiB0aGlzLkJsYWNrX25hbWVzW3RoaXMucHpDaGVzcy50YWddKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHpDaGVzcy5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8gdGhpcy5wekNoZXNzLmRlc3Ryb3koKTsgICAvL+WQg+WtkFxuICAgICAgICAgICAgICAgICAgICAvLyAgdGhpcy5CbGFja19uYW1lc1t0aGlzLnB6Q2hlc3MudGFnXSA9IHRoaXMucHpDaGVzcy54KjEwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHpDaGVzcyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hlc3NQcmVmYWIpOy8v5aSN5Yi2Q2hlc3PpooTliLbotYTmupBcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfnuqLlkIPpu5EnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueCA9IHRoaXMucG9zaXRpb25YW3RoaXMudG91Y2hDaGVzcy50YWddO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueSA9IHRoaXMucG9zaXRpb25ZW3RoaXMudG91Y2hDaGVzcy50YWddO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLm9wYWNpdHkgPTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmxhY2tfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10gPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYWdbdGhpcy5wekNoZXNzLnRhZ10gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdFt0aGlzLnB6Q2hlc3MudGFnXS56SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlJlZF9uYW1lc1t0aGlzLnRvdWNoQ2hlc3MudGFnXSA9PSB0aGlzLkJsYWNrX25hbWVzW3RoaXMucHpDaGVzcy50YWddKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn5LiN5ZCM6Imy5ZCM5qC355qE5qOL5a2QLS3plIDmr4EnKVxuXG5cbiAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueCA9IHRoaXMucG9zaXRpb25YW3RoaXMudG91Y2hDaGVzcy50YWddO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueSA9IHRoaXMucG9zaXRpb25ZW3RoaXMudG91Y2hDaGVzcy50YWddO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLm9wYWNpdHkgPTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQmxhY2tfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10gPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYWdbdGhpcy5wekNoZXNzLnRhZ10gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdFt0aGlzLnB6Q2hlc3MudGFnXS56SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnB6Q2hlc3MuZGVzdHJveSgpOyAgIC8v5ZCD5a2QXG5cblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLkJsYWNrX25hbWVzW3RoaXMucHpDaGVzcy50YWddID0gdGhpcy5wekNoZXNzLngqMTA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfnuqLlkIPpu5EtLeS4jemUgOavgScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy54ID0gWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mbGFnW3RoaXMudG91Y2hDaGVzcy50YWddID09IDEgJiYgdGhpcy5mbGFnW3RoaXMucHpDaGVzcy50YWddID09IDApIHtcbiAgICAgICAgICAgICAgICAvL+m7keWQg+e6olxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkJsYWNrX25hbWVzW3RoaXMudG91Y2hDaGVzcy50YWddID4gdGhpcy5SZWRfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10pIHtcblxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+m7keWQg+e6oicpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueCA9IHRoaXMucG9zaXRpb25YW3RoaXMudG91Y2hDaGVzcy50YWddO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3MueSA9IHRoaXMucG9zaXRpb25ZW3RoaXMudG91Y2hDaGVzcy50YWddO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLm9wYWNpdHkgPTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVkX25hbWVzW3RoaXMucHpDaGVzc10gPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYWdbdGhpcy5wekNoZXNzLnRhZ10gPSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdFt0aGlzLnB6Q2hlc3MudGFnXS56SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLkJsYWNrX25hbWVzW3RoaXMudG91Y2hDaGVzcy50YWddID09IHRoaXMuUmVkX25hbWVzW3RoaXMucHpDaGVzcy50YWddKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfkuI3lkIzoibLlkIzmoLfnmoTmo4vlrZAtLemUgOavgScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy54ID0gdGhpcy5wb3NpdGlvblhbdGhpcy50b3VjaENoZXNzLnRhZ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy55ID0gdGhpcy5wb3NpdGlvbllbdGhpcy50b3VjaENoZXNzLnRhZ107XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3RbdGhpcy5wekNoZXNzLnRhZ10ub3BhY2l0eSA9MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZWRfbmFtZXNbdGhpcy5wekNoZXNzXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxhZ1t0aGlzLnB6Q2hlc3MudGFnXSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLnpJbmRleCA9IDA7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuUmVkX25hbWVzW3RoaXMucHpDaGVzcy50YWddID0gdGhpcy5wekNoZXNzLngqMTA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfpu5HlkIPnuqItLeS4jemUgOavgScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy54ID0gWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5mbGFnW3RoaXMucHpDaGVzcy50YWddID09IDIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZsYWdbdGhpcy50b3VjaENoZXNzLnRhZ109PTEpe1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy54ID0gdGhpcy5wb3NpdGlvblhbdGhpcy50b3VjaENoZXNzLnRhZ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy55ID0gdGhpcy5wb3NpdGlvbllbdGhpcy50b3VjaENoZXNzLnRhZ107XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3RbdGhpcy5wekNoZXNzLnRhZ10ub3BhY2l0eSA9MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZWRfbmFtZXNbdGhpcy5wekNoZXNzXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxhZ1t0aGlzLnB6Q2hlc3MudGFnXSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W3RoaXMucHpDaGVzcy50YWddLnpJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+epuuaji+WtkCDpu5EnKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy54ID0gdGhpcy5wb3NpdGlvblhbdGhpcy50b3VjaENoZXNzLnRhZ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy55ID0gdGhpcy5wb3NpdGlvbllbdGhpcy50b3VjaENoZXNzLnRhZ107XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3RbdGhpcy5wekNoZXNzLnRhZ10ub3BhY2l0eSA9MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CbGFja19uYW1lc1t0aGlzLnB6Q2hlc3NdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGFnW3RoaXMucHpDaGVzcy50YWddID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3RbdGhpcy5wekNoZXNzLnRhZ10uekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn56m65qOL5a2QIOe6oicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCflkIzoibLkuI3plIDmr4EnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZygn5LiN6ZSA5q+BJylcbiAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy54ID0gWDtcbiAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7IiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAgIGJ0bl9zdGF0cjogY2MuQnV0dG9uLFxuICAgICAgICAgYnRuX2V4aXQ6IGNjLkJ1dHRvbixcblxuICAgICAgICBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gJ0FRJztcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIHRoaXMuYnRuX3N0YXRyLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuYnRuX3N0YXJ0X29uY2xpY2ssdGhpcylcbiAgICB0aGlzLmJ0bl9leGl0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuYnRuX2V4aXRfb25DbGljayx0aGlzKVxuIFxuXG4gICAgfSxcbiAgICAgICBidG5fc3RhcnRfb25jbGljayA6ZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX3N0YXRyX29uQ2xpY2tcIilcbi8vICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnZ2FtZScsIGZ1bmN0aW9uICgpIHtcbi8vICAgICBjYy5sb2coJ05leHQgc2NlbmUgcHJlbG9hZGVkJyk7XG4vLyB9KTtcbiAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgIH0sXG4gICAgYnRuX2V4aXRfb25DbGljazpmdW5jdGlvbihldmVudCl7XG4gICAgICAgY29uc29sZS5sb2coXCJidG5fZXhpdF9vbkNsaWNrXCIpXG4gICAgfSxcbiAgXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGdhbWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiDnorDmkp7nm7jlhbNcbiAgICAgICAgICAgICAgICovXG4gICAgICAgIC8v6I635Y+W56Kw5pKe5qOA5rWL57O757ufXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xuICAgICAgICAvL+W8gOWQr+eisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAvL2RlYnVnIOe7mOWItlxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlO1xuICAgICAgICAvL+e7mOWItuWMheWbtOebklxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWREcmF3Qm91bmRpbmdCb3ggPSB0cnVlO1xuXG4gICAgICAgIC8vIFB6VG91Y2hDaGVzcyA9IGdldENvbXBvbmVudCgnU3RhcicpLmdhbWUgPSB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICog5b2T56Kw5pKe5Lqn55Sf55qE5pe25YCZ6LCD55SoXG4gICogQHBhcmFtICB7Q29sbGlkZXJ9IG90aGVyIOS6p+eUn+eisOaSnueahOWPpuS4gOS4queisOaSnue7hOS7tlxuICAqIEBwYXJhbSAge0NvbGxpZGVyfSBzZWxmICDkuqfnlJ/norDmkp7nmoToh6rouqvnmoTnorDmkp7nu4Tku7ZcbiAgKi9cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBlbnRlcicpO1xuXG4gICAgICAgIC8vIC8vIOeisOaSnuezu+e7n+S8muiuoeeul+WHuueisOaSnue7hOS7tuWcqOS4lueVjOWdkOagh+ezu+S4i+eahOebuOWFs+eahOWAvO+8jOW5tuaUvuWIsCB3b3JsZCDov5nkuKrlsZ7mgKfph4zpnaJcbiAgICAgICAgLy8gdmFyIHdvcmxkID0gc2VsZi53b3JsZDtcblxuICAgICAgICAvLyAvLyDnorDmkp7nu4Tku7bnmoQgYWFiYiDnorDmkp7moYZcbiAgICAgICAgLy8gdmFyIGFhYmIgPSB3b3JsZC5hYWJiO1xuXG4gICAgICAgIC8vIC8vIOS4iuS4gOasoeiuoeeul+eahOeisOaSnue7hOS7tueahCBhYWJiIOeisOaSnuahhlxuICAgICAgICAvLyB2YXIgcHJlQWFiYiA9IHdvcmxkLnByZUFhYmI7XG5cbiAgICAgICAgLy8gLy8g56Kw5pKe5qGG55qE5LiW55WM55+p6Zi1XG4gICAgICAgIC8vIHZhciB0ID0gd29ybGQudHJhbnNmb3JtO1xuXG4gICAgICAgIC8vIC8vIOS7peS4i+WxnuaAp+S4uuWchuW9oueisOaSnue7hOS7tueJueacieWxnuaAp1xuICAgICAgICAvLyB2YXIgciA9IHdvcmxkLnJhZGl1cztcbiAgICAgICAgLy8gdmFyIHAgPSB3b3JsZC5wb3NpdGlvbjtcblxuICAgICAgICAvLyAvLyDku6XkuIvlsZ7mgKfkuLog55+p5b2iIOWSjCDlpJrovrnlvaIg56Kw5pKe57uE5Lu254m55pyJ5bGe5oCnXG4gICAgICAgIC8vIHZhciBwcyA9IHdvcmxkLnBvaW50cztcblxuICAgICAgICAgdGhpcy5nYW1lLmRlc3RvcnlDaGVzcyhvdGhlcixzZWxmKTtcbiAgICB9LFxuXG5cblxuICAgIC8qKlxuICAgICAqIOW9k+eisOaSnuS6p+eUn+WQju+8jOeisOaSnue7k+adn+WJjeeahOaDheWGteS4i++8jOavj+asoeiuoeeul+eisOaSnue7k+aenOWQjuiwg+eUqFxuICAgICAqIEBwYXJhbSAge0NvbGxpZGVyfSBvdGhlciDkuqfnlJ/norDmkp7nmoTlj6bkuIDkuKrnorDmkp7nu4Tku7ZcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gc2VsZiAg5Lqn55Sf56Kw5pKe55qE6Ieq6Lqr55qE56Kw5pKe57uE5Lu2XG4gICAgICovXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBzdGF5Jyk7XG4gICAgICAgXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOW9k+eisOaSnue7k+adn+WQjuiwg+eUqFxuICAgICAqIEBwYXJhbSAge0NvbGxpZGVyfSBvdGhlciDkuqfnlJ/norDmkp7nmoTlj6bkuIDkuKrnorDmkp7nu4Tku7ZcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gc2VsZiAg5Lqn55Sf56Kw5pKe55qE6Ieq6Lqr55qE56Kw5pKe57uE5Lu2XG4gICAgICovXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiAob3RoZXIsc2VsZikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb24gY29sbGlzaW9uIGV4aXQnKTtcbiAgICAgICAgdGhpcy5nYW1lLm5vdGRlc3RvcnlDaGVzcyhvdGhlcixzZWxmKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==