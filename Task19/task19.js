/**
 * Created by Icarus on 2016/3/31.
 */
(function () {
    var input = document.getElementById("input");
    var timeInterval = document.getElementById("timeInterval");
    var dataArray = [];
    var display = document.getElementById("display");
    var dataReg = /^\d+$/;
    var inAnimation = false;
    var time_Interval = 300;
    var $ = function (selector) {
        return document.querySelector(selector);
    };
    var $$ = function (selector) {
        return document.querySelectorAll(selector);
    };
    var animateQueue = delay(function () {
    }, 0);
    $("#leftIn").onclick = function () {
        if (inAnimation)return alert("In Animation");
        verifyInput(input, "left");
    };
    $("#rightIn").onclick = function () {
        if (inAnimation)return alert("In Animation");
        verifyInput(input, "right");
    };
    $("#leftOut").onclick = function () {
        if (inAnimation)return alert("In Animation");
        divOut(input, "left");
    };
    $("#rightOut").onclick = function () {
        if (inAnimation)return alert("In Animation");
        divOut(input, "right");
    };
    $("#bubblingSort").onclick = function () {
        if (inAnimation)return alert("In Animation");
        dataArray = bubblingSort(dataArray);
    };
    $("#quickSort").onclick = function () {
        if (inAnimation)return alert("In Animation");
        getTimeInterval();
        inAnimation = true;
        dataArray = sort(0, dataArray.length - 1, dataArray);
        animateQueue.delay(function () {
            inAnimation = false;
        })
    };
    $("#random50").onclick = function () {
        if (inAnimation)return alert("In Animation");
        initial();
    };
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
                alert("The input value should be between 10 and 100");
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
                if (inAnimation)return alert("In Animation");
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
            result.push((Math.floor(91 * Math.random() + 10)));
        }
        return result;
    }

    function renderHeight(item, value) {
        item.setAttribute("style", "height:" + value + "px;top:" + (100 - value) + "px;line-height:" + value + "px");
    }

    function getTimeInterval() {
        time_Interval = timeInterval.value.trim();
        if (time_Interval.search(dataReg) + 1 === 0) {
            alert("Please Input Valid Time Interval");
        } else {
            time_Interval = +time_Interval;
        }
    }

    function bubblingSort(array) {
        getTimeInterval();
        for (var i = 0; i < array.length; i++) {
            (function (i) {
                setTimeout(function () {
                    for (var j = array.length - 1; j > i; j--) {
                        if (array[j - 1] > array[j]) {
                            var temp = array[j];
                            array[j] = array[j - 1];
                            array[j - 1] = temp;
                        }
                    }
                    renderAll(array);
                    display.childNodes.item(i).style.backgroundColor = "chocolate";
                    display.childNodes.item(i).style.color = "#FFFFFF";
                }, time_Interval * i)
            })(i);
        }
        return array;
    }

    function sortPartition(left, right, array) {
        var flag = array[left];
        rangeRender(left, right);
        while (left < right) {
            animateRender(left);
            for (; left < right; right--) {
                animateRender(right);
                if (array[right] < flag) {
                    array[left] = array[right];
                    animateRender(left, array[left]);
                    left++;
                    break;
                }
            }
            for (; left < right; left++) {
                animateRender(left);
                if (array[left] > flag) {
                    array[right] = array[left];
                    animateRender(right, array[right]);
                    right--;
                    break;
                }
            }
        }
        array[left] = flag;
        rangeRender(left, right);
        animateRender(left, array[left]);
        return left;
    }

    function sort(left, right, array) {
        var index = sortPartition(left, right, array);
        if ((index - left) > 1) {
            sort(left, index, array);
        }
        if ((right - index) > 1) {
            sort(index + 1, right, array);
        }
        return array;
    }

    function animateRender(index, value) {
        animateQueue.delay(function () {
            $$("#display div")[index].style.backgroundColor = "chocolate";
            $$("#display div")[index].style.color = "white";

        }, 0);
        animateQueue.delay(function () {
            if (value) {
                $$("#display div")[index].setAttribute("style", "height:" + value * 4 + "px;top:" + (100 - value * 4) + "px;line-height:" + value * 4 + "px");
                $$("#display div")[index].innerText = value;
            }
        }, 0);
        animateQueue.delay(function () {
            $$("#display div")[index].style.backgroundColor = "white";
            $$("#display div")[index].style.color = "chocolate";
        }, time_Interval);
    }

    function rangeRender(left, right) {
        animateQueue.delay(function () {
            for (; left <= right; left++) {
                $$("#display div")[left].style.backgroundColor = "wheat";
            }
        })
    }

    function renderAll(array) {
        display.innerHTML = "";
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < array.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.appendChild(document.createTextNode(array[i].toString()));
            renderHeight(newDiv, array[i] * 4);
            fragment.appendChild(newDiv);
        }
        display.appendChild(fragment);
    }

    function delay(fn, t) {
        var queue = [], self, timer;

        function schedule(fn, t) {
            timer = setTimeout(function () {
                timer = null;
                fn();
                if (queue.length) {
                    var next = queue.shift();
                    schedule(next.fn, next.t);
                }
            }, t)
        }

        self = {
            delay: function (fn, t) {
                if (queue.length || timer) {
                    queue.push({fn: fn, t: t})
                } else {
                    schedule(fn, t);
                }
                return self;
            },
            cancel: function () {
                clearTimeout(timer);
                queue = [];
            }
        };
        return self.delay(fn, t);
    }
})();