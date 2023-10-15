import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionSelectorComponent } from './action-selector.component';
import { RunBotService } from 'src/app/run-bot.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ActionSelectorComponent', () => {
  let component: ActionSelectorComponent;
  let fixture: ComponentFixture<ActionSelectorComponent>;
  let mockRunBotService: jasmine.SpyObj<RunBotService>;

  beforeEach(() => {
    mockRunBotService = jasmine.createSpyObj('RunBotService', [
      'triggerRunBot',
    ]);

    TestBed.configureTestingModule({
      declarations: [ActionSelectorComponent],
      imports: [FontAwesomeModule],
      providers: [{ provide: RunBotService, useValue: mockRunBotService }],
    });

    fixture = TestBed.createComponent(ActionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger run bot service when onRunBotClick is called', () => {
    component.onRunBotClick();
    expect(mockRunBotService.triggerRunBot).toHaveBeenCalled();
  });

  it('should emit closeEvent when closeActionSelector is called', () => {
    spyOn(component.closeEvent, 'emit');
    component.closeActionSelector();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });
});
