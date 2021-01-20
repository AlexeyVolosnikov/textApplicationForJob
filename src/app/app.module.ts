/*
* Импорт angular
* */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

/*
* Импорт компонентов
* */
import { Schedule } from './components/schedule/schedule.component';
import { Modal } from './components/modal/modal.component';
import { Cranes } from './components/cranes/cranes.component';

/*
* Импорт сервисов
* */
import { ModalsService } from './services/modals.service';
import { WorkshiftService } from './services/workshift.service';
import { DatabaseService } from './services/database.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ Schedule, Modal, Cranes],
  bootstrap:    [ Schedule ],
  providers :   [ ModalsService, WorkshiftService, DatabaseService ]
})
export class AppModule {}
