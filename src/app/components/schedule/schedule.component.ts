import {Component} from '@angular/core';


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


    constructor() {}
    ngOnInit(): void {};

    /*
    * Добавляет смену в расписание
    * */
    add():void {

    }

    /*
    * Удаляет смену из расписания
    * */
    remove():void {

    }

    /*
    * Изменяет смену в расписании
    * */
    edit():void {

    }

}
