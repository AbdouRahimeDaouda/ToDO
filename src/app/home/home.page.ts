
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {interval, Subscription} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: number;

  allTasks = [];
  private updateSubscription: Subscription;

  constructor(private angFire: AngularFireDatabase, ) {


  }
  ngOnInit(){
     this.updateSubscription = interval(1).subscribe(
       (val) => { this.getTasks()});

  }

  // getBadgeVal(){
  //   this.data = JSON.parse(localStorage.getItem('myVal'));
  //   console.log("Did data load? : ",localStorage.getItem('myVal'));
  // }
  getTasks() {
  this.angFire.list('/Tascks').snapshotChanges(['child_added']).subscribe(
      (reponse) => {
        console.log(reponse);
        this.allTasks = [];
        reponse.forEach(element => {

          if (element.payload.exportVal().checked == false){this.allTasks.push({

            checked: element.payload.exportVal().checked,

          });}

        });
      }
  );
  this.data=this.allTasks.length
}

}
