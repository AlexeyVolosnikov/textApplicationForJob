import {Component} from '@angular/core';
import { ModalsService } from '../../services/modals.service';
import {DatabaseService} from '../../services/database.service';
import {IWorkshift} from '../interfaces/workshift.interface';
import {WorkshiftService} from '../../services/workshift.service';


/*
*
* Компонент таблицы смен
*
* */
@Component({
    selector : 'schedule',
    templateUrl : "./schedule.component.html",
    styleUrls : ['./schedule.component.css']
})

export class Schedule {
    /*
    *
    * Класс ответственен за расписание смен крановщиков
    *
    * */

    isModalOpen : Boolean;

    constructor(private modalsService : ModalsService, private dbService : DatabaseService, public workshiftsService : WorkshiftService) {
        this.modalsService = modalsService;
        this.dbService = dbService;
        this.workshiftsService = workshiftsService;
    }

    /*
    * Получает массив c IWorkshift'ами
    * */
    getSchedule() {
        return this.workshiftsService.getSchedule()
    }

    /*
    * Получить все погруженное количество тонн с крана (если двойной то с обоих)
    * */
    getLoadedTotal(workshift:IWorkshift):number {
        let loadedTotal   = 0
        workshift.firstCrane.info.forEach((crane)=>{
            loadedTotal += (crane.loaded !== undefined || NaN) ? crane.loaded : 0;
        })
        // если есть второй кран
        if (workshift.secondCrane !== undefined) {
            workshift.secondCrane.info.forEach((crane)=>{
                loadedTotal += (crane.loaded !== undefined || NaN) ? crane.loaded : 0;
            })
        }
        return loadedTotal;
    }

    /*
    * При создании - подписаться на сервисы
    * и добавить уже имеющиеся смены, которые есть в бд
    * */
    ngOnInit(): void {
        this.modalsService._isOpen.subscribe(isOpen => this.isModalOpen = isOpen)
        this.dbService._workshifts.subscribe(workshifts => this.workshiftsService = workshifts)
    };

    /*
    * Добавляет смену в расписание
    * */
    add(workshift: IWorkshift):void {
        this.workshiftsService.add(
            workshift.craneType,
            workshift.initials,
            workshift.start,
            workshift.end,
            workshift.firstCrane,
            workshift.secondCrane
        );
    }

    /*
    * Удаляет смену из расписания
    * */
    delete(workshift:IWorkshift):void {
        this.workshiftsService.delete(workshift);
    }

    /*
    * Открыть окно для изменения смены, передав туда
    * информацию о смене, которую нужно изменить
    * */
    edit(workshift:IWorkshift, index:number):void {
        this.modalsService.openModalForEditing(index);
        this.modalsService.init(workshift);
    }

    /*
    * Открывает модальное окно
    * */
    openNewModal():void {
        this.modalsService.openModal();
    }

}
