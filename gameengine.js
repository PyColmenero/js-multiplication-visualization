//medidadas de la pantalla
const w = window.innerWidth - 32;
const h = window.innerHeight - 32;

const PHONE = 0;
const COMPUTER = 1;
var DEVICE;

var canvas = document.getElementsByClassName('canvas')[0];
var context = canvas.getContext('2d');

var numberOfSides = 50;
var Xcenter = (w / 2)
var Ycenter = (h / 2);
var size = (Math.min(h, w) / 2) - 32;
var axes = [];

window.onload = function() {

    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)

    DEVICE = (window.screen.width > window.screen.height) ? COMPUTER : PHONE

    //arrancar
    run();

};

function run() {

    context.fillStyle = "#101010";
    context.fillRect(0, 0, w, h);

    context.fillStyle = "#fff";
    context.fillRect(Xcenter, Ycenter, 2, 2);

    draw_cirle();

    var max_axes = 180;
    axes = get_axes(max_axes);

    draw_array_numbers(axes);

    var by = 2.5;
    const SQRT = 0;
    const MUL = 1;
    const DIV = 2;
    const SUM = 3;
    var mode = MUL;

    setInterval(function() {

        context.fillStyle = "#101010";
        context.fillRect(0, 0, w, h);

        context.fillStyle = "#ff3035";
        context.font = "64px Impact";
        context.fillText("[AS]", Xcenter - 50, Ycenter + 22);

        context.fillStyle = "#fff";
        context.moveTo(axes[0][0], axes[0][1]);
        context.beginPath();
        for (let y = 1; y < max_axes; y++) {

            // console.log(Math.sqrt(y));
            context.lineTo(axes[y][0], axes[y][1]);
            if (mode == SQRT) context.lineTo(axes[parseInt((Math.sqrt(y)) % max_axes)][0], axes[parseInt((Math.sqrt(y)) % max_axes)][1]);
            if (mode == MUL) context.lineTo(axes[parseInt((y * by) % max_axes)][0], axes[parseInt((y * by) % max_axes)][1]);
            if (mode == SUM) context.lineTo(axes[parseInt((y + by) % max_axes)][0], axes[parseInt((y + by) % max_axes)][1]);
            if (mode == DIV) context.lineTo(axes[parseInt((y / by) % max_axes)][0], axes[parseInt((y / by) % max_axes)][1]);

        }
        context.strokeStyle = "#fff";
        context.lineWidth = 1;
        context.stroke();

        by -= .02;
        console.log("TABLA DEL " + by.toFixed(2));
        draw_cirle();
        draw_array_numbers(axes);
    }, 100)


}

function get_axes(array_sides) {
    let axes = [
        [Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0)]
    ];
    for (var i = 1; i <= array_sides; i += 1) {
        axes.push([Xcenter + size * Math.cos(i * 2 * Math.PI / array_sides), Ycenter + size * Math.sin(i * 2 * Math.PI / array_sides)]);
    }
    return axes;
}

function draw_array(arr) {
    context.beginPath();
    context.moveTo(arr[0][0], arr[0][1]);
    for (var x = 1; x < arr.length; x++) {
        context.lineTo(arr[x][0], arr[x][1]);
    }
    context.strokeStyle = "#fff";
    context.lineWidth = 1;
    context.stroke();
}

function draw_cirle() {
    context.beginPath();
    context.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
    for (var i = 1; i < numberOfSides + 1; i++) {
        context.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    context.strokeStyle = "#fff";
    context.lineWidth = 1;
    context.stroke();
}

function draw_array_numbers(arr) {
    context.font = "14px Impact";
    for (var x = 0; x < arr.length - 1; x += 5) {
        context.fillText(x, arr[x][0], arr[x][1]);
    }
}