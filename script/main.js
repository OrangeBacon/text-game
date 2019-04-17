const state = {};

function initialise() {
  state.screen = new DOMConsole(document.getElementsByClassName("console")[0]);
  state.screen.textSize = 14;

  requestAnimationFrame(main);
}

function main() {
  requestAnimationFrame(main);
  state.screen.render();
  state.screen.writeArray(new Array(state.screen.lines).fill(new Array(state.screen.columns).fill('.')));
}