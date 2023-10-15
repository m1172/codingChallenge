import { TestBed } from '@angular/core/testing';
import { RunBotService } from './run-bot.service';

describe('RunBotService', () => {
  let service: RunBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify subscribers when triggerRunBot is called', (done: DoneFn) => {
    // Subscribe to the runBot$ observable
    service.runBot$.subscribe(() => {
      // This callback should be executed when triggerRunBot is called
      done(); // Call the done function to signify the end of the asynchronous test
    });

    // Trigger the event
    service.triggerRunBot();
  });
});
