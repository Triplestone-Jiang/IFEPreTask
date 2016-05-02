function newCube(amount) {
    function Cube() {
        window.t=50;
        var cube = document.createElement("div");
        cube.x = 1;
        cube.y = 1;
        cube.sz = 600 / amount;
        cube.setAttribute("style", "position:absolute;transition:all "+t+"ms;width:" + cube.sz + "px;height:" + cube.sz + "px");
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
        img.src = "img/head.png";
        img.style.width = cube.sz + "px";
        img.style.height = cube.sz + "px";
        cube.appendChild(img);
        table.appendChild(cube);
        return cube;
    }

    window.cube = new Cube();
    cube.move();
}
