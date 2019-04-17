class DOMConsole {
  constructor(elem) {
    this.node = elem;
    this.screen = document.createElement("div");
    this.screen.classList.add("screen");
    this.node.appendChild(this.screen);
  }

  render() {
    const width = this.node.clientWidth - (this.node.clientWidth % 20);
    const height = this.node.clientHeight - (this.node.clientHeight % 20);
    this.node.childNodes[0].style.width = `${width}px`;
    this.node.childNodes[0].style.height = `${height}px`;
  }
}