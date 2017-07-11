require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Game":[function(require,module,exports){
"use strict";
cc._RF.push(module, '10e84zfT9VGU6q5BtbS6H0f', 'Game');
// Script/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

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
        isDestory: cc.Boolean

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
        // console.log(map[key2]);//结果是2.

        // //如果遍历map
        // for(var prop in map){
        //     if(map.hasOwnProperty(prop)){
        //         console.log('key is ' + prop +' and value is' + map[prop]);
        //     }
        // }


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
                newNode.setPosition(cc.p((x + 5) * 105 - 890, (y + 2) * 110 - 370)); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置

                newNode.zIndex = 1; //层级管理   
                // newNode.group = "default"
                newNode.tag = i;

                this.chessList.push(newNode);
                newNode.getComponent('PZ').game = this;
                //   newNode.on(cc.Node.EventType.TOUCH_END, this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    this.zIndex = 100; //层级管理   
                    self.touchChess = this;
                    self.isDestory = false;
                    self.setChess();

                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                    // cc.log('TOUCH_START:' + isMove)
                });

                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {

                    this.zIndex = 1; //层级管理       

                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag; // 赋值tag
                    isMove = false;

                    self.isDestoryfunction();

                    // if(this.isDestory){
                    //     cc.log('销毁');
                    // }


                    // cc.log('TOUCH_END:' + isMove)
                    // cc.log("Node zIndex: " + this.zIndex);
                });

                // newNode.on(cc.Node.EventType.TOUCH_END,this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    // cc.log('TOUCH_MOVE:' + isMove)
                    if (isMove) {
                        var delta = event.touch.getDelta();
                        this.x += delta.x;
                        this.y += delta.y;
                    }
                    // console.log('deltax:'+delta.x+'----'+'deltay:'+delta.y);
                    // console.log('this.x:'+this.x+'----'+' this.y:'+this.y);
                    // console.log('deltax:' + delta.x + '----' + 'deltay:' + delta.y)
                });
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
    update: function update(dt) {
        this.btn_test.node.on(cc.Node.EventType.TOUCH_START, this.btn_test_func, this);
    },

    newNode_onClick: function newNode_onClick() {
        console.log(newNode.tag);
        //  this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
    },

    setChess: function setChess() {
        console.log(this.touchChess.tag);

        var test_label = this.touchChess.getComponentInChildren(cc.Label);
        if (test_label.string == '士') {
            test_label.string = '卒';
        } else {
            test_label.string = '士';
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

    isDestoryfunction: function isDestoryfunction() {
        if (this.isDestory) {
            cc.log('销毁');
            this.pzChess.destroy(); //吃子
        } else {
            cc.log('不销毁');
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

        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 上一次计算的碰撞组件的 aabb 碰撞框
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function onCollisionStay(other, self) {
        // console.log('on collision stay');
        this.game.destoryChess(other, self);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyIsImFzc2V0cy9TY3JpcHQvUFouanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlM7O0FBS2I7QUFDSTtBQUNBO0FBRk87O0FBS1g7OztBQUdJO0FBQ0E7QUFKYztBQU1sQjtBQUNJO0FBQ0E7QUFGYztBQUlsQjtBQUNJO0FBQ0E7QUFDQTtBQUhRO0FBS1o7QUFDSTtBQUNBO0FBQ0E7QUFIaUI7QUFLckI7QUFDQTs7QUFqQ1E7O0FBcUNaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDs7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0Q7QUFDSDtBQUNEOztBQUVBO0FBQ0E7O0FBSUg7QUFDRDtBQUNBO0FBQ0k7QUFDSDs7QUFJRDtBQUNJO0FBQ0E7QUFDSDs7QUFLRDtBQUNJOztBQUlBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFFRDs7QUFHSDtBQUNEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFBMkM7QUFDdkM7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0k7QUFDRjtBQUNEO0FBQ0c7QUFFSDtBQUNKO0FBQ0Q7QUFDQTs7QUFFQTtBQTdNSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGRztBQUlMO0FBQ0Q7O0FBTk87O0FBV1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBR0M7QUFDRTtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDSDtBQUNBO0FBQ0c7QUFDRjs7QUFwQ0k7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGRTtBQVhFOztBQWlCWjtBQUNBO0FBQ0k7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSDtBQUNEOzs7OztBQUtBO0FBQ0k7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNIOztBQUlEOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNIOztBQUVEOzs7OztBQUtBO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUF6RksiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIGNoZXNzUHJlZmFiOiB7Ly/mo4vlrZDnmoTpooTliLbotYTmupBcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVzc0xpc3Q6IHsvL+aji+WtkOiKgueCueeahOmbhuWQiO+8jOeUqOS4gOe7tOaVsOe7hOihqOekuuS6jOe7tOS9jee9rlxuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2Mubm9kZV1cbiAgICAgICAgfSxcblxuICAgICAgICB3aGl0ZVNwcml0ZUZyYW1lOiB7Ly/mo4vnmoTlm77niYdcblxuXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgYmxhY2tTcHJpdGVGcmFtZTogey8vd3Xmo4vnmoTlm77niYdcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICB0b3VjaENoZXNzOiB7Ly/mr4/kuIDlm57lkIjngrnlh7vnmoTmo4vlrZBcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UvL+WxnuaAp+eql+WPo+S4jeaYvuekulxuICAgICAgICB9LFxuICAgICAgICB0aGVfbGFzdF90b3VjaENoZXNzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcbiAgICAgICAgYnRuX3Rlc3Q6IGNjLkJ1dHRvbixcbiAgICAgICAgaXNEZXN0b3J5OiBjYy5Cb29sZWFuXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGlzRGVzdG9yeSA9ZmFsc2U7XG4gICAgICAgIC8vIHZhciBrZXkxID0gJ+WKqOaAgWtleTEnO1xuICAgICAgICAvLyB2YXIga2V5MiA9ICfliqjmgIFrZXkyJztcbiAgICAgICAgLy8gdmFyIG1hcCA9IHt9O1xuICAgICAgICAvLyBtYXBba2V5MV0gPSAxO1xuICAgICAgICAvLyBtYXBba2V5Ml0gPSAyO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hcFtrZXkxXSk7Ly/nu5PmnpzmmK8xLlxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXBba2V5Ml0pOy8v57uT5p6c5pivMi5cblxuICAgICAgICAvLyAvL+WmguaenOmBjeWOhm1hcFxuICAgICAgICAvLyBmb3IodmFyIHByb3AgaW4gbWFwKXtcbiAgICAgICAgLy8gICAgIGlmKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2tleSBpcyAnICsgcHJvcCArJyBhbmQgdmFsdWUgaXMnICsgbWFwW3Byb3BdKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliJvlu7rmo4vlrZBcbiAgICAgICAgICovXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgIC8v5Yid5aeL5YyW5qOL55uY5LiKMjI15Liq5qOL5a2Q6IqC54K577yM5bm25Li65q+P5Liq6IqC54K55re75Yqg5LqL5Lu2XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGVzc1ByZWZhYik7Ly/lpI3liLZDaGVzc+mihOWItui1hOa6kFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnNldFBvc2l0aW9uKGNjLnAoKHggKyA1KSAqIDEwNSAtIDg5MCwgKHkgKyAyKSAqIDExMCAtIDM3MCkpOy8v5qC55o2u5qOL55uY5ZKM5qOL5a2Q5aSn5bCP6K6h566X5L2/5q+P5Liq5qOL5a2Q6IqC54K55L2N5LqO5oyH5a6a5L2N572uXG5cbiAgICAgICAgICAgICAgICBuZXdOb2RlLnpJbmRleCA9IDE7Ly/lsYLnuqfnrqHnkIYgICBcbiAgICAgICAgICAgICAgICAvLyBuZXdOb2RlLmdyb3VwID0gXCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnRhZyA9IGk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdC5wdXNoKG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuZ2V0Q29tcG9uZW50KCdQWicpLmdhbWUgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMubmV3Tm9kZV9vbkNsaWNrLHRoaXMpXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gMTAwOy8v5bGC57qn566h55CGICAgXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG91Y2hDaGVzcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNEZXN0b3J5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2hlc3MoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5aaC5p6c56ys5LiA5qyh54K55Ye75LiO5oOz6KaB5ouW5Yqo55qE5qOL5a2Q5Li65ZCM5LiA5LiqIOWImeWFgeiuuOaLluWKqFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50aGVfbGFzdF90b3VjaENoZXNzICE9IG51bGwgJiYgc2VsZi50b3VjaENoZXNzLnRhZyA9PSBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmxhYmVsLnN0cmluZyA9ICcxMjMzMjEnXG4gICAgICAgICAgICAgICAgICAgIC8vICAgbmV3Tm9kZS5hZGRDaGlsZChsYWJlbClcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jaGVzc0xpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnVE9VQ0hfU1RBUlQ6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpJbmRleCA9IDE7Ly/lsYLnuqfnrqHnkIYgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aGVfbGFzdF90b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aGVfbGFzdF90b3VjaENoZXNzLnRhZyA9IHNlbGYudG91Y2hDaGVzcy50YWc7Ly8g6LWL5YC8dGFnXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaXNEZXN0b3J5ZnVuY3Rpb24oKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNEZXN0b3J5KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNjLmxvZygn6ZSA5q+BJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnVE9VQ0hfRU5EOicgKyBpc01vdmUpXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIk5vZGUgekluZGV4OiBcIiArIHRoaXMuekluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMubmV3Tm9kZV9vbkNsaWNrLHRoaXMpXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCdUT1VDSF9NT1ZFOicgKyBpc01vdmUpXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IGV2ZW50LnRvdWNoLmdldERlbHRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gZGVsdGEueDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSBkZWx0YS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWx0YXg6JytkZWx0YS54KyctLS0tJysnZGVsdGF5OicrZGVsdGEueSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLng6Jyt0aGlzLngrJy0tLS0nKycgdGhpcy55OicrdGhpcy55KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbHRheDonICsgZGVsdGEueCArICctLS0tJyArICdkZWx0YXk6JyArIGRlbHRhLnkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdFtpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2hpdGVTcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMuY2hlc3NMaXN0LnNpemUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5idG5fdGVzdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihldmVudCl7XG5cbiAgICAgICAgLy8gICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPScxMjMnXG4gICAgICAgIC8vIH0pO1xuXG5cblxuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdGhpcy5idG5fdGVzdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl90ZXN0X2Z1bmMsIHRoaXMpXG4gICAgfSxcblxuXG5cbiAgICBuZXdOb2RlX29uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3Tm9kZS50YWcpXG4gICAgICAgIC8vICB0aGlzLmNoZXNzTGlzdFtpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmxhY2tTcHJpdGVGcmFtZTtcbiAgICB9LFxuXG5cblxuXG4gICAgc2V0Q2hlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b3VjaENoZXNzLnRhZylcblxuXG5cbiAgICAgICAgdmFyIHRlc3RfbGFiZWwgPSB0aGlzLnRvdWNoQ2hlc3MuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIGlmICh0ZXN0X2xhYmVsLnN0cmluZyA9PSAn5aOrJykge1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5zdHJpbmcgPSAn5Y2SJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5zdHJpbmcgPSAn5aOrJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W3RoaXMudG91Y2hDaGVzcy50YWddLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuXG5cbiAgICB9LFxuICAgIGJ0bl90ZXN0X2Z1bmM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJzEyMydcbiAgICB9LFxuXG4gICAgZGVzdG9yeUNoZXNzOiBmdW5jdGlvbiAob3RoZXIsc2VsZikge1xuICAgICAgICB0aGlzLmlzRGVzdG9yeSA9IHRydWU7XG4gICAgICAgIGlmKHRoaXMudG91Y2hDaGVzcy50YWcgPT0gb3RoZXIubm9kZS50YWcpeyAvL+acieaXtuWAmSDkuI3og73liIbovqgg5piv5ZCm5piv54K55Lit55qE5qOL5a2QIOWIpOaWreaji+WtkFxuICAgICAgICAgICAgdGhpcy5wekNoZXNzID0gc2VsZi5ub2RlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucHpDaGVzcyA9IG90aGVyLm5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5wekNoZXNzID0gb3RoZXI7XG4gICAgfSxcblxuICAgIG5vdGRlc3RvcnlDaGVzczogZnVuY3Rpb24gKG90aGVyLHNlbGYpIHtcbiAgICAgICAgdGhpcy5pc0Rlc3RvcnkgPSBmYWxzZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRGVzdG9yeWZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGVzdG9yeSkge1xuICAgICAgICAgICAgY2MubG9nKCfplIDmr4EnKVxuICAgICAgICAgIHRoaXMucHpDaGVzcy5kZXN0cm95KCk7ICAgLy/lkIPlrZBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZygn5LiN6ZSA5q+BJylcbiAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgICBidG5fc3RhdHI6IGNjLkJ1dHRvbixcbiAgICAgICAgIGJ0bl9leGl0OiBjYy5CdXR0b24sXG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICdBUSc7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICB0aGlzLmJ0bl9zdGF0ci5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9zdGFydF9vbmNsaWNrLHRoaXMpXG4gICAgdGhpcy5idG5fZXhpdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9leGl0X29uQ2xpY2ssdGhpcylcbiBcblxuICAgIH0sXG4gICAgICAgYnRuX3N0YXJ0X29uY2xpY2sgOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9zdGF0cl9vbkNsaWNrXCIpXG4vLyAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2MubG9nKCdOZXh0IHNjZW5lIHByZWxvYWRlZCcpO1xuLy8gfSk7XG4gICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICB9LFxuICAgIGJ0bl9leGl0X29uQ2xpY2s6ZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX2V4aXRfb25DbGlja1wiKVxuICAgIH0sXG4gIFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBnYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICAgICAgICog56Kw5pKe55u45YWzXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAvL+iOt+WPlueisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgLy/lvIDlkK/norDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy9kZWJ1ZyDnu5jliLZcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICAgICAgLy/nu5jliLbljIXlm7Tnm5JcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcblxuICAgICAgICAvLyBQelRvdWNoQ2hlc3MgPSBnZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAqIOW9k+eisOaSnuS6p+eUn+eahOaXtuWAmeiwg+eUqFxuICAqIEBwYXJhbSAge0NvbGxpZGVyfSBvdGhlciDkuqfnlJ/norDmkp7nmoTlj6bkuIDkuKrnorDmkp7nu4Tku7ZcbiAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gc2VsZiAg5Lqn55Sf56Kw5pKe55qE6Ieq6Lqr55qE56Kw5pKe57uE5Lu2XG4gICovXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gZW50ZXInKTtcblxuICAgICAgICAvLyDnorDmkp7ns7vnu5/kvJrorqHnrpflh7rnorDmkp7nu4Tku7blnKjkuJbnlYzlnZDmoIfns7vkuIvnmoTnm7jlhbPnmoTlgLzvvIzlubbmlL7liLAgd29ybGQg6L+Z5Liq5bGe5oCn6YeM6Z2iXG4gICAgICAgIHZhciB3b3JsZCA9IHNlbGYud29ybGQ7XG5cbiAgICAgICAgLy8g56Kw5pKe57uE5Lu255qEIGFhYmIg56Kw5pKe5qGGXG4gICAgICAgIHZhciBhYWJiID0gd29ybGQuYWFiYjtcblxuICAgICAgICAvLyDkuIrkuIDmrKHorqHnrpfnmoTnorDmkp7nu4Tku7bnmoQgYWFiYiDnorDmkp7moYZcbiAgICAgICAgdmFyIHByZUFhYmIgPSB3b3JsZC5wcmVBYWJiO1xuXG4gICAgICAgIC8vIOeisOaSnuahhueahOS4lueVjOefqemYtVxuICAgICAgICB2YXIgdCA9IHdvcmxkLnRyYW5zZm9ybTtcblxuICAgICAgICAvLyDku6XkuIvlsZ7mgKfkuLrlnIblvaLnorDmkp7nu4Tku7bnibnmnInlsZ7mgKdcbiAgICAgICAgdmFyIHIgPSB3b3JsZC5yYWRpdXM7XG4gICAgICAgIHZhciBwID0gd29ybGQucG9zaXRpb247XG5cbiAgICAgICAgLy8g5Lul5LiL5bGe5oCn5Li6IOefqeW9oiDlkowg5aSa6L655b2iIOeisOaSnue7hOS7tueJueacieWxnuaAp1xuICAgICAgICB2YXIgcHMgPSB3b3JsZC5wb2ludHM7XG4gICAgfSxcblxuXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7kuqfnlJ/lkI7vvIznorDmkp7nu5PmnZ/liY3nmoTmg4XlhrXkuIvvvIzmr4/mrKHorqHnrpfnorDmkp7nu5PmnpzlkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgICAgICB0aGlzLmdhbWUuZGVzdG9yeUNoZXNzKG90aGVyLHNlbGYpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7nu5PmnZ/lkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gKG90aGVyLHNlbGYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBleGl0Jyk7XG4gICAgICAgIHRoaXMuZ2FtZS5ub3RkZXN0b3J5Q2hlc3Mob3RoZXIsc2VsZik7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==