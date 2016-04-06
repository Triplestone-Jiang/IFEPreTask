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
    var time_Interval = 100;
    var $ = function (selector) {
        return document.querySelector(selector);
    };
    var $$ = function (selector) {
        return document.querySelectorAll(selector);
    };
    var animateQueue = delay(function () {
    }, 0);
    $("#leftIn").onclick = function () {
        if (!checkAnimation()) {
            getData(input, "left");
            renderAll(dataArray);
        }
    };
    $("#rightIn").onclick = function () {
        if (!checkAnimation()) {
            getData(input, "right");
            renderAll(dataArray);
        }
    };
    $("#leftOut").onclick = function () {
        if (!checkAnimation()) {
            divOut(input, "left");
        }
    };
    $("#rightOut").onclick = function () {
        if (!checkAnimation()) {
            divOut(input, "right");
        }
    };
    $("#random50").onclick = function () {
        if (!checkAnimation()) {
            dataArray = initial(50);
            renderAll(dataArray);
        }
    };
    $("#bubblingSort").onclick = function () {
        if (!checkAnimation()) {
            getTimeInterval();
            dataArray = bubblingSort(dataArray);
        }
    };
    $("#quickSort").onclick = function () {
        if (!checkAnimation()) {
            getTimeInterval();
            dataArray = sort(0, dataArray.length - 1, dataArray);
        }
    };
    $("#cancelAnimation").onclick = function () {
        if (inAnimation) {
            animateQueue.cancel();
            animateQueue = delay(function () {
            }, 0);
            inAnimation = false;
            dataArray=initial(50);
        }
    };
    delegateEvent(display, "div", "click", clickToRemove);
    dataArray = initial(50);
    renderAll(dataArray);
    function initial(amount) {
        var result = [];
        for (var i = 0; i < amount; i++) {
            result.push((Math.floor(91 * Math.random() + 10)));
        }
        return result;

    }

    function getData(inputValue, direction) {
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
        if (direction === "left") {
            dataArray.unshift(data);
        } else if (direction === "right") {
            dataArray.push(data);
        }
    }

    function renderAll(array) {
        display.innerHTML = array.map(function (item) {
            return "<div style='height:" + item * 4 + "px;top:" + (100 - item * 4) + "px;line-height:" + item * 4 + "px'>" + item + "</div>";
        }).join("");
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

    function getTimeInterval() {
        time_Interval = timeInterval.value.trim();
        if (time_Interval.search(dataReg) + 1 === 0) {
            alert("Please Input Valid Time Interval");
            time_Interval = 100;
        } else {
            time_Interval = +time_Interval;
        }
    }

    function bubblingSort(array) {
        inAnimation = true;
        for (var i = 0; i < array.length; i++) {
            for (var j = array.length; j > i; j--) {
                if (array[j - 1] > array[j]) {
                    var temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                    console.log(2);
                    bubblingRender(j, array[j - 1] * 4, array[j] * 4);
                }
            }
        }
        animateQueue.delay(function () {
            inAnimation = false;
        });
        return array;
    }

    function bubblingRender(index, value1, value2) {
        getTimeInterval();
        var displayItems = $$("#display div");
        animateQueue.delay(function () {

            displayItems[index - 1].setAttribute("style", "background-color:chocolate;color:white;height:" + value1 + "px;top:" + (100 - value1) + "px;line-height:" + value1 + "px");
            displayItems[index - 1].innerText = (value1 / 4).toString();
            displayItems[index].setAttribute("style", "height:" + value2 + "px;top:" + (100 - value2) + "px;line-height:" + value2 + "px");
            displayItems[index].innerText = (value2 / 4).toString();
        }, 0);
        animateQueue.delay(function () {
            displayItems[index - 1].style.backgroundColor = "white";
            displayItems[index - 1].style.color = "chocolate";
        }, time_Interval);
    }

    function sortPartition(left, right, array) {
        var flag = array[left];
        rangeRender(left, right);
        while (left < right) {
            quickSortRender(left);
            for (; left < right; right--) {
                quickSortRender(right);
                if (array[right] < flag) {
                    array[left] = array[right];
                    quickSortRender(left, array[left]);
                    left++;
                    break;
                }
            }
            for (; left < right; left++) {
                quickSortRender(left);
                if (array[left] > flag) {
                    array[right] = array[left];
                    quickSortRender(right, array[right]);
                    right--;
                    break;
                }
            }
        }
        array[left] = flag;
        rangeRender(left, right);
        quickSortRender(left, array[left]);
        return left;
    }

    function sort(left, right, array) {
        inAnimation = true;
        var index = sortPartition(left, right, array);
        if ((index - left) > 1) {
            sort(left, index, array);
        }
        if ((right - index) > 1) {
            sort(index + 1, right, array);
        }
        animateQueue.delay(function () {
            inAnimation = false;
        });
        return array;
    }

    function quickSortRender(index, value) {
        var displayItems = $$("#display div");
        var displayItem = displayItems[index];
        animateQueue.delay(function () {
            displayItem.style.backgroundColor = "chocolate";
            displayItem.style.color = "white";
        }, 0);
        animateQueue.delay(function () {
            if (value) {
                displayItem.setAttribute("style", "height:" + value * 4 + "px;top:" + (100 - value * 4) + "px;line-height:" + value * 4 + "px");
                displayItem.innerText = value;
            }
        }, 0);
        animateQueue.delay(function () {
            displayItem.style.backgroundColor = "white";
            displayItem.style.color = "chocolate";
        }, time_Interval);
    }

    function rangeRender(left, right) {
        animateQueue.delay(function () {
            for (; left <= right; left++) {
                $$("#display div")[left].style.backgroundColor = "wheat";
            }
        })
    }

    function checkAnimation() {
        if (inAnimation) {
            alert("In Animation");
            return true;
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