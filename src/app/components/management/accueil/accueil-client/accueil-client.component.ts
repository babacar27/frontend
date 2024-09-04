import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})
export class AccueilClientComponent implements OnInit {
  clientId: string | null = '';

  ngOnInit(): void {
    this.clientId = localStorage.getItem('clientId');
    console.log(localStorage.getItem('clientId'));
  }

}
