import {Component} from '@angular/core';
import {ModalsService} from '../../services/modals.service';
import {WorkshiftService} from '../../services/workshift.service';

/*
*
* Компонент модального окна, которое открывается для
* добавления\изменения смены в таблице смен
*
* */
@Component({
    selector : "schedule-modal",
    templateUrl : "./modal.component.html",
    styleUrls : ['./modal.component.css']
})

export class Modal {

    isModalOpen:Boolean;

    // Для подвода статистики внизу модального окна
    public totalLoaded: number;
    public totalUnloaded: number;

    constructor(private modalService : ModalsService, private workshiftsService : WorkshiftService) {
        this.modalService = modalService;
        this.workshiftsService = workshiftsService;
        this.totalLoaded = 0;
        this.totalUnloaded = 0;
    }

    /*
    * При создании - подписаться на сервис (для отслеживания и манимуляций с информацией)
    * */
    ngOnInit(): void {
        this.modalService._isOpen.subscribe(isOpen => this.isModalOpen = isOpen)
        this.modalService._loadedTotal.subscribe(totalLoaded => this.totalLoaded = totalLoaded)
        this.modalService._unloadedTotal.subscribe(totalUnloaded => this.totalUnloaded = totalUnloaded)
        this.modalService._unloadedTotal.subscribe(totalUnloaded => this.totalUnloaded = totalUnloaded)
    };

    /*
    * Закрыть модальное окно
    * */
    close():void {
        this.modalService.closeModal()
    }

    /*
    * Сохранить данные модального окна
    * а после - автоматически закрыть его
    * */
    save():void {
        this.modalService.save()
        this.close()
    }

    /*
    * Сменить тип крана
    * */
    changeCraneType(newCraneType:string):void {
        this.modalService.changeCraneType(newCraneType);
    }

    /*
    * Сменить инициалы
    * */
    changeInitials(initials:string):void {
        this.modalService.changeInitals(initials);
    }

    /*
    * Сменить дату начала смены
    * */
    changeStartDate(date:string):void {
        this.modalService.changeStartDate(date);
    }

    /*
    * Сменить дату окончания смены
    * */
    changeEndDate(date:string):void {
        this.modalService.changeEndDate(date);
    }

    /*
    * Получить информацию для полей модального окна
    * (функция вызывается при открытии модального окна)
    * */
    info() {
        if (this.modalService.workshift === undefined) {
            // Если окно было открыто как для создания новой смены - Поля по стандарту пустые
            return {
                craneType : "Одинарный",
                initials: "",
                start : "",
                end : "",
                firstCrane: "",
                secondCrane: ""
            }
        }
        else {
            // Если окно было открыто как для редактирования - заполняем поля
            return {
                craneType: this.modalService.workshift.craneType || "Одинарный",
                initials: this.modalService.workshift.initials || "",
                start: this.modalService.workshift.start || "",
                end: this.modalService.workshift.end || "",
                firstCrane: this.modalService.workshift.firstCrane,
                secondCrane: this.modalService.workshift.secondCrane
            };
        }
    }
}
