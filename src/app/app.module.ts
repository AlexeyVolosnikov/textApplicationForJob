import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Schedule } from './components/schedule/schedule.component';
import { Cranes } from './cranes/cranes.component';
import { Modal } from './components/modal/modal.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ Schedule, Cranes, Modal],
  bootstrap:    [ Schedule ]
})
export class AppModule {}
