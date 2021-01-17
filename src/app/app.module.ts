import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Schedule } from './components/schedule/schedule.component';
import { Modal } from './components/modal/modal.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ Schedule, Modal ],
  bootstrap:    [ Schedule, Modal ]
})
export class AppModule {}
