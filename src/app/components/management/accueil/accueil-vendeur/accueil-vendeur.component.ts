import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthServiceService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-accueil-vendeur',
  templateUrl: './accueil-vendeur.component.html',
  styleUrls: ['./accueil-vendeur.component.css']
})
export class AccueilVendeurComponent implements OnInit {
  clientId: string | null = '';
  userImageUrl: string = '';
  userName: string = '';

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.clientId = localStorage.getItem('clientId');
    console.log(this.clientId);
    this.loadUserInfo();
    this.initComplianceTrendChart();
    this.initRecordsChart();
  }

  loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.userImageUrl = data.photo; // Assurez-vous que 'photo' est la propriété correcte
        this.userName = data.name; // Assurez-vous que 'name' est la propriété correcte
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    );
  }

  initComplianceTrendChart(): void {
    const ctx = document.getElementById('compliance-trend') as HTMLCanvasElement;
    if (ctx) {
      const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgb(245,236,66)');
      gradient.addColorStop(1, 'rgba(66, 165, 245, 0.0)');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Compliance',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#f5ec42',
            backgroundColor: gradient,
            pointBackgroundColor: '#f5ec42',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f5ec42',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#333',
              },
            },
            y: {
              grid: {
                color: 'rgba(200, 200, 200, 0.2)',
              },
              ticks: {
                color: '#333',
              },
            },
          },
        },
      });
    }
  }

  initRecordsChart(): void {
    const ctx = document.getElementById('records-chart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Records',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: '#66BB6A',
            borderColor: '#43A047',
            borderWidth: 2,
            hoverBackgroundColor: '#43A047',
            hoverBorderColor: '#2E7D32',
            borderRadius: 10,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#333',
              },
            },
            y: {
              grid: {
                color: 'rgba(200, 200, 200, 0.2)',
              },
              ticks: {
                color: '#333',
              },
            },
          },
        },
      });
    }
  }
}
