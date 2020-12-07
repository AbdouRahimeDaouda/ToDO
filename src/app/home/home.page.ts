
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  allTasks = [];

  constructor(private angFire: AngularFireDatabase) {


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
          if (element.payload.exportVal().checked == false) {

            this.allTasks.push({
              key: element.key,
              text: element.payload.exportVal().text,
              checked: element.payload.exportVal().checked,
              date: element.payload.exportVal().date.substring(11, 16),
            })

          }
        });
      })

  }


  }
