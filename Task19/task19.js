/**
 * Created by Icarus on 2016/3/31.
 */
(function () {
    var input = document.getElementById("input");
    var bts = document.getElementsByClassName("buttons");
    var timeInterval=document.getElementById("timeInterval");
    var dataArray = [];
    var display = document.getElementById("display");
    var dataReg = /^\d+$/;
    for (var i = 0; i < 6; i++) {
        (function (turn) {
            bts[turn].onclick = function () {
                switch (bts.item(turn).id) {
                    case "leftIn":
                        verifyInput(input, "left");
                        break;
                    case "rightIn":
                        verifyInput(input, "right");
                        break;
                    case "leftOut":
                        divOut("left");
                        break;
                    case "rightOut":
                        divOut("right");
                        break;
                    case "bubblingSort":
                        dataArray = bubblingSort(dataArray);
                        break;
                    case "random50":
                        initial();
                        break;
                }
            }
        })(i);
    }
    delegateEvent(display, "div", "click", clickToRemove);
    initial();
    function verifyInput(inputValue, direction) {
        if (dataArray.length === 60) {
            alert("The data amount should be no more than 60");
            return;
        }
        var data = inputValue.value.trim();
        if (dataReg.test(data)) {
            data = parseInt(data, 10);
            if (data < 10 || data > 100) {
                alert("The input value should between 10 and 100");
                return;
            }
        } else {
            alert("Please input the valid number");
            return;
        }
        divIn(data, direction);
        getDataArray(data, direction);
    }

    function getDataArray(data, direction) {
        if (direction === "left") {
            dataArray.unshift(data);
        } else if (direction === "right") {
            dataArray.push(data);
        }
    }

    function divIn(data, direction) {
        var text = data.toString();
        var textNode = document.createTextNode(text);
        var newDiv = document.createElement("div");
        newDiv.appendChild(textNode);
        if (direction === "left") {
            display.insertBefore(newDiv, display.firstChild);
        } else if (direction === "right") {
            display.insertBefore(newDiv, null);
        }
        renderHeight(newDiv, data * 4);
    }

    function clickToRemove(event) {
        var displayItem = display.getElementsByTagName("div");
        for (var i = 0; i < displayItem.length; i++) {
            if (displayItem.item(i) === event.target) {
                dataArray.splice(i, 1);
            }
        }
        display.removeChild(event.target);
    }

    function divOut(direction) {
        if (direction === "left") {
            dataArray.splice(0, 1);
            display.removeChild(display.firstChild);
        } else if (direction === "right") {
            dataArray.length = dataArray.length - 1;
            display.removeChild(display.lastChild);
        }
    }

    function delegateEvent(delegateElement, targetElement, eventName, handler) {
        delegateElement.addEventListener(eventName, function (event) {
            if (event.target.nodeName.toLowerCase() === targetElement.toLowerCase()) {
                return handler(event);
            }
        }, false);
    }

    function initial() {
        dataArray = randomData(50);
        renderAll(dataArray);
    }

    function randomData(amount) {
        var result = [];
        for (var i = 0; i < amount; i++) {
            result.push((Math.floor(91 * Math.random() + 10)).toString());
        }
        return result;
    }

    function renderHeight(item, value) {
        item.setAttribute("style", "height:" + value + "px;top:" + (100 - value) + "px;line-height:" + value + "px");
    }

    function bubblingSort(array) {
        var time_Interval=timeInterval.value.trim();
        if(time_Interval.search(dataReg)+1===0){
            alert("Please Input Valid Time Interval");
            return array;
        }else {
            time_Interval=+time_Interval;
        }
        for (var i = 0; i < array.length; i++) {
            (function (i) {
                setTimeout(function () {
                    for (var j = array.length - 1; j > i; j--) {
                        if (+array[j - 1] > +array[j]) {
                            var temp = array[j];
                            array[j] = array[j - 1];
                            array[j - 1] = temp;
                        }
                    }
                    renderAll(array);
                }, time_Interval * i)
            })(i);
        }
        return array;
    }

    function renderAll(array) {
        display.innerHTML = "";
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < array.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.appendChild(document.createTextNode(array[i]));
            renderHeight(newDiv, array[i] * 4);
            fragment.appendChild(newDiv);
        }
        display.appendChild(fragment);
    }
})();