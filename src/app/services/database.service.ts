import {Injectable} from '@angular/core';

/* Интерфейсы */
import {CraneOperationsDone, ICrane, IWorkshift} from '../components/interfaces/workshift.interface';
import {Subject} from 'rxjs';
import {WorkshiftService} from './workshift.service';

@Injectable()
export class DatabaseService {
    /*
    * Сервис ответственен за получение
    * ( в дальнейшем сохранение) данных в БД
    * */
    private workshifts = new Subject<WorkshiftService>();
    _workshifts = this.workshifts.asObservable();

    constructor() {}

    /*
    * Получить массив данных о сменах
    * */
    getWorkshifts():Array<IWorkshift> {
        let crane_info1:ICrane = {
            car : "Грузовик 1",
            loaded: 12
        }
        let crane_info2:ICrane = {
            car : "Грузовик 2",
            unloaded : 23
        }
        let crane_info3:ICrane = {
            car : "Грузовик 2",
            unloaded:11
        }
        let craneOperationsDone1 = new CraneOperationsDone()
        craneOperationsDone1.addInfo(crane_info1);
        craneOperationsDone1.addInfo(crane_info2)
        let craneOperationsDone2 = new CraneOperationsDone()
        craneOperationsDone2.addInfo(crane_info3)
        return [
            {
            initials: "Петров И.И",
            craneType: "Двойной",
            start: "12/12/2020 8:00 AM", // Начало рабочей смены
            end: "12/12/2020 17:00 AM", // Конец рабочей смены,
            firstCrane: craneOperationsDone1,
            secondCrane: craneOperationsDone2
            }
        ];
    }

}
