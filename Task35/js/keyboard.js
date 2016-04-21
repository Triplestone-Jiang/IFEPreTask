function keyboard() {

    document.addEventListener("keyup", function () {
        var evt = event || window.event;
        if (evt.target.nodeName.toLowerCase() !== "textarea") {
            var deg = h.calDeg();
            switch (evt.keyCode) {
                case 37:
                    deg === 90 ? h.move(deg, 1) : h.movlef(0);
                    break;
                case 38:
                    deg === 180 ? h.move(deg, 1) : h.movtop(0);
                    break;
                case 39:
                    deg === 270 ? h.move(deg, 1) : h.movrig(0);
                    break;
                case 40:
                    deg === 0 ? h.move(deg, 1) : h.movbot(0);
                    break;
            }
        }
    }, false);

    inst.addEventListener("keyup", function () {
        var evt = event || window.event;
        if (evt.keyCode === 13) {
            h.sortInput();
            if (evt.shiftKey) {
                console.log(this);
                h.execute();
            } else {
                h.sortIndex(h.chain.length + 1);
            }
        }
        if (evt.keyCode === 8) {
            h.sortInput();
            h.sortIndex(h.chain.length);
        }
    }, false);
    inst.addEventListener("scroll", function () {
        var top = -inst.scrollTop;
        listBox.style.top = top + "px";
    }, false);

    h.sortInput();
    h.sortIndex(h.chain.length + 1);
}
keyboard();