window.onload = function () {
    var originalText;
    var tagDisplay = document.getElementById("tagDisplay");

    function getData(inputItem, displayItem) {
        var input = inputItem.value.trim().split(/[,.、。，\s ]+/);
        if (displayItem.hasChildNodes()) {
            var displayItemChild = displayItem.childNodes;
            var arrayOfDisplayItemChild = [];
            for (var i = 0; i < displayItemChild.length; i++) {
                arrayOfDisplayItemChild[i] = displayItemChild[i].innerText;
            }
            input = input.filter(function (item1) {
                return (arrayOfDisplayItemChild.every(function (item2) {
                    return (item1 !== item2);
                }));
            });
        }
        if (input.length && input.length < 11) {
            return input;
        } else if (input.length && input.length > 10) {
            input.splice(0, input.length - 10);
            return input;
        } else {
            return false;
        }
    }

    function render(data, displayItem) {
        var redundant = data.length + displayItem.childNodes.length - 10;
        if (redundant > 0) {
            for (var i = 0; i < redundant && i < 10; i++) {
                displayItem.removeChild(displayItem.lastChild);
            }
        }
        for (j = 0; j < data.length; j++) {
            var newDiv = document.createElement("div");
            newDiv.appendChild(document.createTextNode(data[j]));
            displayItem.insertBefore(newDiv, displayItem.firstChild);
        }
    }

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
        var hobbydisplay = document.getElementById("hobbyDisplay");
        var result = getData(document.getElementById("hobbyInput"), hobbydisplay);
        if (result) {
            render(result, hobbydisplay);
        }
    });
    addEvent(document.getElementById("tagInput"), "keydown", function (event) {
        var evt = event || window.event;
        if (evt.keyCode === 13 || evt.keyCode === 32 || evt.keyCode === 188) {
            var result = getData(document.getElementById("tagInput"), tagDisplay);
            if (result) {
                render(result, tagDisplay);
            }
        }
    });
    addEvent(tagDisplay, "mouseover", function (event) {
        var originalText = mouseOver(event);
    });
    addEvent(tagDisplay, "mouseout", function (event) {
        mouseOut(event);
    });
    addEvent(tagDisplay, "click", function (event) {
        remove(event);
    })
}