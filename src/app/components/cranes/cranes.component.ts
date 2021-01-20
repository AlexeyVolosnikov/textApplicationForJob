import { Component } from '@angular/core';
import {CraneOperationsDone, IWorkshift} from '../interfaces/workshift.interface';
import {ModalsService} from '../../services/modals.service';

@Component({
  selector: 'cranes',
  templateUrl: './cranes.component.html',
  styleUrls: ['./cranes.component.css']
})
export class Cranes  {

  workshift: IWorkshift;

  constructor(private modalService : ModalsService) {
    this.modalService._workshift.subscribe(workshift => {
      this.workshift = workshift;
    })
    // если смена новая, то не нужно обновлять информацию, тк обновлять нечего
    // если смена редактируемая то нужно
    if (this.workshift.firstCrane !== undefined) {
      this.recalculateLoadedUnloadedTotal()
    }
  }

  /*
  * Получить информацию для полей
  * */
  info() {
    // Если это редактируемая смена
    if (this.workshift.firstCrane !== undefined) {
      // console.log("Это редактируемая смена!")
      return {
        craneType : this.workshift.craneType,
        firstCrane : this.workshift.firstCrane.info,
        secondCrane : (this.workshift.secondCrane!==undefined) ? this.workshift.secondCrane.info : undefined
      }
    }
    else {
      // Если это новая смена
      return {
        craneType: this.workshift.craneType,
        firstCrane: "",
        secondCrane: ""
      }
    }
  }

  /*
  * Удалить текущую позицию (погрузку\выгрузку в авто-транспортное средство)
  * у крана
  * */
  delete(craneType:string, rowNumber:number):void {
    if (craneType == "Одинарный") {
      this.workshift.firstCrane.info.splice(rowNumber, 1)
    }
    else {
      this.workshift.secondCrane.info.splice(rowNumber, 1)
    }
    this.recalculateLoadedUnloadedTotal()
  }

  /*
  * Добавить позицию (погрузку\выгрузку в авто-транспортное средство)
  * у крана
  * */
  add(craneType:string, car:any, select:HTMLSelectElement):void {
    if (craneType == "Одинарный") {
      if (this.workshift.firstCrane === undefined) {
        this.workshift.firstCrane = new CraneOperationsDone()
      }
      this.workshift.firstCrane.info.push({
        car : car,
        loaded : undefined
      })
    }
    else {
      if (this.workshift.secondCrane === undefined) {
        this.workshift.secondCrane = new CraneOperationsDone()
      }
      this.workshift.secondCrane.info.push({
        car : car,
        loaded : undefined
      })
    }
    select.value = "Выберите машину..."
  }

  /*
  * Отключить второй инпут, если в первом появится контент
  * и сохранить новую информацию с инпута
  * */
  handleInput(
      currentInput:HTMLInputElement,
      neighbourInput:HTMLInputElement,
      craneType:string,
      index:number,
      loaded_or_unloaded:string
  ):void {
    // отключить соседний инпут если есть контент в текущем
    neighbourInput.disabled = currentInput.value !== '';
    // в зависимости от типа крана присваиваем новые значения
    if (craneType == "Одинарный") {
      if (index == -1) {
        index = this.workshift.firstCrane.info.length
      }
      if (loaded_or_unloaded == "loaded") {
        this.workshift.firstCrane.info[index].loaded = Number(currentInput.value);
      }
      else {
        this.workshift.firstCrane.info[index].unloaded = Number(currentInput.value);
      }
    }
    else {
      if (index == -1) {
        index = this.workshift.secondCrane.info.length
      }
      if (loaded_or_unloaded == "loaded") {
        this.workshift.secondCrane.info[index].loaded = Number(currentInput.value);
      }
      else {
        this.workshift.secondCrane.info[index].unloaded = Number(currentInput.value);
      }
    }
    this.recalculateLoadedUnloadedTotal()
  }

  /*
  * Пересчитать "всего погружено" и "всего выгружено" в модальном окне
  * с учетом последних обновлений, введенных пользователем
  * */
  recalculateLoadedUnloadedTotal():void {
    let loadedTotal   = 0,
        unloadedTotal = 0
    this.workshift.firstCrane.info.forEach((crane)=>{
      loadedTotal += (crane.loaded !== undefined || NaN) ? crane.loaded : 0;
      unloadedTotal += (crane.unloaded !== undefined || NaN) ? crane.unloaded : 0;
    })
    // если есть второй кран
    if (this.workshift.secondCrane !== undefined) {
      this.workshift.secondCrane.info.forEach((crane)=>{
        loadedTotal += (crane.loaded !== undefined || NaN) ? crane.loaded : 0;
        unloadedTotal += (crane.unloaded !== undefined || NaN) ? crane.unloaded : 0;
      })
    }
    this.modalService.loadedTotal.next(loadedTotal)
    this.modalService.unloadedTotal.next(unloadedTotal)
  }


}
