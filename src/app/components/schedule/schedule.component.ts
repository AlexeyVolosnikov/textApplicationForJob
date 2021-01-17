import {Component, Input} from '@angular/core';


/*  для класса Schedule  */
interface ISchedule {
    initials  : string
    start     : string
    end       : string
}
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

export class Schedule implements ISchedule {
    /*
    *
    * Класс ответственен за расписание смен крановщиков
    *
    * */


    initials  : string;
    start     : string;
    end       : string;

    // cranes<>[]

    constructor(_initials:string, _start:string, _end:string) {
        this.initials  = _initials;
        this.start     = _start;
        this.end       = _end;
    }

    // /*
    // * Добавляет смену в расписание
    // * */
    // add():void {
    //
    // }
    //
    // /*
    // * Удаляет смену из расписания
    // * */
    // remove():void {
    //
    // }
    //
    // /*
    // * Изменяет смену в расписании
    // * */
    // edit():void {
    //
    // }
    // ngOnInit(): void {};
}
