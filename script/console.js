

const consoles = [];

function CreateConsole(elems) {
  for (let i = 0; i < elems.length; i++) {
    const node = elems[i];
    const screen = document.createElement("div");
    screen.classList.add("screen");
    consoles.push(node);
    node.appendChild(screen);
  }
}

function Select(name){
  let ret;
  if(name.startsWith(".")){
    ret = document.getElementsByClassName(name.slice(1));
  } else {
    ret = document.querySelectorAll(name);
  }
  return ret;
}

function Loop() {
  window.requestAnimationFrame(Loop);
  consoles.forEach(node => {
    const width = node.clientWidth - (node.clientWidth % 20);
    const height = node.clientHeight - (node.clientHeight % 20);
    node.childNodes[0].style.width = `${width}px`;
    node.childNodes[0].style.height = `${height}px`;
  });
}
window.requestAnimationFrame(Loop);