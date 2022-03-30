
export type Task = (...args: unknown[]) => unknown;
export default class IntervalCenter {
    private taskMap: Map<number, Task> = new Map();
    /**
     * 页面可见性监听事件
     */
    private events: unknown;
    started = false;
    /**
     * 强力暂停
     */
    forceStoped = false

    constructor() {
        this.events = this.hanleVisible.bind(this);
        this.autoReleaseAndReset(this.events);
    }

    private createInterval(func: Task, time: number) {
        let id = setTimeout(async function fn() {
            // @ts-ignore
            clearTimeout(func.timerId);
            // @ts-ignore
            if (!func.paused) {
                await func();
            }
            id = setTimeout(fn, time);
            // @ts-ignore
            func.timerId = id;
        }, time);
        // @ts-ignore
        func.timerId = id;
    }

    /**
     * 添加一个定时任务
     * @param task 任务
     * @param time 定时时长
     * @returns this
     */
    add(task: Task, time: number) {
        const uuid = Date.now();
        // @ts-ignore
        task.time = time;
        // @ts-ignore
        task.uuid = uuid;

        this.taskMap.set(uuid, task);
        return this;
    }

    /**
     * 开始执行定时器
     * @param immediately 是否立即执行一次 
     */
    start(immediately = false) {
        this.started = true;
        this.taskMap.forEach(async task => {
            if (immediately) {
                await task()
                // @ts-ignore
            } else {
                // @ts-ignore
                task.paused = false;
            }
            // @ts-ignore
            this.createInterval(task, task.time);
        });
    }
    /**
     * 移除具体某个定时任务
     * @param task 
     */
    remove(task: Task) {
        // @ts-ignore
        task.paused = true;
        // @ts-ignore
        const timerId = task.timerId;
        window.clearTimeout(timerId);
        // @ts-ignore
        this.taskMap.delete(task.uuid);
    }
    /**
     * 是否暂定所有定时任务
     * @param force 强力暂停，页面从后台切回也不会restart
     */
    stop(force = false) {
        this.started = false;
        this.forceStoped = force;
        this.pauseAll();
    }

    /**
     * 清空所有定时任务监听
     */
    clear() {
        this.taskMap.forEach((task) => this.remove(task));
    }

    private pause(func: Task) {
        // @ts-ignore
        func.paused = true;
    }

    private pauseAll() {
        this.taskMap.forEach(func => this.pause(func));
    }

    private hanleVisible() {
        if (document.visibilityState === 'hidden') {
            console.info('auto pause all interval');
            this.pauseAll();
        } else {
            console.info('auto restart all interval');
            if (!this.forceStoped) {
                this.start();
            }
        }
    }

    private autoReleaseAndReset(events: any) {
        document.addEventListener('visibilitychange', events, false);
    }

    removeEvents() {
        if (this.events) {
            // @ts-ignore
            document.removeEventListener('visibilitychange', this.events);
        }
    }
}
