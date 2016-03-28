(function () {
    var bts = document.getElementsByClassName("buttons");
    var display = document.getElementById("display");
    var splitReg = /[,.、。，\s ]+/;
    //data定义每次输入的字符串所返回的数组，dataAll定义所有输入字符串所返回的数组
    var data = [];
    var dataAll = [];
    var reg = new RegExp();
    var searchBt = document.getElementById("searchBt");
    //给四个button绑定事件，使用匿名函数消除闭包产生的影响
    for (var i = 0; i < 4; i++) {
        bts[i] = (function (turns) {
            bts[turns].onclick = function () {
                var firstChild = display.firstChild;
                var lastChild = display.lastChild;
                switch (bts.item(turns).getAttribute("id")) {
                    case "leftIn":
                        getData("left");
                        divIn(firstChild);
                        break;
                    case "rightIn":
                        getData("right");
                        divIn(null);
                        break;
                    case "leftOut":
                        divOut(firstChild, "left");
                        break;
                    case "rightOut":
                        divOut(lastChild, "right");
                        break;
                }
            }
        })(i);
    }
    //将在div上的事件代理到display上
    delegateEvent(display, "div", "click", divRemove);
    //button查找 绑定事件
    searchBt.onclick = function () {
        var searchInput = document.getElementById("searchInput").value;
        var searchOk = false;
        //遍历数组
        dataAll.forEach(function (item, index) {
            var selectedItem = display.getElementsByTagName("div")[index];
            //初始背景，消除上一次搜索改变的背景色
            selectedItem.style.backgroundColor = "red";
            //将当前的div的内部字符串赋值到div的innerHTML，消除上一次搜索添加的<span>标签
            var currentWord = selectedItem.innerText;
            selectedItem.innerHTML = currentWord;
            //是否匹配输入查找字符串
            if (item.indexOf(searchInput) > -1) {
                searchOk = true;
                //将输入的查找字符串转化为正则对象，添加g flag以搜索所有匹配字符串
                reg = eval("/" + searchInput + "/g");
                //将匹配字符串加入<span>标签，用css样式渲染
                currentWord = currentWord.replace(reg, "<span>" + searchInput + "</span>");
                selectedItem.innerHTML = currentWord;
                selectedItem.style.backgroundColor = "gold";
            }
        });
        if (!searchOk) {
            alert("404 Not Found");
        }
    };
    //处理textArea输入的字符串，转化为data数组，并添加到总数组dataAll中
    function getData(direction) {
        var inputs = document.getElementById("textArea").value.trim();
        if (inputs === "") {
            alert("Please Input Qualified Data");
        }
        var inputsArray = inputs.split(splitReg).filter(function (item) {
            return (item !== "");
        });
        data = inputsArray;
        if (direction === "left") {
            dataAll = inputsArray.concat(dataAll);
        } else if (direction === "right") {
            dataAll = dataAll.concat(inputsArray);
        }
    }

    //渲染In
    function divIn(direction) {
        data.forEach(function (item) {
            if (item) {
                var newDiv = document.createElement("div");
                var text = document.createTextNode(item);
                newDiv.appendChild(text);
                display.insertBefore(newDiv, direction);
            }
        });
    }

    //渲染Out
    function divOut(direction, whichItem) {
        if (direction) {
            display.removeChild(direction);
        } else {
            alert("No Numbers Left");
        }
        //从dataAll中删除
        if (whichItem === "left") {
            dataAll.splice(0, 1);
        } else if (whichItem === "right") {
            dataAll.splice(dataAll.length - 1, 1);
        }
    }

    //点击div删除该div
    function divRemove(event) {
        var parent = event.target.parentNode;
        var nodeAll = parent.getElementsByTagName("div");
        //从dataAll中删除对应点击项
        for (var i = 0; i < nodeAll.length; i++) {
            if (nodeAll.item(i) === event.target) {
                dataAll.splice(i, 1);
            }
        }
        //渲染页面删除对应点击项
        parent.removeChild(event.target);
    }

    //事件代理函数
    function delegateEvent(delegateElement, element, eventName, handler) {
        delegateElement.addEventListener(eventName, function (event) {
            //点击div元素，其父元素为div#display 点击div元素的子节点(文本节点),其父元素为div 点击div#display,其父元素为body
            if (event.target.parentNode.nodeName.toLowerCase() === element.toLowerCase() ) {
                return handler(event);
            }
        }, false);
    }
})();