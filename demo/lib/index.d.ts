export declare type Task = (...args: unknown[]) => unknown;
export default class IntervalCenter {
    private taskMap;
    /**
     * 页面可见性监听事件
     */
    private events;
    started: boolean;
    /**
     * 强力暂停
     */
    forceStoped: boolean;
    constructor();
    private createInterval;
    /**
     * 添加一个定时任务
     * @param task 任务
     * @param time 定时时长
     * @returns this
     */
    add(task: Task, time: number): this;
    /**
     * 开始执行定时器
     * @param immediately 是否立即执行一次
     */
    start(immediately?: boolean): void;
    /**
     * 移除具体某个定时任务
     * @param task
     */
    remove(task: Task): void;
    /**
     * 是否暂定所有定时任务
     * @param force 强力暂停，页面从后台切回也不会restart
     */
    stop(force?: boolean): void;
    /**
     * 清空所有定时任务监听
     */
    clear(): void;
    private pause;
    private pauseAll;
    private hanleVisible;
    private autoReleaseAndReset;
    removeEvents(): void;
}
