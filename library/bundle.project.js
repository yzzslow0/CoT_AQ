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

                newNode.tag = i;

                this.chessList.push(newNode);

                //   newNode.on(cc.Node.EventType.TOUCH_END, this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_START, function (event) {

                    self.touchChess = this;
                    self.setChess();

                    //判断如果第一次点击与想要拖动的棋子为同一个 则允许拖动
                    if (self.the_last_touchChess != null && self.touchChess.tag == self.the_last_touchChess.tag) {
                        isMove = true;
                    }

                    //   this.label.string = '123321'
                    //   newNode.addChild(label)
                    // this.chessList[i].getComponent(cc.Sprite).spriteFrame = this.blackSpriteFrame;
                    console.log('TOUCH_START:' + isMove);
                });

                newNode.on(cc.Node.EventType.TOUCH_END, function (event) {
                    self.the_last_touchChess = this;
                    self.the_last_touchChess.tag = self.touchChess.tag; // 赋值tag
                    isMove = false;
                    console.log('TOUCH_END:' + isMove);
                });
                // newNode.on(cc.Node.EventType.TOUCH_END,this.newNode_onClick,this)
                newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    console.log('TOUCH_MOVE:' + isMove);
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
        test_label.string = '士';
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
        this.label.string = '123321';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvTWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDSTs7QUFFQTs7QUFFSTtBQUNJO0FBQ0E7QUFGUzs7QUFLYjtBQUNJO0FBQ0E7QUFGTzs7QUFLWDs7O0FBR0k7QUFDQTtBQUpjO0FBTWxCO0FBQ0k7QUFDQTtBQUZjO0FBSWxCO0FBQ0k7QUFDQTtBQUNBO0FBSFE7QUFLWjtBQUNJO0FBQ0E7QUFDQTtBQUhpQjtBQUtyQjs7QUFoQ1E7O0FBb0NaO0FBQ0E7O0FBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUk7QUFDQTs7QUFFQTtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7QUFDRDs7QUFFQTtBQUNBOztBQUlIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0g7O0FBSUQ7QUFDSTtBQUNBO0FBQ0g7O0FBS0Q7QUFDSTs7QUFHQTtBQUNBO0FBQ0E7O0FBTUg7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQS9KSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNJO0FBQ0E7QUFGRztBQUlMO0FBQ0Q7O0FBTk87O0FBV1o7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBR0M7QUFDRTtBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDSDtBQUNBO0FBQ0c7QUFDRjs7QUFwQ0kiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIGNoZXNzUHJlZmFiOiB7Ly/mo4vlrZDnmoTpooTliLbotYTmupBcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVzc0xpc3Q6IHsvL+aji+WtkOiKgueCueeahOmbhuWQiO+8jOeUqOS4gOe7tOaVsOe7hOihqOekuuS6jOe7tOS9jee9rlxuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2Mubm9kZV1cbiAgICAgICAgfSxcblxuICAgICAgICB3aGl0ZVNwcml0ZUZyYW1lOiB7Ly/mo4vnmoTlm77niYdcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgYmxhY2tTcHJpdGVGcmFtZTogey8vd3Xmo4vnmoTlm77niYdcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICB0b3VjaENoZXNzOiB7Ly/mr4/kuIDlm57lkIjngrnlh7vnmoTmo4vlrZBcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UvL+WxnuaAp+eql+WPo+S4jeaYvuekulxuICAgICAgICB9LFxuICAgICAgICB0aGVfbGFzdF90b3VjaENoZXNzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLy/lsZ7mgKfnqpflj6PkuI3mmL7npLpcbiAgICAgICAgfSxcbiAgICAgICAgYnRuX3Rlc3Q6IGNjLkJ1dHRvbixcblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyB2YXIga2V5MSA9ICfliqjmgIFrZXkxJztcbiAgICAgICAgLy8gdmFyIGtleTIgPSAn5Yqo5oCBa2V5Mic7XG4gICAgICAgIC8vIHZhciBtYXAgPSB7fTtcbiAgICAgICAgLy8gbWFwW2tleTFdID0gMTtcbiAgICAgICAgLy8gbWFwW2tleTJdID0gMjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXBba2V5MV0pOy8v57uT5p6c5pivMS5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWFwW2tleTJdKTsvL+e7k+aenOaYrzIuXG5cbiAgICAgICAgLy8gLy/lpoLmnpzpgY3ljoZtYXBcbiAgICAgICAgLy8gZm9yKHZhciBwcm9wIGluIG1hcCl7XG4gICAgICAgIC8vICAgICBpZihtYXAuaGFzT3duUHJvcGVydHkocHJvcCkpe1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdrZXkgaXMgJyArIHByb3AgKycgYW5kIHZhbHVlIGlzJyArIG1hcFtwcm9wXSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgIC8v5Yid5aeL5YyW5qOL55uY5LiKMjI15Liq5qOL5a2Q6IqC54K577yM5bm25Li65q+P5Liq6IqC54K55re75Yqg5LqL5Lu2XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgNDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGVzc1ByZWZhYik7Ly/lpI3liLZDaGVzc+mihOWItui1hOa6kFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnNldFBvc2l0aW9uKGNjLnAoKHggKyA1KSAqIDEwNSAtIDg5MCwgKHkgKyAyKSAqIDExMCAtIDM3MCkpOy8v5qC55o2u5qOL55uY5ZKM5qOL5a2Q5aSn5bCP6K6h566X5L2/5q+P5Liq5qOL5a2Q6IqC54K55L2N5LqO5oyH5a6a5L2N572uXG5cbiAgICAgICAgICAgICAgICBuZXdOb2RlLnRhZyA9IGk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZXNzTGlzdC5wdXNoKG5ld05vZGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5uZXdOb2RlX29uQ2xpY2ssdGhpcylcbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRvdWNoQ2hlc3MgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENoZXNzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lpoLmnpznrKzkuIDmrKHngrnlh7vkuI7mg7PopoHmi5bliqjnmoTmo4vlrZDkuLrlkIzkuIDkuKog5YiZ5YWB6K645ouW5YqoXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRoZV9sYXN0X3RvdWNoQ2hlc3MgIT0gbnVsbCAmJiBzZWxmLnRvdWNoQ2hlc3MudGFnID09IHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMubGFiZWwuc3RyaW5nID0gJzEyMzMyMSdcbiAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdOb2RlLmFkZENoaWxkKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNoZXNzTGlzdFtpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYmxhY2tTcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RPVUNIX1NUQVJUOicgKyBpc01vdmUpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBuZXdOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGhlX2xhc3RfdG91Y2hDaGVzcy50YWcgPSBzZWxmLnRvdWNoQ2hlc3MudGFnOy8vIOi1i+WAvHRhZ1xuICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RPVUNIX0VORDonICsgaXNNb3ZlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIG5ld05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMubmV3Tm9kZV9vbkNsaWNrLHRoaXMpXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RPVUNIX01PVkU6JyArIGlzTW92ZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbHRheDonK2RlbHRhLngrJy0tLS0nKydkZWx0YXk6JytkZWx0YS55KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMueDonK3RoaXMueCsnLS0tLScrJyB0aGlzLnk6Jyt0aGlzLnkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsdGF4OicgKyBkZWx0YS54ICsgJy0tLS0nICsgJ2RlbHRheTonICsgZGVsdGEueSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aGl0ZVNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2codGhpcy5jaGVzc0xpc3Quc2l6ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgICAgICAvLyAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9JzEyMydcbiAgICAgICAgLy8gfSk7XG5cblxuXG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLmJ0bl90ZXN0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuYnRuX3Rlc3RfZnVuYywgdGhpcylcbiAgICB9LFxuXG5cblxuICAgIG5ld05vZGVfb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdOb2RlLnRhZylcbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuICAgIH0sXG5cblxuXG5cbiAgICBzZXRDaGVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvdWNoQ2hlc3MudGFnKVxuXG5cbiAgICAgICAgdmFyIHRlc3RfbGFiZWwgPSB0aGlzLnRvdWNoQ2hlc3MuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIHRlc3RfbGFiZWwuc3RyaW5nID0gJ+WjqydcbiAgICAgICAgLy8gIHRoaXMuY2hlc3NMaXN0W3RoaXMudG91Y2hDaGVzcy50YWddLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ibGFja1Nwcml0ZUZyYW1lO1xuXG5cblxuXG5cbiAgICB9LFxuICAgIGJ0bl90ZXN0X2Z1bmM6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJzEyMydcbiAgICB9LFxuICAgIGdldE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICd0ZXN0J1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgICBidG5fc3RhdHI6IGNjLkJ1dHRvbixcbiAgICAgICAgIGJ0bl9leGl0OiBjYy5CdXR0b24sXG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICcxMjMzMjEnO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgdGhpcy5idG5fc3RhdHIubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fc3RhcnRfb25jbGljayx0aGlzKVxuICAgIHRoaXMuYnRuX2V4aXQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5idG5fZXhpdF9vbkNsaWNrLHRoaXMpXG4gXG5cbiAgICB9LFxuICAgICAgIGJ0bl9zdGFydF9vbmNsaWNrIDpmdW5jdGlvbihldmVudCl7XG4gICAgICAgY29uc29sZS5sb2coXCJidG5fc3RhdHJfb25DbGlja1wiKVxuLy8gICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdnYW1lJywgZnVuY3Rpb24gKCkge1xuLy8gICAgIGNjLmxvZygnTmV4dCBzY2VuZSBwcmVsb2FkZWQnKTtcbi8vIH0pO1xuICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgfSxcbiAgICBidG5fZXhpdF9vbkNsaWNrOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zb2xlLmxvZyhcImJ0bl9leGl0X29uQ2xpY2tcIilcbiAgICB9LFxuICBcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==