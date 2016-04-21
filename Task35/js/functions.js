function Handler() {
    this.tunlef = function () {
        cube.deg += 90;
        cube.rotate();
    };
    this.tunrig = function () {
        cube.deg += -90;
        cube.rotate();
    };
    this.tunbac = function () {
        cube.deg += -180;
        cube.rotate();
    };
    this.calDeg = function () {
        var deg = cube.deg % 360;
        deg = deg < 0 ? deg + 360 : deg;
        return deg;
    };
    this.move = function (deg, i) {
        switch (deg) {
            case 0:
                cube.y = (cube.y + i) > amount ? cube.y : cube.y + i;
                break;
            case 90:
                cube.x = (cube.x - i) < 1 ? cube.x : cube.x - i;
                break;
            case 180:
                cube.y = (cube.y - i) < 1 ? cube.y : cube.y - i;
                break;
            case 270:
                cube.x = (cube.x + i) > amount ? cube.x : cube.x + i;
                break;
        }
        cube.move(cube.x, cube.y);
    };
    this.go = function (i) {
        this.move(this.calDeg(), i);
    };
    this.movlef = function (i) {
        cube.deg = 90;
        cube.rotate();
        this.go(i);
    };
    this.movrig = function (i) {
        cube.deg = 270;
        cube.rotate();
        this.go(i);
    };
    this.movtop = function (i) {
        cube.deg = 180;
        cube.rotate();
        this.go(i);
    };
    this.movbot = function (i) {
        cube.deg = 0;
        cube.rotate();
        this.go(i);
    };
    this.tralef = function (i) {
        cube.x = (cube.x - i) < 1 ? cube.x : cube.x - i;
        cube.move(cube.x, cube.y);
    };
    this.trarig = function (i) {
        cube.x = (cube.x + i) > amount ? cube.x : cube.x + i;
        cube.move(cube.x, cube.y);
    };
    this.tratop = function (i) {
        cube.y = (cube.y - i) < 1 ? cube.y : cube.y - i;
        cube.move(cube.x, cube.y);
    };
    this.trabot = function (i) {
        cube.y = (cube.y + i) > amount ? cube.y : cube.y + i;
        cube.move(cube.x, cube.y);
    };
    this.chain = [];

    this.sortInput = function () {
        h.chain = inst.value.toLocaleLowerCase().split(/ *\n+ */);
        h.chain = h.chain.filter(function (item) {
            return item;
        });
    };
    this.sortIndex = function (l) {
        var innerHTML = "";
        for (var i = 0; i < l; i++) {
            innerHTML += "<div class='instructionIndex'>" + (i + 1) + "</div>";
        }
        listBox.innerHTML = innerHTML;
    };
    this.execute = function () {
        var reg = [/^(go) *(\d*)$/i, /^(tun) +(lef|rig|bac)$/i, /^(mov) +(lef|top|rig|bot) *(\d*)$/i, /^(tra) +(lef|top|rig|bot) *(\d*)$/i];
        h.sortInput();
        var cmd = [];
        var err = [];
        h.chain.map(function (item1, index) {
            var result = reg.some(function (item2) {
                var matches = item2.exec(item1);
                if (matches) {
                    if (matches[3]) {
                        cmd.push([matches[1] + matches[2], matches[3]]);
                    } else if (matches[2] && parseInt(matches[2], 10)) {
                        cmd.push([matches[1], matches[2]]);
                    } else if (matches[2]) {
                        cmd.push([matches[1] + matches[2]]);
                    } else {
                        cmd.push([matches[1]]);
                    }
                }
                return matches;
            });
            if (!result) {
                err.push(index);
            }
        });
        if (err.length) {
            err.map(function (item) {
                listBox.childNodes[item].style.backgroundColor = "#ff2121";
            })
        }else {
            var first = cmd.shift();
            var ini = delay(function (i) {
                var j = i ? i : 1;
                h[first[0]](j);
                listBox.childNodes[0].style.backgroundColor = "white";
                listBox.childNodes[0].style.color = "chocolate";
            }, +first[1], 0);
            cmd.map(function (item, index) {
                ini.delay(function (i) {
                    var j = i ? i : 1;
                    h[item[0]](j);
                    listBox.childNodes[index].style.backgroundColor = "chocolate";
                    listBox.childNodes[index].style.color = "white";
                    listBox.childNodes[index + 1].style.backgroundColor = "white";
                    listBox.childNodes[index + 1].style.color = "chocolate";
                }, +item[1], 600);
            });
            ini.delay(function () {
                listBox.childNodes[cmd.length].style.backgroundColor = "chocolate";
                listBox.childNodes[cmd.length].style.color = "white";
            },"",600);
        }

    };
    function delay(fn, arg, t) {
        var timer;
        var self;
        var queue = [];

        function schedule(fn, arg, t) {
            timer = setTimeout(function () {
                timer = null;
                fn(arg);
                if (queue.length) {
                    var next = queue.shift();
                    schedule(next.fn, next.arg, next.t);
                }
            }, t)
        }

        self = {
            delay: function (fn, arg, t) {
                if (queue.length || timer) {
                    queue.push({fn: fn, arg: arg, t: t});
                } else {
                    schedule(fn, arg, t);
                }
                return self;
            }
        };
        return self.delay(fn, arg, t)
    }
}
var inst = document.getElementById("instruction");
var listBox = document.getElementById("listBox");
var amount = +document.getElementById("size").value;
var table = document.getElementById("box");
window.h = new Handler();
tableGenerator(amount);
newCube(amount);