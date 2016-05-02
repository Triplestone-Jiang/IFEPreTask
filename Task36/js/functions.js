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
    this.go = function (i) {
        var j = i === undefined ? 1 : i;
        this.move(this.calDeg(), j);
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
        var j=i===undefined?1:i;
        (cube.x - j) < 1 ? console.log("the movement is apparently out of range") : checkWall(cube.x - j, 1);
    };
    this.trarig = function (i) {
        var j=i===undefined?1:i;
        (cube.x + j) > amount ? console.log("the movement is apparently out of range") : checkWall(cube.x + j, 1);
    };
    this.tratop = function (i) {
        var j=i===undefined?1:i;
        (cube.y - j) < 1 ? console.log("the movement is apparently out of range") : checkWall(cube.y - j, 0);
    };
    this.trabot = function (i) {
        var j=i===undefined?1:i;
        (cube.y + j) > amount ? console.log("the movement is apparently out of range") : checkWall(cube.y + j, 0);
    };
    this.wallPosition = function (deg) {
        switch (deg) {
            case 0:
                if ((cube.y + 1 > amount)) {
                    console.log("the wall is out of range");
                } else {
                    return [cube.x, cube.y + 1];
                }
                break;
            case 90:
                if ((cube.x - 1 < 1)) {
                    console.log("the wall is out of range");
                } else {
                    return [cube.x - 1, cube.y];
                }
                break;
            case 180:
                if ((cube.y - 1 < 1)) {
                    console.log("the wall is out of range");
                } else {
                    return [cube.x, cube.y - 1];
                }
                break;
            case 270:
                if ((cube.x + 1 > amount)) {
                    console.log("the wall is out of range");
                } else {
                    return [cube.x + 1, cube.y];
                }
                break;
        }
    };
    this.randomWall = function () {
        var currentWall = newWall.getWall();
        var x = Math.floor(Math.random() * (amount - 1) + 1);
        var y = Math.floor(Math.random() * (amount - 1) + 1);
        if (currentWall[x + "," + y] || (cube.x === x && cube.y === y)) {
            return h.randomWall();
        } else {
            newWall.build(x, y);
        }
    };
    this.build = function () {
        var position = h.wallPosition(h.calDeg());
        if (position) {
            newWall.build(position[0], position[1]);
        }
    };
    this.bru = function (color) {
        var position = h.wallPosition(h.calDeg());
        var currentWalls = newWall.getWall();
        if (currentWalls[position[0] + "," + position[1]]) {
            newWall.brushColor(position[0], position[1], color);
        } else {
            console.log("no walls here, you want to brush the air?");
        }
    };
    this.findPaths = function (endIndex) {
        var path = findPath(endIndex);
        if (path) {
            for (var i = 0; i < path.length; i++) {
                ini.delay(function (a) {
                    cube.x = a % amount + 1;
                    cube.y = Math.floor(a / amount) + 1;
                    cube.move();
                }, path[i], t)
            }
        }
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
        var reg = [/^(go) *(\d*)$/i, /^(tun) +(lef|rig|bac)$/i, /^(mov) +(lef|top|rig|bot) *(\d*)$/i, /^(tra) +(lef|top|rig|bot) *(\d*)$/i, /^(build)$/i, /^(bru) *(.+)/i, /^(mov to) *(\d\d?,\d\d?)$/i];
        h.sortInput();
        var cmd = [];
        var err = [];
        h.chain.map(function (item1, index) {
            var result = reg.some(function (item2) {
                var matches = item2.exec(item1);
                if (matches) {
                    if (matches[3]) {
                        cmd.push([matches[1] + matches[2], matches[3]]);
                    } else if (matches[1].toLowerCase() === "mov to") {
                        var arr = matches[2].split(",");
                        var index = +arr[0] - 1 + (+arr[1] - 1) * amount;
                        cmd.push(["findPaths", index]);
                    } else if (matches[2] && parseInt(matches[2], 10)) {
                        cmd.push([matches[1], matches[2]]);
                    } else if (matches[1].toLowerCase() === "bru") {
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
        } else {
            var first = cmd.shift();
            ini.delay(function (i) {
                var j = +i ? +i : i;
                h[first[0]](j);
                listBox.childNodes[0].style.backgroundColor = "white";
                listBox.childNodes[0].style.color = "chocolate";
            }, first[1], 0);
            cmd.map(function (item, index) {
                ini.delay(function (i) {
                    var j = +i ? +i : i;
                    h[item[0]](j);
                    listBox.childNodes[index].style.backgroundColor = "chocolate";
                    listBox.childNodes[index].style.color = "white";
                    listBox.childNodes[index + 1].style.backgroundColor = "white";
                    listBox.childNodes[index + 1].style.color = "chocolate";
                }, item[1], t);
            });
            ini.delay(function () {
                listBox.childNodes[cmd.length].style.backgroundColor = "chocolate";
                listBox.childNodes[cmd.length].style.color = "white";
            }, "", t);
        }

    };
    this.move = function (deg, i) {
        switch (deg) {
            case 0:
                (cube.y + i) > amount ? console.log("the movement is apparently out of range") : checkWall(cube.y + i, 0);
                break;
            case 90:
                (cube.x - i) < 1 ? console.log("the movement is apparently out of range") : checkWall(cube.x - i, 1);
                break;
            case 180:
                (cube.y - i) < 1 ? console.log("the movement is apparently out of range") : checkWall(cube.y - i, 0);
                break;
            case 270:
                (cube.x + i) > amount ? console.log("the movement is apparently out of range") : checkWall(cube.x + i, 1);
                break;
        }
    };

    function checkWall(newCoordinate, dir) {
        var oldCoordinate;
        var x;
        var y;
        var currentWall = newWall.getWall();
        if (dir) {
            x = newCoordinate;
            y = cube.y;
            oldCoordinate = cube.x;
            if (x < oldCoordinate) {
                var temp = x;
                x = oldCoordinate;
                oldCoordinate = temp;
            }
            for (var i = oldCoordinate; i < x + 1; i++) {
                if (currentWall[i + "," + y]) {
                    console.log("it seems I cannot walk into the wall, right?");
                    return;
                }
            }
            cube.x = newCoordinate;
            cube.move(cube.x, cube.y);
        } else {
            x = cube.x;
            y = newCoordinate;
            oldCoordinate = cube.y;
            if (y < oldCoordinate) {
                temp = y;
                y = oldCoordinate;
                oldCoordinate = temp;
            }
            for (i = oldCoordinate; i < y + 1; i++) {
                if (currentWall[x + "," + i]) {
                    console.log("it seems I cannot walk into the wall, right?");
                    return;
                }
            }
            cube.y = newCoordinate;
            cube.move(cube.x, cube.y);
        }
    }

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

    window.ini = delay(function () {
    }, "", 0);
}
var inst = document.getElementById("instruction");
var listBox = document.getElementById("listBox");
var amount = +document.getElementById("size").value;
var table = document.getElementById("box");
window.h = new Handler();
tableGenerator(amount);
newCube(amount);