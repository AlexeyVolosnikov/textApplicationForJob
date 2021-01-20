import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* Сервисы */
import { DatabaseService } from './database.service';

/* Общие интерфейсы */
import { IWorkshift, CraneOperationsDone } from '../components/interfaces/workshift.interface';


@Injectable()
export class WorkshiftService {
    /*
    *
    * Сервис отвечает за хранение и передачу информации между разными компонентами,
    * (модальным окном и таблицей с расписанием)
    * что позволяет им легко "общаться"
    *
    *   Хранит в себе Смены (workshifts)
    *
    * Для отслеживания информации создается асинхронный наблюдатель
    * который отслеживает значения переменных и по их изменению
    * будет изменять их в компонентах, в которых было внедрение зависимости
    * */

    private workshifts = new BehaviorSubject< Array<IWorkshift> >(this.load());
    _workshifts = this.workshifts.asObservable();

    constructor(private db : DatabaseService) {
        this.db = db;
    }

    /*
    * Получить массив информации о сменах из БД
    * */
    load():Array<IWorkshift> {
        return this.db.getWorkshifts();
    }

    /*
    * Получить информацию для таблицы
    * */
    getSchedule():Array<IWorkshift> {
        return this.workshifts.getValue()
    }

    /*
    * Добавить смену по отдельным параметрам
    *  - craneType - тип крана (Одинарный \ Двойной)
    *  - initials - инициалы
    *  - start, end - время начала и конца смены
    *  - массив погрузок\разгрузок для только первого или обоих
    *    кранов ( в зависимости от craneType)
    * */
    add(craneType:string,
                 initials:string,
                 start:string,
                 end:string,
                 firstCrane:CraneOperationsDone,
                 secondCrane:CraneOperationsDone):void {

        let new_workshift = {
            craneType : craneType,
            initials : initials,
            start : start,
            end : end,
            firstCrane : firstCrane,
            secondCrane : secondCrane
        }
        // concat используется здесь тк он возвращает массив, в отличие от push
        // подробнее: https://stackoverflow.com/questions/44272402/rxjs-incrementally-push-stream-of-data-to-behaviorsubject
        this.workshifts.next(this.workshifts.getValue().concat([new_workshift]));
    }

    /*
    * Добавить смену цельно
    * */
    addWorkshift(new_workshift:IWorkshift):void {
        this.workshifts.next(this.workshifts.getValue().concat([new_workshift]));
    }

    /*
    * Удалить смену
    * (получаем массив смен, итерируем его, при нахождении
    * смены которой нужно удалить - удаляем, и обновленный
    * массив сохраняем)
    * */
    delete(iworkshiftToRemove:IWorkshift):void {
        let workshiftsArr = this.workshifts.getValue();
        workshiftsArr.forEach((iworkshift, index)=> {
            if (iworkshift === iworkshiftToRemove) {
                workshiftsArr.splice(index, 1);
            }
        })
        this.workshifts.next(workshiftsArr)
    }

    /*
    * Редактировать смену в массиве смен
    * */
    edit(index:number, workshift:IWorkshift):void {
        let workshiftsArray = this.workshifts.getValue();
        workshiftsArray[index] = workshift
        this.workshifts.next(workshiftsArray)
    }

}

