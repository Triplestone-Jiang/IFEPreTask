window.onload = function () {
    var originalText;
    var tagDisplay = document.getElementById("tagDisplay");

    function getData(inputItem, displayItem) {
        var input = inputItem.value.trim().split(/[,.、。，\s ]+/);
        inputItem.value="";
        //输入数组内部去重
        input = unique(input);
        if (displayItem.hasChildNodes()) {
            var displayItemChild = displayItem.childNodes;
            var arrayOfDisplayItemChild = [];
            //将展示的元素的内部文本保存成数组，为了下一步查重
            for (var i = 0; i < displayItemChild.length; i++) {
                arrayOfDisplayItemChild[i] = displayItemChild[i].innerText;
            }
            //输入的数据与当前已展示的数据查重
            input = input.filter(function (item1) {
                return (arrayOfDisplayItemChild.every(function (item2) {
                    return (item1 !== item2);
                }));
            });
        }
        //过滤空数组
        input = input.filter(function (item) {
            return (item !== "");
        });
        if (input && input.length < 11) {
            return input;
        } else if (input && input.length > 10) {
            input.splice(0, input.length - 10);
            return input;
        } else {
            return false;
        }
        function unique(array) {
            var uniqueData = [];
            var json={};
            for (var i = 0; i < array.length; i++) {
                if (!json[array[i]]) {
                    uniqueData.push(array[i]);
                    json[array[i]] = 1;
                }
            }
            return uniqueData;
        }
    }

    //渲染
    function render(data, displayItem) {
        //总数据大于10时，处理因新输入而需要去除的旧数据
        var redundant = data.length + displayItem.childNodes.length - 10;
        if (redundant > 0) {
            for (var i = 0; i < redundant && i < 10; i++) {
                displayItem.removeChild(displayItem.lastChild);
            }
        }
        //根据修改后的输入数据插入新元素
        for (var j = 0; j < data.length; j++) {
            var newDiv = document.createElement("div");
            newDiv.appendChild(document.createTextNode(data[j]));
            displayItem.insertBefore(newDiv, displayItem.firstChild);
        }
    }

    //事件绑定函数
    function addEvent(element, eventType, handler) {
        if (addEventListener) {
            element.addEventListener(eventType, handler, false);
        } else if (attachEvent) {
            element.attachEvent("on" + eventType, handler);
        } else {
            element["on" + eventType] = handler;
        }
    }

    function mouseOver(event) {
        if (event.target.parentNode.id === "tagDisplay" || event.target.nodeName.toLowerCase() === "div") {
            originalText = event.target.innerText;
            event.target.innerText = "删除 " + originalText;
        }
    }

    function mouseOut(event) {
        if (event.target.parentNode.id === "tagDisplay" || event.target.nodeName.toLowerCase() === "div") {
            event.target.innerText = originalText;
        }
    }

    function remove(event) {
        if (event.target.parentNode.id === "tagDisplay" || event.target.nodeName.toLowerCase() === "div") {
            event.target.parentNode.removeChild(event.target);
        }
    }

    addEvent(document.getElementById("hobbyButton"), "click", function () {
        var hobbyDisplay = document.getElementById("hobbyDisplay");
        var result = getData(document.getElementById("hobbyInput"), hobbyDisplay);
        if (result) {
            render(result, hobbyDisplay);
        }
    });
    addEvent(document.getElementById("tagInput"), "keyup", function (event) {
        //增加对中文逗号的识别
        var comma = /^.+，$/;
        if (document.getElementById("tagInput").value.search(comma) + 1) {
            var commaTrue = true;
        }
        var evt = event || window.event;
        if (evt.keyCode === 13 || evt.keyCode === 32 || evt.keyCode === 188 || commaTrue) {
            var result = getData(document.getElementById("tagInput"), tagDisplay);
            if (result) {
                render(result, tagDisplay);
            }
        }
    });
    addEvent(tagDisplay, "mouseover", function (event) {
        mouseOver(event);
    });
    addEvent(tagDisplay, "mouseout", function (event) {
        mouseOut(event);
    });
    addEvent(tagDisplay, "click", function (event) {
        remove(event);
    })
}