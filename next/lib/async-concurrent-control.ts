export class AsyncConcurrentControl {
  private concurrentLimit: number
  private currentRunning = 0
  private queue: (() => Promise<any>)[] = []

  constructor(concurrentLimit: number = 5) {
    this.concurrentLimit = concurrentLimit
  }

  addTask(task: () => Promise<any>) {
    this.queue.push(task)
    this.run()
  }

  private async run() {
    if (
      this.currentRunning >= this.concurrentLimit ||
      this.queue.length === 0
    ) {
      return
    }
    this.currentRunning++
    const task = this.queue.shift()
    try {
      await task?.()
    } catch (error) {
      console.error('Task execution failed:', error)
      throw error
    } finally {
      this.currentRunning--
      this.run()
    }
  }
}
