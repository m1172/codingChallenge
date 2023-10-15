import { Component } from '@angular/core';

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

  countTasksWithBorderStyle(type: TaskType): number {
    const taskArray =
      type === TaskType.INPUT_TASK ? this.inputTasks : this.tasks;
    return taskArray.filter((task) => task.borderStyle !== '').length;
  }

  updateParentSelectedStatus(status: boolean) {
    console.log('updateParentSelectedStatus called with:', status);
    this.parentSelected = status;
  }

  addTask(description: string) {
    this.tasks.push({
      id: this.nextId++,
      title: description,
      completed: false,
      borderStyle: '',
      childBorder: '',
      childElement: '',
    });
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  selectElement(task: any, color: string = '#7BE78C') {
    task.borderStyle = `2px solid ${color}`;
  }
  deselectElement(task: any) {
    task.borderStyle = '';
  }

  trackSelection(task: any, type: TaskType) {
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
}
