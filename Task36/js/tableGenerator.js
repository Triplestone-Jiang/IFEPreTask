function tableGenerator(amount) {
    var tableHTML = "";
    var td = "<td data-type='x-axis'></td>";
    for (var i = 0; i < amount + 1; i++) {
        if (i === 0) {
            for (var j = 1; j < amount + 1; j++) {
                td += "<td data-type='x-axis'>" + j + "</td>";
            }
        } else {
            for (j = 0; j < amount + 1; j++) {
                if (j === 0) {
                    td = "<td data-type='y-axis'>" + i + "</td>";
                } else {
                    td += "<td data-type='cube'></td>";
                }
            }
        }
        tableHTML += "<tr>" + td + "</tr>";
    }
    table.innerHTML = "<tbody>" + tableHTML + "</tbody>";
    function generateCSS() {
        var style = document.createElement("style");
        var head = document.head || document.getElementsByTagName("head")[0];
        var cssText = "";
        style.type = "text/css";
        for (var i = 0; i < arguments.length; i++) {
            cssText += arguments[i];
        }
        if (style.stylesheet) {
            var func = function () {
                try {
                    style.stylesheet.cssText = cssText;
                } catch (e) {

                }
            };
            if (style.stylesheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else {
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style);
    }

    var css1 = "#box{position:relative;font-family: 'Microsoft YaHei',Arial,sans-serif;box-sizing: border-box;border-collapse: collapse;text-align: center;color:#888888;}";
    var css2 = "td[data-type]{background-color:transparent;z-index:999;box-sizing: border-box;border: 1px solid #bdc3c7;cursor:pointer;width:" + 600 / amount + "px;height:" + 600 / amount + "px}";
    var css3 = "td[data-type*='-axis']{border:none;cursor:default}";
    generateCSS(css1, css2, css3);
}