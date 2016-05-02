function wall() {
    var walls = {};
    var sz = 600 / amount;
    var self;
    self = {
        build: function (x, y) {
            if (!walls[x + "," + y]) {
                walls[x + "," + y] = document.createElement("div");
                walls[x + "," + y].setAttribute("style", "box-sizing: border-box;z-index:-1;background-color:gray;position:absolute;transition:all 0.6s;width:" + sz + "px;height:" + sz + "px;top:" + (y * sz) + "px;left:" + (x * sz) + "px;");
                walls[x + "," + y].className="walls";
                table.appendChild(walls[x + "," + y]);
            } else {
                var coordinates=[];
                for(var item in walls){
                    if(walls.hasOwnProperty(item)){
                        coordinates.push("("+item+")");
                    }
                }
                console.log("the wall has already existed, look the walls'positions:",coordinates);
            }
            return self;
        },
        brushColor: function (x, y, color) {
            walls[x + "," + y].style.backgroundColor = color;
        },
        getWall:function () {
            return walls;
        },
        reset:function () {
            for(var item in walls){
                if(walls.hasOwnProperty(item)){
                    table.removeChild(walls[item]);
                }
            }
            walls={};
        }
    };
    return self;
}
var newWall = wall();