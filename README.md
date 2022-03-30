# Interval-Center

> 简单的定时器任务管理中心，具备切后台自动暂停，切回自动重启功能

## 安装

- es module
- npm install
- cdn iife

```bash
npm i -S interval-center
```

## api

| api name | 参数                                                        | 描述                 |
| -------- | ----------------------------------------------------------- | -------------------- |
| add      | （task,time）task:任务 time：延迟时间                       | 添加一个定时任务     |
| start    | （immediately=false）immediately：是否立即执行              | 开始执行定时器       |
| remove   | （task）task：任务                                          | 移除具体某个定时任务 |
| stop     | （force=false）force：强力暂停，页面从后台切回也不会restart | 是否暂定所有定时任务 |
| clear    | （）                                                        | 清空所有定时任务监听 |



## 使用

```javascript
        const ic = new IntervalCenter();

        ic.add(sayHello, 1000).start(true)

        function sayHello() {
            document.body.querySelectorAll('*').length;
            console.log("hello friend");
            const helloText = document.createElement('p');
            helloText.style.textAlign = 'center'
            helloText.innerText = `hello friend ${Date.now()}`
            document.body.append(helloText)
            // ic.stop(true)
        }
```
细节异步[demo](./demo)代码