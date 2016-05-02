function findPath(endIndex) {
    var startIndex = cube.x - 1 + (cube.y - 1) * amount;
    var f = [];
    var open = [];
    var close = [];
    var impasse = [];
    var barriers = [];
    var currentWall = newWall.getWall();
    for (var item in currentWall) {
        if (currentWall.hasOwnProperty(item)) {
            var cor = item.split(",");
            barriers.push(cor[0] - 1 + (cor[1] - 1) * amount);
        }
    }
    var xe = endIndex % amount;
    var ye = Math.floor(endIndex / amount);
    for (var i = 0; i < amount * amount; i++) {
        f[i] = (Math.abs(i % amount - xe) + Math.abs(Math.floor(i / amount) - ye));
    }
    open.push(startIndex);
    function find() {
        open.sort(compare);
        var i = open.shift();
        if (i === endIndex) {
            return;
        }
        open = [];
        if (i !== undefined) {
            close.push(i);
        } else {
            i = close.pop();
            if (i === startIndex) {
                console.log("no way found");
                return;
            } else {
                impasse.push(i);
            }
        }
        var arr = [i - amount, i + amount, i - 1, i + 1];
        arr = arr.filter(function (item, index) {
            return (item > -1 && item < amount * amount && !(index === 2 && item % amount === amount - 1) && !(index === 3 && item % amount === 0))
        });
        for (var j = 0; j < arr.length; j++) {
            if (barriers.indexOf(arr[j]) === -1 && close.indexOf(arr[j]) === -1 && impasse.indexOf(arr[j]) === -1) {
                (function (a) {
                    open.push(a);
                })(arr[j]);
            }
        }
        find();
    }

    function compare(o1, o2) {
        var v1 = +f[o1];
        var v2 = +f[o2];
        return v1 - v2;
    }

    find();
    if(close.length>1){
        close.shift();
        close.push(endIndex);
        return close;
    }
}