import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BelowPopupComponent } from './below-popup/below-popup.component';
import { SelectableDirective } from './below-popup/ui/selectable.directive';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionSelectorComponent } from './below-popup/feature/action-selector/action-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    BelowPopupComponent,
    SelectableDirective,
    ActionSelectorComponent,
  ],
  imports: [BrowserModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
