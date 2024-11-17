class Task {
  constructor(title, text, index) {
    this.id = new Date().getTime();
    this.index = index;
    this.title = title;
    this.text = text;
  }
}

export default Task;
