/**
 * 仿照JQuery写法,支持链式语法
 * 不需要额外css支持
 * 预设四种提示框类型，两种方法hide()和show(),调用方法如：$$("default").show().hide()
 * 一种自定义提示框的方法，第一个参数为提示框的标题，第二参数为一个对象，包括三个或四个属性，分别为：
 * 提示框的内容，提示框标题的背景色，提示框上按键1，提示框上按键2（可选）
 * 其中按键属性是一个长度为3的数组，格式为["按键名称","按键背景色",一个可选的回调函数],例如：
 * $$("title name",{
 *      infoMessage:"This is infoMessage",
 *      color:"red",
 *      button1:["button1","black",function() {alert("hi")}]
 * })
 */
;(function (window, document) {
    function Prompt(infoType, obj) {
        return new Prompt.prototype.init(infoType, obj);
    }

    Prompt.prototype = {
        constructor: Prompt,
        success: {
            infoMessage: "success, let's celebrate!",
            color: "#2ecc71",
            button1: ["confirm", "green", function () {
                alert("this is callback function for confirm");
            }]
        },
        warning: {
            infoMessage: "well, there are something strange here",
            color: "#FFD700",
            button1: ["confirm", "green", function () {
                alert("this is callback function for confirm");
            }],
            button2: ["cancel", "red", function () {
                alert("this is callback function for cancel");
            }]
        },
        error: {
            infoMessage: "error, so sad",
            color: "#FF6347",
            button1: ["cancel", "red", function () {
                alert("this is callback function for cancel");
            }]
        },
        default: {
            infoMessage: "this is default message",
            color: "gray",
            button1: ["confirm", "green", function () {
                alert("this is callback function for confirm");
            }]
        },
        init: function (infoType, obj) {
            if (!obj) {
                switch (infoType) {
                    case "success":
                        obj = this.success;
                        break;
                    case "warning":
                        obj = this.warning;
                        break;
                    case "error":
                        obj = this.error;
                        break;
                    default:
                        obj = this.default;
                }
            }
            var that = this;
            this.dragState = false;
            this.infoType = infoType ? infoType.toString() : "default";
            this.infoMessage = obj.infoMessage ? obj.infoMessage.toString() : this.default.infoMessage;
            this.infoColor = obj.color ? obj.color.toString() : this.default.color;
            if (obj.button1) {
                var bt1 = document.createElement("div");
                bt1.innerText = obj.button1[0];
                bt1.setAttribute("style", "cursor:pointer;border-radius:4px;height:30px;width:80px;background-color:" + obj.button1[1]);
                bt1.addEventListener("click", that.hide, false);
                if (obj.button1[2]) {
                    bt1.addEventListener("click", obj.button1[2], false);
                }

            }
            if (obj.button2) {
                var bt2 = document.createElement("div");
                bt2.innerText = obj.button2[0];
                bt2.setAttribute("style", "cursor:pointer;border-radius:4px;height:30px;width:80px;background-color:" + obj.button2[1]);
                bt2.addEventListener("click", that.hide, false);
                if (obj.button2[2]) {
                    bt2.addEventListener("click", obj.button2[2], false);
                }
            }

            this.cover = document.createElement("div");
            this.container = document.createElement("div");
            this.cover.setAttribute("style", "position: fixed;left:0;top:0;right:0;bottom:0;background-color:black;opacity:0.3;z-index:9;");
            this.container.setAttribute("style", "font-family:'Microsoft YaHei',Arial,sans-serif;height:240px;width:420px;position:fixed;left:50%;top:50%;margin:-140px 0 0 -210px;z-index:99;");
            var title = document.createElement("div");
            var content = document.createElement("div");
            var placeholder1 = document.createElement("div");
            var placeholder2 = document.createElement("div");
            title.setAttribute("style", "cursor:move;height:50px;border-radius:10px 10px 0 0;line-height:50px;padding:5px 10px;color:white;font-size:22px;background-color:" + this.infoColor);
            title.innerText = this.infoType;
            content.setAttribute("style", "height:170px;border-radius:0 0 10px 10px;color:#888888;background-color:white;padding:5px 10px;over-flow:hidden;font-size:16px;line-height:28px;");
            content.innerText = this.infoMessage;
            placeholder1.setAttribute("style", "height:30px;width:80px;margin:-40px 0 0 220px;line-height:30px;color:white;text-align:center");
            placeholder2.setAttribute("style", "height:30px;width:80px;margin:-30px 0 0 320px;line-height:30px;color:white;text-align:center");
            if (bt1 && !bt2) {
                placeholder2.appendChild(bt1);
            } else if (bt1) {
                placeholder1.appendChild(bt1);
                placeholder2.appendChild(bt2);
            }
            this.cover.addEventListener("click", this.hide, false);
            this.container.appendChild(title);
            this.container.appendChild(content);
            this.container.appendChild(placeholder1);
            this.container.appendChild(placeholder2);
            title.addEventListener("mousedown", function (event) {
                ev = event || window.event;
                that.dragState = true;
                that.startX = ev.pageX;
                that.startY = ev.pageY;
                that.left = parseInt(window.getComputedStyle(that.container, null)['left']);
                that.top = parseInt(window.getComputedStyle(that.container, null)['top']);
            }, false);
            title.addEventListener("mouseup", function () {
                that.dragState = false;
            }, false);
            title.addEventListener("mousemove", function (event) {
                ev = event || window.event;
                that.drag(ev, that);
            }, false)
        },
        drag: function (ev, that) {
            if (this.dragState) {
                this.container.style.left = that.left + ev.pageX - this.startX + "px";
                this.container.style.top = that.top + ev.pageY - this.startY + "px";
            }
        },
        show: function () {
            document.body.insertBefore(this.container, document.body.firstElementChild);
            document.body.insertBefore(this.cover, document.body.firstElementChild);
            return this;
        },
        hide: function () {
            document.body.removeChild(document.body.firstElementChild);
            document.body.removeChild(document.body.firstElementChild);
            return this;
        }
    };
    Prompt.prototype.init.prototype = Prompt.prototype;
    window.$$ = Prompt;
})(window, document);
