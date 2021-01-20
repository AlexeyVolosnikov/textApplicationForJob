/*
*
* Содержит интерфейсы, которые используются в нескольких местах
*
* */

import Dict = NodeJS.Dict;

export interface ICrane {
    /*
    * Интерфейс хранит в себе информацию о:
    * количестве погр. \ выгр. груза в авто-транспортное средство
    * краном
    * */
    car:string;
    loaded?:number;
    unloaded?:number;
}

export class CraneOperationsDone {
    /*
    * Класс хранит в себе массив с Icrane, в
    * которых информация о названии машины и количестве
    * погруженного-разгруженного груза
    * */

    info : ICrane[];

    constructor() {
        this.info = []
    }

    /*
    * Добавляет информацию о погрузке\выгрузке, которая была
    * совершена
    *  - для авто-транспортного средства car
    *  - с объемом loaded\unloaded (исключительно только один из них)
    * */
    addInfo(info:ICrane) {
        this.info.push(info)
    }

    /*
    * Получить количество погруженного и выгруженного
    * */
    getTotal():Dict<number> {
        let loaded = 0,
            unloaded = 0
        this.info.map((icrane:ICrane)=> {
            loaded += (isNaN(icrane.loaded)) ? 0 : icrane.loaded
            unloaded += (isNaN(icrane.unloaded)) ? 0 : icrane.unloaded
        })
        return {
            loaded : loaded,
            unloaded : unloaded
        }
    }

}

export interface IWorkshift {
    /*
    * Класс содержит информацию о смене
    * */
    craneType:string
    initials:string
    start:string
    end:string
    firstCrane?:CraneOperationsDone
    secondCrane?:CraneOperationsDone

}
