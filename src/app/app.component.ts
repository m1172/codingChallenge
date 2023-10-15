import { Component } from '@angular/core';
import { RunBotService } from './run-bot.service';

export enum TaskType {
  INPUT_TASK = 'form',
  TASK = 'li',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'coding-challenge-v2';

  parentSelected: boolean = false;

  TaskType = TaskType;

  nextId = 12;

  constructor(private runBotService: RunBotService) {
    this.runBotService.runBot$.subscribe(() => {
      this.onRunBot();
    });
  }

  inputTasks = [
    {
      id: 1,
      title: 'New task 1',
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 2,
      title: 'New task 2',
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 3,
      title: 'New task 3',
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
  ];

  tasks = [
    {
      id: 4,
      title: 'task 1',
      completed: false,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 5,
      title: 'task 2',
      completed: false,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 6,
      title: 'task 3',
      completed: false,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 7,
      title: 'task 4',
      completed: false,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
  ];

  completedTasks = [
    {
      id: 8,
      title: 'task 5',
      completed: true,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 9,
      title: 'task 6',
      completed: true,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 10,
      title: 'task 7',
      completed: true,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
    {
      id: 11,
      title: 'task 8',
      completed: true,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    },
  ];

  selectedForms: any[] = [];
  selectedLis: any[] = [];
  childElementsClicked: string[] = [];

  countTasksWithBorderStyle(type: TaskType): number {
    if (!this.parentSelected) {
      const taskArray =
        type === TaskType.INPUT_TASK ? this.inputTasks : this.tasks;
      return taskArray.filter((task) => task.borderStyle !== '').length;
    } else {
      const taskArray =
        type === TaskType.INPUT_TASK ? this.inputTasks : this.tasks;
      return taskArray.filter((task) => task.childBorder !== '').length;
    }
  }

  addTask(description: string) {
    if (!this.parentSelected) {
      this.tasks.push({
        id: this.nextId++,
        title: description,
        completed: false,
        borderStyle: '',
        childBorder: '',
        childElement: '',
      });
    }
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  trackSelection(task: any, type: TaskType) {
    if (!this.parentSelected) {
      const selectedTasks = this.getSelectedTasks(type);

      const isSelected = selectedTasks.find((t) => t.id === task.id);

      if (isSelected) {
        this.deselectElement(task);
        const index = selectedTasks.indexOf(isSelected);
        selectedTasks.splice(index, 1);
      } else {
        this.selectElement(task);
        selectedTasks.push(task);
      }

      if (selectedTasks.length >= 2) {
        this.predictAndHighlight(type);
        selectedTasks.length = 0;
      }
    }
  }

  getSelectedTasks(type: TaskType): any[] {
    return type === TaskType.INPUT_TASK ? this.selectedForms : this.selectedLis;
  }

  predictAndHighlight(type: 'form' | 'li') {
    const allTasks = type === 'form' ? this.inputTasks : this.tasks;
    const selectedArray =
      type === 'form' ? this.selectedForms : this.selectedLis;

    allTasks.forEach((task) => {
      if (!selectedArray.some((t) => t.id === task.id)) {
        this.selectElement(task, '#2A25FF');
      }
    });
  }

  trackChildSelection(
    elementType: 'inputTaskButton' | 'taskDeleteButton' | 'taskCheckbox',
    task: any
  ) {
    if (this.parentSelected) {
      if (!this.childElementsClicked.includes(elementType)) {
        this.childElementsClicked.push(elementType);
      }

      const selectedChildren = this.getSelectedChildren(elementType);

      const isSelected = selectedChildren.find((t) => t.id === task.id);

      if (isSelected) {
        this.deselectElement(task, true);
        const index = selectedChildren.indexOf(isSelected);
        selectedChildren.splice(index, 1);
      } else {
        this.selectElement(task, '#7BE78C', true);
        selectedChildren.push(task);
      }

      if (selectedChildren.length >= 2) {
        this.predictAndHighlightChildren(elementType);
        selectedChildren.length = 0;
      }
    }
  }

  getSelectedChildren(
    elementType: 'inputTaskButton' | 'taskDeleteButton' | 'taskCheckbox'
  ): any[] {
    const childMap: Record<
      'inputTaskButton' | 'taskDeleteButton' | 'taskCheckbox',
      any[]
    > = {
      inputTaskButton: this.selectedForms,
      taskDeleteButton: this.selectedLis,
      taskCheckbox: this.selectedLis,
    };

    return childMap[elementType] || [];
  }

  predictAndHighlightChildren(elementType: string) {
    let tasks: any[] = [];

    switch (elementType) {
      case 'inputTaskButton':
        tasks = this.inputTasks;
        break;
      case 'taskDeleteButton':
        tasks = this.tasks;
        break;
      case 'taskCheckbox':
        tasks = this.tasks;
        break;
    }

    tasks.forEach((task) => {
      if (task.childBorder !== '2px solid #7BE78C') {
        // don't overwrite already selected elements
        task.childBorder = '2px solid #2A25FF';
      }
    });
  }

  selectElement(
    task: any,
    color: string = '#7BE78C',
    isChild: boolean = false
  ) {
    if (isChild) {
      task.childBorder = `2px solid ${color}`;
    } else {
      task.borderStyle = `2px solid ${color}`;
    }
  }

  deselectElement(task: any, isChild: boolean = false) {
    if (isChild) {
      task.childBorder = '';
    } else {
      task.borderStyle = '';
    }
  }

  updateParentSelectedStatus(status: boolean) {
    this.parentSelected = status;
  }

  onRunBot() {
    this.parentSelected = false;

    if (this.childElementsClicked.includes('inputTaskButton')) {
      const tasksToAdd = this.inputTasks.filter(
        (task) => task.childBorder !== ''
      );
      console.log(tasksToAdd);

      tasksToAdd.forEach((inputTask) => {
        if (inputTask.title) {
          this.addTask(inputTask.title);
        }
      });
    }

    if (this.childElementsClicked.includes('taskCheckbox')) {
      const tasksToComplete = this.tasks.filter(
        (task) => task.childBorder !== ''
      );

      tasksToComplete.forEach((task) => {
        task.completed = true;
      });
    }

    this.childElementsClicked = [];
    this.selectedForms = [];
    this.selectedLis = [];
  }
}
