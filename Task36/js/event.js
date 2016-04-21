(function et() {
    var tableCubes = table.getElementsByTagName("td");
    var tableCubesArray = Array.prototype.slice.call(tableCubes, 0);
    var tunlef = document.getElementById("turnLeft");
    var tunrig = document.getElementById("turnRight");
    var tunbac = document.getElementById("turnBack");
    var movlef = document.getElementById("moveLeft");
    var movrig = document.getElementById("moveRight");
    var movtop = document.getElementById("moveUp");
    var movbot = document.getElementById("moveDown");
    var tralef = document.getElementById("travelLeft");
    var trarig = document.getElementById("travelRight");
    var tratop = document.getElementById("travelUp");
    var trabot = document.getElementById("travelDown");
    var go = document.getElementById("go");
    var refresh = document.getElementById("refresh");
    var execute = document.getElementById("execute");
    var size = document.getElementById("size");
    var buildWall=document.getElementById("buildWall");
    var randomWall=document.getElementById("randomWall");
    var brushColor=document.getElementById("brushColor");

    tableCubesArray = tableCubesArray.filter(function (item) {
        return (item.getAttribute("data-type") === "cube");
    });

    table.addEventListener("click", function (ev) {
        if (ev.target.nodeName.toLowerCase() === "td") {
            var index = tableCubesArray.indexOf(ev.target);
            if (index + 1) {
                cube.x = index % amount + 1;
                cube.y = Math.floor(index / amount) + 1;
                cube.move(cube.x, cube.y);
            }
        }
    }, false);

    tunlef.onclick = h.tunlef;
    tunrig.onclick = h.tunrig;
    tunbac.onclick = h.tunbac;

    go.onclick = function () {
        h.go(1);
    };
    movlef.onclick = function () {
        h.movlef(1)
    };
    movrig.onclick = function () {
        h.movrig(1);
    };
    movtop.onclick = function () {
        h.movtop(1);
    };
    movbot.onclick = function () {
        h.movbot(1);
    };
    tralef.onclick = function () {
        h.tralef(1);
    };
    trarig.onclick = function () {
        h.trarig(1);
    };
    tratop.onclick = function () {
        h.tratop(1);
    };
    trabot.onclick = function () {
        h.trabot(1);
    };
    refresh.onclick = cube.reset;
    size.onchange = function () {
        amount = +this.value;
        tableGenerator(amount);
        newCube(amount);
        et();
        newWall=null;
        newWall=wall();
    };
    execute.onclick = h.execute;
    buildWall.onclick=h.build;
    randomWall.onclick=h.randomWall;
    brushColor.onclick=function () {
        h.bru("red");
    }
})();