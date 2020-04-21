/* eslint-disable no-magic-numbers */
'use strict';

// Кнопка очиски local storage
document.querySelector('#clear').addEventListener('click', () => {
    const confirmed = confirm('All data will be cleared. Are you sure you want it?');
    if (confirmed) {
        localStorage.clear();
        location.reload();
    }
});

// Кнопка показывает задание
document.querySelector('#help').addEventListener('click', () => {
    alert(`
    Вам нужно создать список задач, который умеет:

    добавлять новые задачи и проверять их уникальность.

    У каждой задачи есть статус,
    время создания название и текст

    удалять задачу, но с условием
    (тут передаете в качестве аргумента confirm)
    редактировать задачу (тоже спрашиваете
    нужно ли сохранить изменения)

    выводить общее количество задач,
    сколько выполнили и сколько осталось

    Данные должны сохраняться при обновлении страницы

  `);
});

// Кнопка показывает форму, в которой можно зарегистрировать задачу
document.querySelector('#new_task_button').addEventListener('click', () => {

    document.querySelector('.new-task-form').hidden = false;
    document.querySelector('input.task_title_name').focus();
});


const TaskList = function($form, $container, template) {
    this.$form = $form;
    this.$container = $container;
    this.template = template;
    this.tasks = [];
};

TaskList.prototype.updateFooterInfo = function() {
    document.querySelector('.completed').textContent = this.tasks.reduce((acc, t) => acc + (t.done === true), 0);
    document.querySelector('.total').textContent = this.tasks.reduce((acc) => acc + 1, 0);
    document.querySelector('.remaining').textContent = this.tasks.reduce((acc, t) => acc + (t.done === false), 0);
};

TaskList.prototype.save = function() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
};

TaskList.prototype.render = function() {
    this.$container.innerHTML = '';

    this.tasks.forEach(task => {
        this.$container.insertAdjacentHTML(
            'afterbegin',
            this.template(task)
        );
    });

    this.updateFooterInfo();
};

TaskList.prototype.append = function(title, description) {
    // eslint-disable-next-line no-undef
    const date = moment();
    const task = {
        title: title,
        description: description,
        done: false,
        collapsed: description ? false : true,
        id: date.format('x'),
        date: date.format('DD-MM-YYYY HH:MM')
    };
    this.tasks.unshift(task);

    this.save();
    this.render();
};

TaskList.prototype.init = function() {
    // // If there are any tasks - get them and render them
    if (localStorage.getItem('tasks')) {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
        this.render();
    }

    // события для формы новой задачи
    this.$form.addEventListener ('click', e => {
        e.preventDefault();
        // Если нажали не на кнопку - игнорируем
        if (!e.target.classList.contains('button')) return;

        // Кнопка сохранения
        if (e.target.name === 'save') {
            const title = this.$form.querySelector('.task_title_name').value;
            const description = this.$form.querySelector('.task_description').value;

            if (!title) {
                alert('Введите название задачи');
                return;
            }

            this.append(title, description);

        // Кнопка отмены
        } else if (e.target.name === 'cancel') {
            this.$form.toggleAttribute('hidden');
        }

        this.$form.reset();
    });

    // события для кнопок существующей задачи
    this.$container.addEventListener( 'click', e => {
        if (!e.target.classList.contains('button')) return;

        const dataAction = e.target.dataset.action;
        const $task = e.target.closest('.task');
        const task = this.tasks.find(taskObj => taskObj.id === $task.id);

        switch (dataAction) {
        case 'collapse':
            task.collapsed = !task.collapsed;
            break;

        case 'edit':
            $task.innerHTML = `
            <div class="task">
            <div class="task_title">
                <input type="text" class="task_title_name" value="${task.title}">
                <div class="task-buttons">
                    <button class="button task_button" data-action="save">Save</button>
                    <button class="button task_button" data-action="cancel">Cancel</button>
                </div>
            </div>
            <input type="text" class="task_description" value="${task.description}">
            </div>  
            `;

            $task.querySelector('.task_title_name').focus();

            $task.querySelector('.task-buttons').addEventListener ('click', event => {

                if (event.target.dataset.action === 'save') {
                    const confirmed = confirm('Are you sure?');
                    if (confirmed) {
                        task.title = $task.querySelector('.task_title_name').value;
                        task.description = $task.querySelector('.task_description').value;
                    }
                }

                if (!event.target.dataset.action === 'cancel') return;
            });
            break;

        case 'done':
            task.done = true;
            $task.querySelector('[data-action="done"]').disabled = true;
            $task.querySelector('[data-action="edit"]').disabled = true;
            break;

        case 'remove':
            if ( confirm('Are you sure, you want to remove this item?') ) {
                this.tasks.splice(this.tasks.indexOf(task), 1);
            }
            break;
        }

        this.save();

        if (!(dataAction === 'edit')) {
            this.render();
        }
    });
};


const taskListExample = new TaskList(
    document.querySelector('.new-task-form'),
    document.querySelector('.task-container'),
    task => `
        <div class="task ${task.done && 'done'}" id="${task.id}">
            <div class="task_title">
                <h3 class="task_title_name">${task.title}</h3>
                <div class="task-buttons">
                    <div class="time">${task.date}</div>
                    <button class="button task_button" ${task.done && 'disabled'} data-action="edit">Edit</button>
                    <button class="button task_button" data-action="remove">Remove</button>
                    <button class="button task_button" data-action="collapse">Collapse</button>
                    <button class="button task_button" ${task.done && 'disabled'} data-action="done">Done</button>
                </div>
            </div>
            <p class="task_description" ${task.collapsed && 'hidden'}>${task.description}</p>
        </div>
    `
);

taskListExample.init();