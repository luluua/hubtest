window.onload = function () {

    //先让浏览器内容全部加载出来window.onload
    //1.添加任务--->回车上传-->标注时间-->放到todolist后面


    let newTaskInput = document.querySelector('.new-task input');
    let todoList = document.querySelector('.todo-list');
    let doneList = document.querySelector('.done-list');
    let template = document.querySelector('.todo-template');

    // 从 localStorage 加载任务
    loadTasks();

    // 添加任务：回车上传
    newTaskInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            let newTaskText = newTaskInput.value.trim();

            if (newTaskText) {//输入内容非空
                let newTaskContainer = template.cloneNode(true);//深拷贝内容，不改变
                //获取对象
                let newTaskNode = newTaskContainer.querySelector('.todo-item');
                //修改内容
                newTaskNode.querySelector('.todo-text').innerText = newTaskText;
                // 添加任务时间
                let taskTime = new Date().toLocaleString();
                //new Date()：建一个新的 Date 对象，表示当前的日期和时间。
                //toLocaleString()：将 Date 对象格式化为本地日期和时间字符串
                newTaskNode.querySelector('.todo-time').innerText = taskTime;
                todoList.appendChild(newTaskNode);//添加到todoList的后面，初始时，只有盒子没有数据
                newTaskInput.value = '';//输入框置空


                // 保存任务到 localStorage
                saveTasks();
            }
        }
    });

    // 2.标记任务为完成


    todoList.addEventListener('click', function (event) {
        if (event.target.classList.contains('todo-icon')) {
            let todoItem = event.target.parentElement;
            let todoText = todoItem.querySelector('.todo-text');
            //删除线
            todoText.style.textDecoration = 'line-through';
            doneList.appendChild(todoItem);
            // event.target.setAttribute('src', '完成.png');
            event.target.src = '完成.png'

            // 更新任务状态并保存
            saveTasks();
        }
    });

    // 3.收藏任务
    todoList.addEventListener('click', function (event) {
        if (event.target.classList.contains('star-icon')) {
            let starIcon = event.target;
            if (starIcon.getAttribute('src') === '../todolist/未收藏.png') {
                starIcon.setAttribute('src', '../todolist/收藏.png');
            } else {
                starIcon.setAttribute('src', '../todolist/未收藏.png');
            }
            // 保存任务状态
            saveTasks();
        }
    });

    // 4.删除任务
    todoList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-icon')) {
            let todoItem = event.target.parentElement;

            todoItem.remove();//直接删除对象元素内容

            // 保存任务状态
            saveTasks();
        }
    });

    // 对已完成的任务进行同样的操作
    //将已完成状态改为未完成
    doneList.addEventListener('click', function (event) {
        if (event.target.classList.contains('todo-icon')) {
            let todoItem = event.target.parentElement;
            let todoText = todoItem.querySelector('.todo-text');
            todoText.style.textDecoration = 'none';
            todoList.appendChild(todoItem);
            event.target.setAttribute('src', '未完成.png');
            // 保存任务状态
            saveTasks();
        }

        if (event.target.classList.contains('star-icon')) {
            let starIcon = event.target;
            if (starIcon.getAttribute('src') === '../todolist/未收藏.png') {
                starIcon.setAttribute('src', '../todolist/收藏.png');
            } else {
                starIcon.setAttribute('src', '../todolist/未收藏.png');
            }
            // 保存任务状态
            saveTasks();
        }

        if (event.target.classList.contains('delete-icon')) {
            let todoItem = event.target.parentElement;
            todoItem.remove();
            // 保存任务状态
            saveTasks();
        }
    });

    // 5.保存任务到 localStorage
    function saveTasks() {
        let tasks = [];
        // 获取待办任务
        document.querySelectorAll('.todo-list .todo-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.todo-text').innerText,
                time: item.querySelector('.todo-time').innerText,
                completed: false,
                starred: item.querySelector('.star-icon').getAttribute('src') === '../todolist/收藏.png'
            });
        });
        // 获取已完成任务
        document.querySelectorAll('.done-list .todo-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.todo-text').innerText,
                time: item.querySelector('.todo-time').innerText,
                completed: true,
                starred: item.querySelector('.star-icon').getAttribute('src') === '../todolist/收藏.png'
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        //将 JavaScript 对象或数组转换为 JSON 格式字符串的方法
    }

    // 从 localStorage 加载任务
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];//获取翻译后的对象
        tasks.forEach(task => {
            let newTaskContainer = template.cloneNode(true);
            let newTaskNode = newTaskContainer.querySelector('.todo-item');
            newTaskNode.querySelector('.todo-text').innerText = task.text;
            newTaskNode.querySelector('.todo-time').innerText = task.time;
            if (task.starred) {
                newTaskNode.querySelector('.star-icon').setAttribute('src', '../todolist/收藏.png');
            }
            if (task.completed) {
                newTaskNode.querySelector('.todo-text').style.textDecoration = 'line-through';
                newTaskNode.querySelector('.todo-icon').setAttribute('src', '完成.png');
                doneList.appendChild(newTaskNode);
            } else {
                todoList.appendChild(newTaskNode);
            }
        });
    }
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            const todoItem = event.target.closest('.todo-item');//第一个元素
            if (todoItem) {
                todoItem.remove(); // 移除任务项
                saveTasks(); // 更新本地存储
            }
        }
    });
};