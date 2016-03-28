/**
 * Created by ycaru on 2016/3/27.
 */
(function () {
    var bts = document.getElementsByClassName("buttons");
    var display = document.getElementById("display");
    var splitReg = /[,.、。，\s ]+/;
    var data = [];
    var dataAll = [];
    var reg = new RegExp();
    var searchBt = document.getElementById("searchBt");
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
                        divOut(firstChild);
                        break;
                    case "rightOut":
                        divOut(lastChild);
                        break;
                }
            }
        })(i);
    }
    delegateEvent(display, "div", "click", divRemove);
    searchBt.onclick = function () {
        var searchInput = document.getElementById("searchInput").value;
        var searchOk = false;
        dataAll.forEach(function (item, index) {
                var selectedIterm = display.getElementsByTagName("div")[index];
                selectedIterm.style.backgroundColor = "red";
                var currentWord = selectedIterm.innerText;
                selectedIterm.innerHTML = currentWord;
                if (item.indexOf(searchInput) > -1) {
                    searchOk = true;
                    reg = eval("/" + searchInput + "/g");
                    currentWord = currentWord.replace(reg, "<span>" + searchInput + "</span>");
                    selectedIterm.innerHTML = currentWord;
                    selectedIterm.style.backgroundColor = "gold";
                }
        });
        if (!searchOk) {
            alert("404 Not Found");
        }

    };
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

    function divOut(direction) {
        if (direction) {
            display.removeChild(direction);
        } else {
            alert("No Numbers Left");
        }
    }

    function divRemove(event) {
        var parent=event.target.parentNode;
        
        var nodeAll = parent.getElementsByTagName("div");
        console.log(nodeAll);
        for (var i = 0; i < nodeAll.length; i++) {
            if (nodeAll.item(i) === event.target) {
                dataAll.splice(i, 1);
            }
        }
        parent.removeChild(event.target);

    }

    function delegateEvent(delegateElement, targetElement, eventName, handler) {
        delegateElement.addEventListener(eventName, function (event) {
            if (event.target.nodeName.toLowerCase() === targetElement.toLowerCase() && event.target.id !== "display") {
                return handler(event);
            }
        }, false);
    }
})();