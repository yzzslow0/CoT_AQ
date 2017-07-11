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
            this.pzChess.destroy();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyIsImFzc2V0cy9TY3JpcHQvUFouanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlM7O0FBS2I7QUFDSTtBQUNBO0FBRk87O0FBS1g7OztBQUdJO0FBQ0E7QUFKYztBQU1sQjtBQUNJO0FBQ0E7QUFGYztBQUlsQjtBQUNJO0FBQ0E7QUFDQTtBQUhRO0FBS1o7QUFDSTtBQUNBO0FBQ0E7QUFIaUI7QUFLckI7QUFDQTs7QUFqQ1E7O0FBcUNaO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDs7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0Q7QUFDSDtBQUNEOztBQUVBO0FBQ0E7O0FBSUg7QUFDRDtBQUNBO0FBQ0k7QUFDSDs7QUFJRDtBQUNJO0FBQ0E7QUFDSDs7QUFLRDtBQUNJOztBQUlBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFFRDs7QUFHSDtBQUNEO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIOztBQUVEO0FBQ0k7QUFDSTtBQUNGO0FBQ0Q7QUFDRztBQUVIO0FBQ0o7QUFDRDtBQUNBOztBQUVBO0FBN01LOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZHO0FBSUw7QUFDRDs7QUFOTzs7QUFXWjtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFHQztBQUNFO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNIO0FBQ0E7QUFDRztBQUNGOztBQXBDSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUZFO0FBWEU7O0FBaUJaO0FBQ0E7QUFDSTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNIO0FBQ0Q7Ozs7O0FBS0E7QUFDSTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0g7O0FBSUQ7Ozs7O0FBS0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7Ozs7O0FBS0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQXpGSyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgY2hlc3NQcmVmYWI6IHsvL+aji+WtkOeahOmihOWItui1hOa6kFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZXNzTGlzdDogey8v5qOL5a2Q6IqC54K555qE6ZuG5ZCI77yM55So5LiA57u05pWw57uE6KGo56S65LqM57u05L2N572uXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5ub2RlXVxuICAgICAgICB9LFxuXG4gICAgICAgIHdoaXRlU3ByaXRlRnJhbWU6IHsvL+aji+eahOWbvueJh1xuXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICBibGFja1Nwcml0ZUZyYW1lOiB7Ly93deaji+eahOWbvueJh1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoQ2hlc3M6IHsvL+avj+S4gOWbnuWQiOeCueWHu+eahOaji+WtkFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZS8v5bGe5oCn56qX5Y+j5LiN5pi+56S6XG4gICAgICAgIH0sXG4gICAgICAgIHRoZV9sYXN0X3RvdWNoQ2hlc3M6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UvL+WxnuaAp+eql+WPo+S4jeaYvuekulxuICAgICAgICB9LFxuICAgICAgICBidG5fdGVzdDogY2MuQnV0dG9uLFxuICAgICAgICBpc0Rlc3Rvcnk6IGNjLkJvb2xlYW5cblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaXNEZXN0b3J5ID1mYWxzZTtcbiAgICAgICAgLy8gdmFyIGtleTEgPSAn5Yqo5oCBa2V5MSc7XG4gICAgICAgIC8vIHZhciBrZXkyID0gJ+WKqOaAgWtleTInO1xuICAgICAgICAvLyB2YXIgbWFwID0ge307XG4gICAgICAgIC8vIG1hcFtrZXkxXSA9IDE7XG4gICAgICAgIC8vIG1hcFtrZXkyXSA9IDI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWFwW2tleTFdKTsvL+e7k+aenOaYrzEuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hcFtrZXkyXSk7Ly/nu5PmnpzmmK8yLlxuXG4gICAgICAgIC8vIC8v5aaC5p6c6YGN5Y6GbWFwXG4gICAgICAgIC8vIGZvcih2YXIgcHJvcCBpbiBtYXApe1xuICAgICAgICAvLyAgICAgaWYobWFwLmhhc093blByb3BlcnR5KHByb3ApKXtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygna2V5IGlzICcgKyBwcm9wICsnIGFuZCB2YWx1ZSBpcycgKyBtYXBbcHJvcF0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWIm+W7uuaji+WtkFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgLy/liJ3lp4vljJbmo4vnm5jkuIoyMjXkuKrmo4vlrZDoioLngrnvvIzlubbkuLrmr4/kuKroioLngrnmt7vliqDkuovku7ZcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgODsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoZXNzUHJlZmFiKTsvL+WkjeWItkNoZXNz6aKE5Yi26LWE5rqQXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc2V0UG9zaXRpb24oY2MucCgoeCArIDUpICogMTA1IC0gODkwLCAoeSArIDIpICogMTEwIC0gMzcwKSk7Ly/moLnmja7mo4vnm5jlkozmo4vlrZDlpKflsI/orqHnrpfkvb/mr4/kuKrmo4vlrZDoioLngrnkvY3kuo7mjIflrprkvY3nva5cblxuICAgICAgICAgICAgICAgIG5ld05vZGUuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgIFxuICAgICAgICAgICAgICAgIC8vIG5ld05vZGUuZ3JvdXAgPSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgIG5ld05vZGUudGFnID0gaTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0LnB1c2gobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5nZXRDb21wb25lbnQoJ1BaJykuZ2FtZSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5uZXdOb2RlX29uQ2xpY2ssdGhpcylcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSAxMDA7Ly/lsYLnuqfnrqHnkIYgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0Rlc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVzcygpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lpoLmnpznrKzkuIDmrKHngrnlh7vkuI7mg7PopoHmi5bliqjnmoTmo4vlrZDkuLrlkIzkuIDkuKog5YiZ5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgIT0gbnVsbCAmJiBzZWxmLnRvdWNoQ2hlc3MudGFnID09IHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMubGFiZWwuc3RyaW5nID0gJzEyMzMyMSdcbiAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLmFkZENoaWxkKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNoZXNzTGlzdFtpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmxhY2tTcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCdUT1VDSF9TVEFSVDonICsgaXNNb3ZlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuekluZGV4ID0gMTsvL+Wxgue6p+euoeeQhiAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnID0gc2VsZi50b3VjaENoZXNzLnRhZzsvLyDotYvlgLx0YWdcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0Rlc3RvcnlmdW5jdGlvbigpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5pc0Rlc3Rvcnkpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9nKCfplIDmr4EnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCdUT1VDSF9FTkQ6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiTm9kZSB6SW5kZXg6IFwiICsgdGhpcy56SW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5uZXdOb2RlX29uQ2xpY2ssdGhpcylcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ1RPVUNIX01PVkU6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbHRheDonK2RlbHRhLngrJy0tLS0nKydkZWx0YXk6JytkZWx0YS55KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMueDonK3RoaXMueCsnLS0tLScrJyB0aGlzLnk6Jyt0aGlzLnkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsdGF4OicgKyBkZWx0YS54ICsgJy0tLS0nICsgJ2RlbHRheTonICsgZGVsdGEueSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aGl0ZVNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2codGhpcy5jaGVzc0xpc3Quc2l6ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgICAgICAvLyAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9JzEyMydcbiAgICAgICAgLy8gfSk7XG5cblxuXG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuYnRuX3Rlc3RfZnVuYywgdGhpcylcbiAgICB9LFxuXG5cblxuICAgIG5ld05vZGVfb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdOb2RlLnRhZylcbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuICAgIH0sXG5cblxuXG5cbiAgICBzZXRDaGVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvdWNoQ2hlc3MudGFnKVxuXG5cblxuICAgICAgICB2YXIgdGVzdF9sYWJlbCA9IHRoaXMudG91Y2hDaGVzcy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKTtcbiAgICAgICAgaWYgKHRlc3RfbGFiZWwuc3RyaW5nID09ICflo6snKSB7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLnN0cmluZyA9ICfljZInXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXN0X2xhYmVsLnN0cmluZyA9ICflo6snXG4gICAgICAgIH1cblxuICAgICAgICAvLyAgdGhpcy5jaGVzc0xpc3RbdGhpcy50b3VjaENoZXNzLnRhZ10uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG5cblxuICAgIH0sXG4gICAgYnRuX3Rlc3RfZnVuYzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnMTIzJ1xuICAgIH0sXG5cbiAgICBkZXN0b3J5Q2hlc3M6IGZ1bmN0aW9uIChvdGhlcixzZWxmKSB7XG4gICAgICAgIHRoaXMuaXNEZXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgaWYodGhpcy50b3VjaENoZXNzLnRhZyA9PSBvdGhlci5ub2RlLnRhZyl7XG4gICAgICAgICAgICB0aGlzLnB6Q2hlc3MgPSBzZWxmLm5vZGU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wekNoZXNzID0gb3RoZXIubm9kZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnB6Q2hlc3MgPSBvdGhlcjtcbiAgICB9LFxuXG4gICAgbm90ZGVzdG9yeUNoZXNzOiBmdW5jdGlvbiAob3RoZXIsc2VsZikge1xuICAgICAgICB0aGlzLmlzRGVzdG9yeSA9IGZhbHNlO1xuICAgIH0sXG4gICAgXG4gICAgaXNEZXN0b3J5ZnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXN0b3J5KSB7XG4gICAgICAgICAgICBjYy5sb2coJ+mUgOavgScpXG4gICAgICAgICAgdGhpcy5wekNoZXNzLmRlc3Ryb3koKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZygn5LiN6ZSA5q+BJylcbiAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgICBidG5fc3RhdHI6IGNjLkJ1dHRvbixcbiAgICAgICAgIGJ0bl9leGl0OiBjYy5CdXR0b24sXG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICdBUSc7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICB0aGlzLmJ0bl9zdGF0ci5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9zdGFydF9vbmNsaWNrLHRoaXMpXG4gICAgdGhpcy5idG5fZXhpdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9leGl0X29uQ2xpY2ssdGhpcylcbiBcblxuICAgIH0sXG4gICAgICAgYnRuX3N0YXJ0X29uY2xpY2sgOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9zdGF0cl9vbkNsaWNrXCIpXG4vLyAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2MubG9nKCdOZXh0IHNjZW5lIHByZWxvYWRlZCcpO1xuLy8gfSk7XG4gICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICB9LFxuICAgIGJ0bl9leGl0X29uQ2xpY2s6ZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX2V4aXRfb25DbGlja1wiKVxuICAgIH0sXG4gIFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBnYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICAgICAgICog56Kw5pKe55u45YWzXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAvL+iOt+WPlueisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICB2YXIgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgLy/lvIDlkK/norDmkp7mo4DmtYvns7vnu59cbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy9kZWJ1ZyDnu5jliLZcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICAgICAgLy/nu5jliLbljIXlm7Tnm5JcbiAgICAgICAgbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcblxuICAgICAgICAvLyBQelRvdWNoQ2hlc3MgPSBnZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAqIOW9k+eisOaSnuS6p+eUn+eahOaXtuWAmeiwg+eUqFxuICAqIEBwYXJhbSAge0NvbGxpZGVyfSBvdGhlciDkuqfnlJ/norDmkp7nmoTlj6bkuIDkuKrnorDmkp7nu4Tku7ZcbiAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gc2VsZiAg5Lqn55Sf56Kw5pKe55qE6Ieq6Lqr55qE56Kw5pKe57uE5Lu2XG4gICovXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gZW50ZXInKTtcblxuICAgICAgICAvLyDnorDmkp7ns7vnu5/kvJrorqHnrpflh7rnorDmkp7nu4Tku7blnKjkuJbnlYzlnZDmoIfns7vkuIvnmoTnm7jlhbPnmoTlgLzvvIzlubbmlL7liLAgd29ybGQg6L+Z5Liq5bGe5oCn6YeM6Z2iXG4gICAgICAgIHZhciB3b3JsZCA9IHNlbGYud29ybGQ7XG5cbiAgICAgICAgLy8g56Kw5pKe57uE5Lu255qEIGFhYmIg56Kw5pKe5qGGXG4gICAgICAgIHZhciBhYWJiID0gd29ybGQuYWFiYjtcblxuICAgICAgICAvLyDkuIrkuIDmrKHorqHnrpfnmoTnorDmkp7nu4Tku7bnmoQgYWFiYiDnorDmkp7moYZcbiAgICAgICAgdmFyIHByZUFhYmIgPSB3b3JsZC5wcmVBYWJiO1xuXG4gICAgICAgIC8vIOeisOaSnuahhueahOS4lueVjOefqemYtVxuICAgICAgICB2YXIgdCA9IHdvcmxkLnRyYW5zZm9ybTtcblxuICAgICAgICAvLyDku6XkuIvlsZ7mgKfkuLrlnIblvaLnorDmkp7nu4Tku7bnibnmnInlsZ7mgKdcbiAgICAgICAgdmFyIHIgPSB3b3JsZC5yYWRpdXM7XG4gICAgICAgIHZhciBwID0gd29ybGQucG9zaXRpb247XG5cbiAgICAgICAgLy8g5Lul5LiL5bGe5oCn5Li6IOefqeW9oiDlkowg5aSa6L655b2iIOeisOaSnue7hOS7tueJueacieWxnuaAp1xuICAgICAgICB2YXIgcHMgPSB3b3JsZC5wb2ludHM7XG4gICAgfSxcblxuXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7kuqfnlJ/lkI7vvIznorDmkp7nu5PmnZ/liY3nmoTmg4XlhrXkuIvvvIzmr4/mrKHorqHnrpfnorDmkp7nu5PmnpzlkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uU3RheTogZnVuY3Rpb24gKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICAgICAgICB0aGlzLmdhbWUuZGVzdG9yeUNoZXNzKG90aGVyLHNlbGYpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlvZPnorDmkp7nu5PmnZ/lkI7osIPnlKhcbiAgICAgKiBAcGFyYW0gIHtDb2xsaWRlcn0gb3RoZXIg5Lqn55Sf56Kw5pKe55qE5Y+m5LiA5Liq56Kw5pKe57uE5Lu2XG4gICAgICogQHBhcmFtICB7Q29sbGlkZXJ9IHNlbGYgIOS6p+eUn+eisOaSnueahOiHqui6q+eahOeisOaSnue7hOS7tlxuICAgICAqL1xuICAgIG9uQ29sbGlzaW9uRXhpdDogZnVuY3Rpb24gKG90aGVyLHNlbGYpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uIGNvbGxpc2lvbiBleGl0Jyk7XG4gICAgICAgIHRoaXMuZ2FtZS5ub3RkZXN0b3J5Q2hlc3Mob3RoZXIsc2VsZik7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==