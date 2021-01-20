import { Injectable,  } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { IWorkshift} from '../components/interfaces/workshift.interface';
import {WorkshiftService} from './workshift.service';

@Injectable()
export class ModalsService {
    /*
    *
    * Сервис отвечает за хранение и передачу информации между разными компонентами,
    * для отслеживания состояний модальных окон
    * что позволяет им легко "общаться"
    *
    * Поскольку модальное окно в текущем случае одно - то значение
    * о его состоянии (открыто \ закрыто) хранится в переменной
    *
    * Для отслеживания информации создается асинхронный наблюдатель
    * который отслеживает значения переменных и по их изменению
    * будет изменять их в компонентах, в которых было внедрение зависимости
    * */

    public workshift: IWorkshift;

    // Отслеживание состояния модального окна
    private isOpen = new BehaviorSubject<Boolean>(false);
    _isOpen = this.isOpen.asObservable();

    // Отслеживание типа крана
    private craneType = new Subject<string>();
    _craneType = this.craneType.asObservable();

    // Отслеживание текущей смены
    private workshiftSubject: BehaviorSubject<IWorkshift>;
    public _workshift : Observable<any>;

    // Отслеживание "всего погружено" и "всего выгружено"
    // в текущем модальном окне для динамического их изменения при
    // вводе пользователем новых данных \ изменений
    loadedTotal = new BehaviorSubject<number>(0);
    _loadedTotal = this.loadedTotal.asObservable()
    unloadedTotal = new BehaviorSubject<number>(0);
    _unloadedTotal = this.unloadedTotal.asObservable()

    // это окно для редактирования? если нет - то для создания новой смены
    // нужно для того, чтобы знать, кнопке "сохранить" добавлять новую смену
    // или изменять существующую в массиве смен. number - это индекс
    // в массиве смен для замены при сохранении редактирования. Если индекс -1
    // - то это новая смена
    private editingNumber: number;

    constructor(private workshiftService : WorkshiftService) {
        this.workshiftService = workshiftService;
    }

    /*
    * Открыть модальное окно с новой сменой
    * */
    openModal():void {
        this.editingNumber = -1;
        this.isOpen.next(true);
        // Это новая смена - то для нее создается пустой экземпляр
        this.createWorkshift()
        this.init(this.workshift);
        this.loadedTotal.next(0);
        this.unloadedTotal.next(0);
    }

    /*
    * Открыть модальное окно для редактирования смены
    * */
    openModalForEditing(index:number):void {
        this.editingNumber = index;
        this.isOpen.next(true);
    }

    /*
    * Закрыть модальное окно
    * */
    closeModal():void {
        this.isOpen.next(false);
    }

    /*
    * Сохранить смену в расписание
    * */
    save():void {
        // если смена новая
        if (this.editingNumber == -1) {
            this.workshiftService.addWorkshift(this.workshift);
        }
        // если смена редактируемая - имеем индекс по которому
        // в массиве нужно изменить смену
        else {
            this.workshiftService.edit(this.editingNumber, this.workshift)
        }

    }

    /*
    * Если модальное окно редактирует входящую смену, а не добавляет новую,
    * то нужно заполнить его поля данными полной копией редактируемой смены
    * Чтобы изменения в модальном окне были только в нем, а не
    * в сервисе всех смен (тогда изменения, которые осуществляются в модальном окне
    * сразу применятся к итоговой таблице без нажатия кнопки сохранить.
    * Создание копии, ее изменение и последующая замена в сервисе всех смен
    * позволяет изменять смену изолированно от хранилища.
    * */
    init(workshift:IWorkshift):void {
        this.workshift = JSON.parse(JSON.stringify(workshift));
        // Отслеживание текущей смены при открытии модального окна
        this.workshiftSubject = new BehaviorSubject<IWorkshift>(this.workshift);
        this._workshift = this.workshiftSubject.asObservable();
    }

    /*
    * Создать новую, пустую смену
    * */
    createWorkshift():void {
        this.workshift = {
            craneType: "Одинарный",
            initials: "",
            start: "",
            end: ""
        }
    }

    /*
    * Сменить тип крана
    * */
    changeCraneType(newType:string):void {
        this.workshift.craneType = newType;
        this.workshiftSubject.next(this.workshift)
        this.craneType.next(newType);
    }

    /*
    * Сменить инициалы
    * */
    changeInitals(initials:string):void {
        this.workshift.initials = initials;
        this.workshiftSubject.next(this.workshift)
    }

    /*
    * Сменить дату начала
    * */
    changeStartDate(startDate : string):void {
        this.workshift.start = startDate;
        this.workshiftSubject.next(this.workshift);
    }
    /*
    * Сменить дату окончания
    * */
    changeEndDate(endDate : string):void {
        this.workshift.end = endDate;
        this.workshiftSubject.next(this.workshift);
    }

}

