import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RunBotService {
  private runBotSubject = new Subject<void>();

  runBot$ = this.runBotSubject.asObservable();

  triggerRunBot() {
    this.runBotSubject.next();
  }
}
