function newCube(amount) {
    function Cube() {
        var cube = document.createElement("div");
        cube.x = 1;
        cube.y = 1;
        cube.sz = 600 / amount;
        cube.id = "cube";
        cube.setAttribute("style", "position:absolute;transition:all 0.6s;width:" + cube.sz + "px;height:" + cube.sz + "px");
        cube.deg = 0;
        cube.move = function () {
            cube.style.left = cube.x * cube.sz + "px";
            cube.style.top = cube.y * cube.sz + "px";
        };
        cube.rotate = function () {
            cube.style.transform = "rotate(" + cube.deg + "deg)";
        };
        cube.reset=function () {
            cube.x=1;
            cube.y=1;
            cube.deg=0;
            cube.move();
            cube.rotate();
        };
        var img = document.createElement("img");
        img.src = "head.png";
        img.style.width = cube.sz + "px";
        img.style.height = cube.sz + "px";
        cube.appendChild(img);
        table.appendChild(cube);
        return cube;
    }

    window.cube = new Cube();
    cube.move();
}