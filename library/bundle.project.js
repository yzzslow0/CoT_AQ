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
        btn_test: cc.Button

    },

    // use this for initialization
    onLoad: function onLoad() {

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
                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p((x + 5) * 105 - 890, (y + 2) * 110 - 370)); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置

                newNode.zIndex = 1; //层级管理   

                newNode.tag = i;

                this.chessList.push(newNode);

                //   newNode.on(cc.Node.EventType.TOUCH_END, this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {
                    this.zIndex = 100; //层级管理   
                    self.touchChess = this;
                    self.setChess();

                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                    cc.log('TOUCH_START:' + isMove);
                });

                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {

                    this.zIndex = 1; //层级管理       

                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag; // 赋值tag
                    isMove = false;
                    cc.log('TOUCH_END:' + isMove);
                    cc.log("Node zIndex: " + this.zIndex);
                });
                // newNode.on(cc.Node.EventType.TOUCH_END,this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    cc.log('TOUCH_MOVE:' + isMove);
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
    getName: function getName() {
        return 'test';
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
},{}]},{},["Game","Menu"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDSTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFGUzs7QUFLYjtBQUNJO0FBQ0E7QUFGTzs7QUFLWDs7O0FBR0k7QUFDQTtBQUpjO0FBTWxCO0FBQ0k7QUFDQTtBQUZjO0FBSWxCO0FBQ0k7QUFDQTtBQUNBO0FBSFE7QUFLWjtBQUNJO0FBQ0E7QUFDQTtBQUhpQjtBQUtyQjs7QUFoQ1E7O0FBb0NaO0FBQ0E7O0FBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDs7QUFFSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7O0FBRUE7QUFDQTs7QUFJSDtBQUNEO0FBQ0E7QUFDSTtBQUNIOztBQUlEO0FBQ0k7QUFDQTtBQUNIOztBQUtEO0FBQ0k7O0FBR0E7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIOztBQUVEOztBQU1IO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUExS0s7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRkc7QUFJTDtBQUNEOztBQU5POztBQVdaO0FBQ0E7QUFDSTtBQUNIOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUdDO0FBQ0U7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ0g7QUFDQTtBQUNHO0FBQ0Y7O0FBcENJIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBjaGVzc1ByZWZhYjogey8v5qOL5a2Q55qE6aKE5Yi26LWE5rqQXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlc3NMaXN0OiB7Ly/mo4vlrZDoioLngrnnmoTpm4blkIjvvIznlKjkuIDnu7TmlbDnu4TooajnpLrkuoznu7TkvY3nva5cbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLm5vZGVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgd2hpdGVTcHJpdGVGcmFtZTogey8v5qOL55qE5Zu+54mHXG5cblxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIGJsYWNrU3ByaXRlRnJhbWU6IHsvL3d15qOL55qE5Zu+54mHXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgdG91Y2hDaGVzczogey8v5q+P5LiA5Zue5ZCI54K55Ye755qE5qOL5a2QXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcbiAgICAgICAgdGhlX2xhc3RfdG91Y2hDaGVzczoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZS8v5bGe5oCn56qX5Y+j5LiN5pi+56S6XG4gICAgICAgIH0sXG4gICAgICAgIGJ0bl90ZXN0OiBjYy5CdXR0b24sXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gdmFyIGtleTEgPSAn5Yqo5oCBa2V5MSc7XG4gICAgICAgIC8vIHZhciBrZXkyID0gJ+WKqOaAgWtleTInO1xuICAgICAgICAvLyB2YXIgbWFwID0ge307XG4gICAgICAgIC8vIG1hcFtrZXkxXSA9IDE7XG4gICAgICAgIC8vIG1hcFtrZXkyXSA9IDI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWFwW2tleTFdKTsvL+e7k+aenOaYrzEuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hcFtrZXkyXSk7Ly/nu5PmnpzmmK8yLlxuXG4gICAgICAgIC8vIC8v5aaC5p6c6YGN5Y6GbWFwXG4gICAgICAgIC8vIGZvcih2YXIgcHJvcCBpbiBtYXApe1xuICAgICAgICAvLyAgICAgaWYobWFwLmhhc093blByb3BlcnR5KHByb3ApKXtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygna2V5IGlzICcgKyBwcm9wICsnIGFuZCB2YWx1ZSBpcycgKyBtYXBbcHJvcF0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAvL+WIneWni+WMluaji+ebmOS4ijIyNeS4quaji+WtkOiKgueCue+8jOW5tuS4uuavj+S4quiKgueCuea3u+WKoOS6i+S7tlxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCA4OyB4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hlc3NQcmVmYWIpOy8v5aSN5Yi2Q2hlc3PpooTliLbotYTmupBcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3Tm9kZSk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihjYy5wKCh4ICsgNSkgKiAxMDUgLSA4OTAsICh5ICsgMikgKiAxMTAgLSAzNzApKTsvL+agueaNruaji+ebmOWSjOaji+WtkOWkp+Wwj+iuoeeul+S9v+avj+S4quaji+WtkOiKgueCueS9jeS6juaMh+WumuS9jee9rlxuXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS56SW5kZXggPSAxOy8v5bGC57qn566h55CGICAgXG5cbiAgICAgICAgICAgICAgICBuZXdOb2RlLnRhZyA9IGk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdC5wdXNoKG5ld05vZGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5uZXdOb2RlX29uQ2xpY2ssdGhpcylcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSAxMDA7Ly/lsYLnuqfnrqHnkIYgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVzcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5aaC5p6c56ys5LiA5qyh54K55Ye75LiO5oOz6KaB5ouW5Yqo55qE5qOL5a2Q5Li65ZCM5LiA5LiqIOWImeWFgeiuuOaLluWKqFxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50aGVfbGFzdF90b3VjaENoZXNzICE9IG51bGwgJiYgc2VsZi50b3VjaENoZXNzLnRhZyA9PSBzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MudGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmxhYmVsLnN0cmluZyA9ICcxMjMzMjEnXG4gICAgICAgICAgICAgICAgICAgIC8vICAgbmV3Tm9kZS5hZGRDaGlsZChsYWJlbClcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jaGVzc0xpc3RbaV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJsYWNrU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnVE9VQ0hfU1RBUlQ6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpJbmRleCA9IDE7Ly/lsYLnuqfnrqHnkIYgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aGVfbGFzdF90b3VjaENoZXNzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aGVfbGFzdF90b3VjaENoZXNzLnRhZyA9IHNlbGYudG91Y2hDaGVzcy50YWc7Ly8g6LWL5YC8dGFnXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1RPVUNIX0VORDonICsgaXNNb3ZlKVxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJOb2RlIHpJbmRleDogXCIgKyB0aGlzLnpJbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5uZXdOb2RlX29uQ2xpY2ssdGhpcylcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1RPVUNIX01PVkU6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbHRheDonK2RlbHRhLngrJy0tLS0nKydkZWx0YXk6JytkZWx0YS55KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMueDonK3RoaXMueCsnLS0tLScrJyB0aGlzLnk6Jyt0aGlzLnkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsdGF4OicgKyBkZWx0YS54ICsgJy0tLS0nICsgJ2RlbHRheTonICsgZGVsdGEueSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aGl0ZVNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2codGhpcy5jaGVzc0xpc3Quc2l6ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgICAgICAvLyAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9JzEyMydcbiAgICAgICAgLy8gfSk7XG5cblxuXG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuYnRuX3Rlc3RfZnVuYywgdGhpcylcbiAgICB9LFxuXG5cblxuICAgIG5ld05vZGVfb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdOb2RlLnRhZylcbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuICAgIH0sXG5cblxuXG5cbiAgICBzZXRDaGVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvdWNoQ2hlc3MudGFnKVxuXG5cbiAgICAgICAgdmFyIHRlc3RfbGFiZWwgPSB0aGlzLnRvdWNoQ2hlc3MuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIGlmICh0ZXN0X2xhYmVsLnN0cmluZyA9PSAn5aOrJykge1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5zdHJpbmcgPSAn5Y2SJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVzdF9sYWJlbC5zdHJpbmcgPSAn5aOrJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W3RoaXMudG91Y2hDaGVzcy50YWddLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuXG5cblxuXG5cbiAgICB9LFxuICAgIGJ0bl90ZXN0X2Z1bmM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJzEyMydcbiAgICB9LFxuICAgIGdldE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICd0ZXN0J1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgICBidG5fc3RhdHI6IGNjLkJ1dHRvbixcbiAgICAgICAgIGJ0bl9leGl0OiBjYy5CdXR0b24sXG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICdBUSc7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICB0aGlzLmJ0bl9zdGF0ci5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9zdGFydF9vbmNsaWNrLHRoaXMpXG4gICAgdGhpcy5idG5fZXhpdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLmJ0bl9leGl0X29uQ2xpY2ssdGhpcylcbiBcblxuICAgIH0sXG4gICAgICAgYnRuX3N0YXJ0X29uY2xpY2sgOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9zdGF0cl9vbkNsaWNrXCIpXG4vLyAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ2dhbWUnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2MubG9nKCdOZXh0IHNjZW5lIHByZWxvYWRlZCcpO1xuLy8gfSk7XG4gICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICB9LFxuICAgIGJ0bl9leGl0X29uQ2xpY2s6ZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX2V4aXRfb25DbGlja1wiKVxuICAgIH0sXG4gIFxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9