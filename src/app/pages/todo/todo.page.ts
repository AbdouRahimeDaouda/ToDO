import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  currentDate: string;
  // tslint:disable-next-line: no-inferrable-types
  newTask: string = '';
  allTasks = [];
  addTask: boolean;
  constructor(private angFire: AngularFireDatabase, private router: Router) {

    const todayDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = todayDate.toLocaleDateString('fr-fr', options);
  }
  ngOnInit(){
    this.getTasks();
  }
  getTasks() {
    //let userId = localStorage.getItem('uid');
    let userId = JSON.parse(window.localStorage['uid']);

    this.angFire.list('/Tascks', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges(['child_added']).subscribe(
        (reponse) => {
          console.log(reponse);
          this.allTasks = [];
          reponse.forEach(element => {

            this.allTasks.push({
              key: element.key,
              text: element.payload.exportVal().text,
              checked: element.payload.exportVal().checked,
              date: element.payload.exportVal().date.substring(11, 16),
            });
            
          });
        }
    );

  }
  changeCheckedState(tsk) {
    this.angFire.object(`Tascks/${tsk.key}/checked`).set(tsk.checked);
    //localStorage.setItem('myVal', JSON.stringify(this.allTasks.filter(t=>t.checked==false).length))

  }
  addNewTask() {
     
    this.angFire.list('Tascks/').push({
      text: this.newTask,
      checked: false,
      date: new Date().toISOString(),
      uid: JSON.parse(window.localStorage['uid'])
    });
    this.newTask = '';
  }



    showForm() {
        this.addTask = !this.addTask;
        this.newTask = ''
    }

  deleteTask(task: any) {
    this.angFire.list('Tascks/').remove(task.key);
    this.getTasks();
  }
}
