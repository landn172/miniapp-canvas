export default class Task {
  constructor(private tasks: any[] = []) {}

  addTask(task: () => any, ctx: any = null) {
    this.tasks.push([task, ctx]);
  }

  runTask() {
    while (this.tasks.length) {
      const [task, ctx] = this.tasks.shift();
      task.call(ctx);
    }
  }

  clear() {
    this.tasks.length = 0;
  }
}

export function TimeoutTask(task: Promise<any>, timeout = 100) {
  return new Promise(resolve => {
    task.then(resolve);
    setTimeout(resolve, timeout);
  });
}
