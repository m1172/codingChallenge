import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent, TaskType } from './app.component';
import { RunBotService } from './run-bot.service';
import { Subject } from 'rxjs';
import { BelowPopupComponent } from './below-popup/below-popup.component';
import { FormsModule } from '@angular/forms';

class MockRunBotService {
  runBot$ = new Subject<void>();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRunBotService: MockRunBotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, BelowPopupComponent],
      imports: [FormsModule],
      providers: [{ provide: RunBotService, useClass: MockRunBotService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockRunBotService = TestBed.inject(
      RunBotService
    ) as unknown as MockRunBotService;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'coding-challenge-v2'`, () => {
    expect(component.title).toEqual('coding-challenge-v2');
  });

  it('should render title in h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.todo-title').textContent).toContain(
      'Your tasks'
    );
  });

  it('should count tasks with border style', () => {
    component.inputTasks[0].borderStyle = '2px solid #7BE78C';
    component.tasks[0].borderStyle = '2px solid #7BE78C';
    component.tasks[1].borderStyle = '2px solid #7BE78C';
    expect(component.countTasksWithBorderStyle(TaskType.INPUT_TASK)).toBe(1);
    expect(component.countTasksWithBorderStyle(TaskType.TASK)).toBe(2);
  });

  it('should add a new task', () => {
    const initialTasksCount = component.tasks.length;
    component.addTask('Test task');
    expect(component.tasks.length).toBe(initialTasksCount + 1);
  });

  it('should delete a task', () => {
    const initialTasksCount = component.tasks.length;
    component.deleteTask(component.tasks[0]);
    expect(component.tasks.length).toBe(initialTasksCount - 1);
  });

  it('should update parent selected status', () => {
    component.updateParentSelectedStatus(true);
    expect(component.parentSelected).toBeTrue();
  });

  it('should handle run bot action', () => {
    component.childElementsClicked.push('inputTaskButton');

    component.inputTasks[0].childBorder = '2px solid #7BE78C';

    mockRunBotService.runBot$.next();
    fixture.detectChanges();
    expect(component.tasks.length).toBe(5);
  });
});
