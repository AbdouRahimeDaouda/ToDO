import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NavigationExtras, Router} from '@angular/router';



@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {

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
    this.angFire.list('/Tascks').snapshotChanges(['child_added']).subscribe(
        (reponse) => {
          console.log(reponse);
          this.allTasks = [];
          reponse.forEach(element => {
            if(element.payload.exportVal().checked == true){
              this.allTasks.push({
                key: element.key,
                text: element.payload.exportVal().text,
                checked: element.payload.exportVal().checked,
                date: element.payload.exportVal().date.substring(11, 16),
              });
            }

          });
        }
    );

  }
  ionViewWillEnter(){
      this.getTasks()
  }

}
