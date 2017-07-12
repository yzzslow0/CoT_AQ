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
    }, _defineProperty(_properties, 'positionX', [cc.Integer]), _defineProperty(_properties, 'positionY', [cc.Integer]), _defineProperty(_properties, 'flag', [cc.Integer]), _properties),

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
                        cc.log('随机' + Red[number]);
                        self.Red_names[i] = Red[number];
                        Red.splice(number, 1);
                    } else {
                        //黑色
                        self.flag[i] = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        cc.log('随机' + Black[number]);
                        self.Black_names[i] = Black[number];
                        Black.splice(number, 1);
                    }
                } else {
                    if (Black.length > 0) {
                        //黑色
                        self.flag[i] = 1;

                        var number = parseInt(cc.random0To1() * Black.length); //随机一位数
                        cc.log('随机' + Black[number]);
                        self.Black_names[i] = Black[number];
                        Black.splice(number, 1);
                    } else {
                        //红色
                        self.flag[i] = 0;
                        var number = parseInt(cc.random0To1() * Red.length); //随机一位数
                        cc.log('随机' + Red[number]);
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
                this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.whiteSpriteFrame;
                i++;
            }
        }
    },
    // called every frame
    update: function update(dt) {
        this.btn_test.node.on(cc.Node.EventType.TOUCH_START, this.btn_test_func, this);
    },

    newNode_onClick: function newNode_onClick() {
        console.log(newNode.tag);
        //  this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
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

        //  this.chessList[this.touchChess.tag].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;

    },
    btn_test_func: function btn_test_func(event) {
        this.getComponent(cc.Label).string = '123';
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
                    /**
                     * 尝试 替换 prefab 以空节点来做
                     */

                    // this.pzChess.opacity = 0;
                    // // this.pzChess.destroy();   //吃子
                    // this.Black_names[this.pzChess.tag] = this.pzChess.x*10;


                } else if (this.Red_names[this.touchChess.tag] == this.Black_names[this.pzChess.tag]) {
                    cc.log('不同色同样的棋子--销毁');

                    this.pzChess.opacity = 0;
                    // this.pzChess.destroy();   //吃子


                    this.Black_names[this.pzChess.tag] = this.pzChess.x * 10;
                } else {
                    cc.log('红吃黑--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else if (this.flag[this.touchChess.tag] == 1 && this.flag[this.pzChess.tag] == 0) {
                //黑吃红
                if (this.Black_names[this.touchChess.tag] > this.Red_names[this.pzChess.tag]) {
                    this.pzChess.opacity = 0;

                    // this.pzChess.destroy();   //吃子
                    this.Red_names[this.pzChess.tag] = this.pzChess.x * 10;
                } else if (this.Black_names[this.touchChess.tag] == this.Red_names[this.pzChess.tag]) {

                    cc.log('不同色同样的棋子--销毁');

                    this.pzChess.opacity = 0;
                    // this.pzChess.destroy();   //吃子


                    this.Red_names[this.pzChess.tag] = this.pzChess.x * 10;
                } else {
                    cc.log('黑吃红--不销毁');
                    this.touchChess.x = X;
                    this.touchChess.y = Y;
                }
            } else {
                cc.log('同色不销毁');
                this.touchChess.x = X;
                this.touchChess.y = Y;
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
        // //debug 绘制
        // manager.enabledDebugDraw = true;
        // //绘制包围盒
        // manager.enabledDrawBoundingBox = true;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyIsImFzc2V0cy9TY3JpcHQvUFouanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDSTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFGUzs7QUFLYjtBQUNJO0FBQ0E7QUFGTzs7QUFLWDtBQUNJO0FBQ0E7QUFGYzs7QUFLbEI7QUFDSTtBQUNBO0FBRmM7O0FBS2xCO0FBQ0k7QUFDQTtBQUNBO0FBSFE7O0FBTVo7QUFDSTtBQUNBO0FBQ0E7QUFIaUI7O0FBTXJCO0FBQ0E7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFISztBQUtUO0FBQ0k7QUFDQTtBQUZHOztBQU1QO0FBQ0k7QUFDQTtBQUZPO0FBSVg7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNBO0FBQ0E7QUFDQTtBQTNESjs7QUF1RUE7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBRUo7QUFDRztBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7OztBQUdBOztBQUVJOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUVIOztBQUVEOzs7QUFHQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUVKO0FBQ0Q7QUFDQTtBQUNIO0FBRUo7QUFJSjtBQUNEO0FBQ0E7QUFDSTtBQUNIOztBQUlEO0FBQ0k7QUFDQTtBQUNIOztBQUtEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIOztBQUlEOztBQUdIO0FBQ0Q7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUE2QztBQUN6QztBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNBO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSjtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNMO0FBQ0k7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQS9CVDtBQWtDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNJOzs7O0FBSUE7QUFDQTtBQUNBOzs7QUFJSDtBQUNHOztBQUdBO0FBQ0E7OztBQUlBO0FBQ0g7QUFDRztBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0c7QUFDQTtBQUNJOztBQUdBO0FBQ0E7QUFJSDs7QUFFRzs7QUFHQTtBQUNBOzs7QUFJQTtBQUNIO0FBQ0c7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNHO0FBQ0E7QUFDQTtBQUNIO0FBRUo7QUFDRztBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTs7QUFFQTtBQXZZSzs7Ozs7Ozs7OztBQ0ZUO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGRztBQUlMO0FBQ0Q7O0FBTk87O0FBV1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBR0M7QUFDRTtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDSDtBQUNBO0FBQ0c7QUFDRjs7QUFwQ0k7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGRTtBQVhFOztBQWlCWjtBQUNBO0FBQ0k7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSDtBQUNEOzs7OztBQUtBO0FBQ0k7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQztBQUNKOztBQUlEOzs7OztBQUtBO0FBQ0k7O0FBRUg7O0FBRUQ7Ozs7O0FBS0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQTNGSyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCbGFjayA9IFs1LCA1LCA1LCA1LCA1LCA2LCA2LCA4LCA4LCAxMCwgMTAsIDEyLCAxMiwgMTQsIDE0LCAxNV07XG52YXIgUmVkID0gWzUsIDUsIDUsIDUsIDUsIDYsIDYsIDgsIDgsIDEwLCAxMCwgMTIsIDEyLCAxNCwgMTQsIDE1XTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgY2hlc3NQcmVmYWI6IHsvL+aji+WtkOeahOmihOWItui1hOa6kFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZXNzTGlzdDogey8v5qOL5a2Q6IqC54K555qE6ZuG5ZCI77yM55So5LiA57u05pWw57uE6KGo56S65LqM57u05L2N572uXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5ub2RlXVxuICAgICAgICB9LFxuXG4gICAgICAgIHdoaXRlU3ByaXRlRnJhbWU6IHsvL+aji+eahOWbvueJh1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmxhY2tTcHJpdGVGcmFtZTogey8vd3Xmo4vnmoTlm77niYdcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvdWNoQ2hlc3M6IHsvL+avj+S4gOWbnuWQiOeCueWHu+eahOaji+WtkFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZS8v5bGe5oCn56qX5Y+j5LiN5pi+56S6XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhlX2xhc3RfdG91Y2hDaGVzczoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZS8v5bGe5oCn56qX5Y+j5LiN5pi+56S6XG4gICAgICAgIH0sXG5cbiAgICAgICAgYnRuX3Rlc3Q6IGNjLkJ1dHRvbixcbiAgICAgICAgaXNEZXN0b3J5OiBjYy5Cb29sZWFuLFxuXG4gICAgICAgIHB6Q2hlc3M6IHsvL1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBuYW1lczoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuU3RyaW5nXSxcbiAgICAgICAgICAgIC8vIOeUqCB0eXBlIOaMh+WumuaVsOe7hOeahOavj+S4quWFg+e0oOmDveaYr+Wtl+espuS4suexu+Wei1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc2l0aW9uWDoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuSW50ZWdlcl1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb25ZOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5JbnRlZ2VyXVxuICAgICAgICB9LFxuICAgICAgICAvLyBDaGVzc01vZGVsOntcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6W10sXG4gICAgICAgIFJlZF9uYW1lczogW2NjLlN0cmluZ10sXG4gICAgICAgIEJsYWNrX25hbWVzOiBbY2MuU3RyaW5nXSxcbiAgICAgICAgcG9zaXRpb25YOiBbY2MuSW50ZWdlcl0sXG4gICAgICAgIHBvc2l0aW9uWTogW2NjLkludGVnZXJdLFxuICAgICAgICAvLyB0YWc6W2NjLkludGVnZXJdLFxuICAgICAgICBmbGFnOiBbY2MuSW50ZWdlcl0sXG5cblxuXG5cbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaXNEZXN0b3J5ID1mYWxzZTtcbiAgICAgICAgLy8gdmFyIGtleTEgPSAn5Yqo5oCBa2V5MSc7XG4gICAgICAgIC8vIHZhciBrZXkyID0gJ+WKqOaAgWtleTInO1xuICAgICAgICAvLyB2YXIgbWFwID0ge307XG4gICAgICAgIC8vIG1hcFtrZXkxXSA9IDE7XG4gICAgICAgIC8vIG1hcFtrZXkyXSA9IDI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWFwW2tleTFdKTsvL+e7k+aenOaYrzEuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hcFtrZXkyXSk7Ly/nu5PmnpzmmK8yLm1cblxuICAgICAgICAvLyAvL+WmguaenOmBjeWOhm1hcFxuICAgICAgICAvLyBmb3IodmFyIHByb3AgaW4gbWFwKXtcbiAgICAgICAgLy8gICAgIGlmKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2tleSBpcyAnICsgcHJvcCArJyBhbmQgdmFsdWUgaXMnICsgbWFwW3Byb3BdKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHZhciBtQ2hlc3NNb2RlbCA9IGNjLkNsYXNzKHtcbiAgICAgICAgLy8gICBwb3NpdGlvblg6IDAsXG4gICAgICAgIC8vICAgICBwb3NpdGlvblk6IDAsXG4gICAgICAgIC8vICAgICB0YWc6IDAsXG4gICAgICAgIC8vICAgICBuYW1lOiAnJyxcbiAgICAgICAgLy8gICAgIGZsYWc6IDBcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWIm+W7uuaji+WtkFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgLy/liJ3lp4vljJbmo4vnm5jkuIoyMjXkuKrmo4vlrZDoioLngrnvvIzlubbkuLrmr4/kuKroioLngrnmt7vliqDkuovku7ZcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgODsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoZXNzUHJlZmFiKTsvL+WkjeWItkNoZXNz6aKE5Yi26LWE5rqQXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld05vZGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIDIpID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoUmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi6ImyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsYWdbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIFJlZC5sZW5ndGgpOyAvL+maj+acuuS4gOS9jeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfpmo/mnLonICsgUmVkW251bWJlcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5SZWRfbmFtZXNbaV0gPSBSZWRbbnVtYmVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZC5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6buR6ImyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsYWdbaV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoY2MucmFuZG9tMFRvMSgpICogQmxhY2subGVuZ3RoKTsgLy/pmo/mnLrkuIDkvY3mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6ZqP5py6JyArIEJsYWNrW251bWJlcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5CbGFja19uYW1lc1tpXSA9IEJsYWNrW251bWJlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBCbGFjay5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEJsYWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6buR6ImyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsYWdbaV0gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoY2MucmFuZG9tMFRvMSgpICogQmxhY2subGVuZ3RoKTsgLy/pmo/mnLrkuIDkvY3mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6ZqP5py6JyArIEJsYWNrW251bWJlcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5CbGFja19uYW1lc1tpXSA9IEJsYWNrW251bWJlcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBCbGFjay5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v57qi6ImyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZsYWdbaV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlciA9IHBhcnNlSW50KGNjLnJhbmRvbTBUbzEoKSAqIFJlZC5sZW5ndGgpOyAvL+maj+acuuS4gOS9jeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfpmo/mnLonICsgUmVkW251bWJlcl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5SZWRfbmFtZXNbaV0gPSBSZWRbbnVtYmVyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZC5zcGxpY2UobnVtYmVyLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYucG9zaXRpb25YW2ldID0gKHggKyA1KSAqIDEwNSAtIDg5MDtcbiAgICAgICAgICAgICAgICBzZWxmLnBvc2l0aW9uWVtpXSA9ICh5ICsgMikgKiAxMTAgLSAzNzA7XG5cbiAgICAgICAgICAgICAgICBuZXdOb2RlLnNldFBvc2l0aW9uKGNjLnAoc2VsZi5wb3NpdGlvblhbaV0sIHNlbGYucG9zaXRpb25ZW2ldKSk7Ly/moLnmja7mo4vnm5jlkozmo4vlrZDlpKflsI/orqHnrpfkvb/mr4/kuKrmo4vlrZDoioLngrnkvY3kuo7mjIflrprkvY3nva5cblxuXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS56SW5kZXggPSAxOy8v5bGC57qn566h55CGICAgXG4gICAgICAgICAgICAgICAgLy8gbmV3Tm9kZS5ncm91cCA9IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS50YWcgPSBpO1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdC5wdXNoKG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuZ2V0Q29tcG9uZW50KCdQWicpLmdhbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgLy8gdmFyIG1DaGVzc01vZGVsID0gbmV3IENoZXNzTW9kZWwoKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDngrnlh7sgVE9VQ0hfU1RBUlRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSAxMDA7Ly/lsYLnuqfnrqHnkIYgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0Rlc3RvcnkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc2l0aW9uWFt0aGlzLnRhZ10gPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zaXRpb25ZW3RoaXMudGFnXSA9IHRoaXMueTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2cobUNoZXNzTW9kZWwucG9zaXRpb25YKyctLS0tJyttQ2hlc3NNb2RlbC5wb3NpdGlvblkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENoZXNzKHNlbGYuZmxhZ1t0aGlzLnRhZ10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lpoLmnpznrKzkuIDmrKHngrnlh7vkuI7mg7PopoHmi5bliqjnmoTmo4vlrZDkuLrlkIzkuIDkuKog5YiZ5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgIT0gbnVsbCAmJiBzZWxmLnRvdWNoQ2hlc3MudGFnID09IHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMubGFiZWwuc3RyaW5nID0gJzEyMzMyMSdcbiAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLmFkZENoaWxkKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNoZXNzTGlzdFtpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmxhY2tTcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCdUT1VDSF9TVEFSVDonICsgaXNNb3ZlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiDngrnlh7sgVE9VQ0hfRU5EXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSAxOy8v5bGC57qn566h55CGICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcgPSBzZWxmLnRvdWNoQ2hlc3MudGFnOy8vIOi1i+WAvHRhZ1xuICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlzRGVzdG9yeWZ1bmN0aW9uKHNlbGYucG9zaXRpb25YW3RoaXMudGFnXSwgc2VsZi5wb3NpdGlvbllbdGhpcy50YWddKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiDmi5bliqggVE9VQ0hfTU9WRVxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblhYHorrjmi5bliqhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVzc0xpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLndoaXRlU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG5cbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHRoaXMuYnRuX3Rlc3Qubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fdGVzdF9mdW5jLCB0aGlzKVxuICAgIH0sXG5cblxuXG4gICAgbmV3Tm9kZV9vbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5ld05vZGUudGFnKVxuICAgICAgICAvLyAgdGhpcy5jaGVzc0xpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG4gICAgfSxcblxuXG5cblxuICAgIHNldENoZXNzOiBmdW5jdGlvbiAoZmxhZykge1xuICAgICAgICB2YXIgdGVzdF9sYWJlbCA9IHRoaXMudG91Y2hDaGVzcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b3VjaENoZXNzLnRhZylcbiAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMCwgMCk7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLnN0cmluZyA9IHRoaXMuZ2V0Q2hlc3NIWih0aGlzLlJlZF9uYW1lc1t0aGlzLnRvdWNoQ2hlc3MudGFnXSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMCwgMCwgMCk7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLnN0cmluZyA9IHRoaXMuZ2V0Q2hlc3NIWih0aGlzLkJsYWNrX25hbWVzW3RoaXMudG91Y2hDaGVzcy50YWddLCAxKTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyAgdGhpcy5jaGVzc0xpc3RbdGhpcy50b3VjaENoZXNzLnRhZ10uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG5cblxuICAgIH0sXG4gICAgYnRuX3Rlc3RfZnVuYzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnMTIzJ1xuICAgIH0sXG5cbiAgICBkZXN0b3J5Q2hlc3M6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLmlzRGVzdG9yeSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoQ2hlc3MudGFnID09IG90aGVyLm5vZGUudGFnKSB7IC8v5pyJ5pe25YCZIOS4jeiDveWIhui+qCDmmK/lkKbmmK/ngrnkuK3nmoTmo4vlrZAg5Yik5pat5qOL5a2QXG4gICAgICAgICAgICB0aGlzLnB6Q2hlc3MgPSBzZWxmLm5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnB6Q2hlc3MgPSBvdGhlci5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMucHpDaGVzcyA9IG90aGVyO1xuICAgIH0sXG5cbiAgICBub3RkZXN0b3J5Q2hlc3M6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLmlzRGVzdG9yeSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBnZXRDaGVzc0haOiBmdW5jdGlvbiAocG9zaXRpb24sIGZsYWcpIHtcbiAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgICAgICAgLy8gdmFyIFJlZCA9IFs1LCA1LCA1LCA1LCA1LCA2LCA2LCA4LCA4LCAxMCwgMTAsIDEyLCAxMiwgMTQsIDE0LCAxNV07XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgaWYgKGZsYWcgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+WFtSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfljZInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+eCric7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuICfpqawnO1xuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+i9pic7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfnm7gnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn6LGhJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfku5UnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5aOrJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgIGlmIChmbGFnID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfluIUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAn5bCGJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpc0Rlc3RvcnlmdW5jdGlvbjogZnVuY3Rpb24gKFgsIFkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0b3J5KSB7XG4gICAgICAgICAgICBjYy5sb2coJ+mUgOavgScpXG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IHRoaXMucHpDaGVzcy54O1xuICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSB0aGlzLnB6Q2hlc3MueTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmxhZ1t0aGlzLnRvdWNoQ2hlc3MudGFnXSA9PSAwICYmIHRoaXMuZmxhZ1t0aGlzLnB6Q2hlc3MudGFnXSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy/nuqLlkIPpu5FcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5SZWRfbmFtZXNbdGhpcy50b3VjaENoZXNzLnRhZ10gPiB0aGlzLkJsYWNrX25hbWVzW3RoaXMucHpDaGVzcy50YWddKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiDlsJ3or5Ug5pu/5o2iIHByZWZhYiDku6XnqbroioLngrnmnaXlgZpcbiAgICAgICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wekNoZXNzLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyAvLyB0aGlzLnB6Q2hlc3MuZGVzdHJveSgpOyAgIC8v5ZCD5a2QXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuQmxhY2tfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10gPSB0aGlzLnB6Q2hlc3MueCoxMDtcblxuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUmVkX25hbWVzW3RoaXMudG91Y2hDaGVzcy50YWddID09IHRoaXMuQmxhY2tfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10pIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCfkuI3lkIzoibLlkIzmoLfnmoTmo4vlrZAtLemUgOavgScpXG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB6Q2hlc3Mub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHpDaGVzcy5kZXN0cm95KCk7ICAgLy/lkIPlrZBcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CbGFja19uYW1lc1t0aGlzLnB6Q2hlc3MudGFnXSA9IHRoaXMucHpDaGVzcy54KjEwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn57qi5ZCD6buRLS3kuI3plIDmr4EnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmxhZ1t0aGlzLnRvdWNoQ2hlc3MudGFnXSA9PSAxICYmIHRoaXMuZmxhZ1t0aGlzLnB6Q2hlc3MudGFnXSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy/pu5HlkIPnuqJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5CbGFja19uYW1lc1t0aGlzLnRvdWNoQ2hlc3MudGFnXSA+IHRoaXMuUmVkX25hbWVzW3RoaXMucHpDaGVzcy50YWddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy5vcGFjaXR5ID0gMDtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucHpDaGVzcy5kZXN0cm95KCk7ICAgLy/lkIPlrZBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZWRfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10gPSB0aGlzLnB6Q2hlc3MueCoxMDtcblxuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQmxhY2tfbmFtZXNbdGhpcy50b3VjaENoZXNzLnRhZ10gPT0gdGhpcy5SZWRfbmFtZXNbdGhpcy5wekNoZXNzLnRhZ10pIHtcblxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+S4jeWQjOiJsuWQjOagt+eahOaji+WtkC0t6ZSA5q+BJylcblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHpDaGVzcy5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wekNoZXNzLmRlc3Ryb3koKTsgICAvL+WQg+WtkFxuXG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZF9uYW1lc1t0aGlzLnB6Q2hlc3MudGFnXSA9IHRoaXMucHpDaGVzcy54KjEwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygn6buR5ZCD57qiLS3kuI3plIDmr4EnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hDaGVzcy55ID0gWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5ZCM6Imy5LiN6ZSA5q+BJylcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaENoZXNzLnkgPSBZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5sb2coJ+S4jemUgOavgScpXG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueCA9IFg7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2hlc3MueSA9IFk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pOyIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgICBidG5fc3RhdHI6IGNjLkJ1dHRvbixcbiAgICAgICAgIGJ0bl9leGl0OiBjYy5CdXR0b24sXG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICdBUSc7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICB0aGlzLmJ0bl9zdGF0ci5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9zdGFydF9vbmNsaWNrLHRoaXMpXG4gICAgdGhpcy5idG5fZXhpdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9leGl0X29uQ2xpY2ssdGhpcylcbiBcblxuICAgIH0sXG4gICAgICAgYnRuX3N0YXJ0X29uY2xpY2sgOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9zdGF0cl9vbkNsaWNrXCIpXG4vLyAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2MubG9nKCdOZXh0IHNjZW5lIHByZWxvYWRlZCcpO1xuLy8gfSk7XG4gICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICB9LFxuICAgIGJ0bl9leGl0X29uQ2xpY2s6ZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX2V4aXRfb25DbGlja1wiKVxuICAgIH0sXG4gIFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBnYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICAgICAgICog56Kw5pKe55u45YWzXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAvL+iOt+WPlueisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgLy/lvIDlkK/norDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gLy9kZWJ1ZyDnu5jliLZcbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICAgICAgLy8gLy/nu5jliLbljIXlm7Tnm5JcbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcblxuICAgICAgICAvLyBQelRvdWNoQ2hlc3MgPSBnZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAqIOW9k+eisOaSnuS6p+eUn+eahOaXtuWAmeiwg+eUqFxuICAqIEBwYXJhbSAge0NvbGxpZGVyfSBvdGhlciDkuqfnlJ/norDmkp7nmoTlj6bkuIDkuKrnorDmkp7nu4Tku7ZcbiAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gc2VsZiAg5Lqn55Sf56Kw5pKe55qE6Ieq6Lqr55qE56Kw5pKe57uE5Lu2XG4gICovXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gZW50ZXInKTtcblxuICAgICAgICAvLyAvLyDnorDmkp7ns7vnu5/kvJrorqHnrpflh7rnorDmkp7nu4Tku7blnKjkuJbnlYzlnZDmoIfns7vkuIvnmoTnm7jlhbPnmoTlgLzvvIzlubbmlL7liLAgd29ybGQg6L+Z5Liq5bGe5oCn6YeM6Z2iXG4gICAgICAgIC8vIHZhciB3b3JsZCA9IHNlbGYud29ybGQ7XG5cbiAgICAgICAgLy8gLy8g56Kw5pKe57uE5Lu255qEIGFhYmIg56Kw5pKe5qGGXG4gICAgICAgIC8vIHZhciBhYWJiID0gd29ybGQuYWFiYjtcblxuICAgICAgICAvLyAvLyDkuIrkuIDmrKHorqHnrpfnmoTnorDmkp7nu4Tku7bnmoQgYWFiYiDnorDmkp7moYZcbiAgICAgICAgLy8gdmFyIHByZUFhYmIgPSB3b3JsZC5wcmVBYWJiO1xuXG4gICAgICAgIC8vIC8vIOeisOaSnuahhueahOS4lueVjOefqemYtVxuICAgICAgICAvLyB2YXIgdCA9IHdvcmxkLnRyYW5zZm9ybTtcblxuICAgICAgICAvLyAvLyDku6XkuIvlsZ7mgKfkuLrlnIblvaLnorDmkp7nu4Tku7bnibnmnInlsZ7mgKdcbiAgICAgICAgLy8gdmFyIHIgPSB3b3JsZC5yYWRpdXM7XG4gICAgICAgIC8vIHZhciBwID0gd29ybGQucG9zaXRpb247XG5cbiAgICAgICAgLy8gLy8g5Lul5LiL5bGe5oCn5Li6IOefqeW9oiDlkowg5aSa6L655b2iIOeisOaSnue7hOS7tueJueacieWxnuaAp1xuICAgICAgICAvLyB2YXIgcHMgPSB3b3JsZC5wb2ludHM7XG5cbiAgICAgICAgIHRoaXMuZ2FtZS5kZXN0b3J5Q2hlc3Mob3RoZXIsc2VsZik7XG4gICAgfSxcblxuXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7kuqfnlJ/lkI7vvIznorDmkp7nu5PmnZ/liY3nmoTmg4XlhrXkuIvvvIzmr4/mrKHorqHnrpfnorDmkp7nu5PmnpzlkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgICAgIFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7nu5PmnZ/lkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gKG90aGVyLHNlbGYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBleGl0Jyk7XG4gICAgICAgIHRoaXMuZ2FtZS5ub3RkZXN0b3J5Q2hlc3Mob3RoZXIsc2VsZik7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=