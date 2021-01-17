import { Component } from '@angular/core';

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

    constructor() {}
    ngOnInit(): void {};
}
