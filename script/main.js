const screen = new DOMConsole(document.getElementsByClassName("console")[0]);

function main() {
    requestAnimationFrame(main);
    screen.render();
}
requestAnimationFrame(main);