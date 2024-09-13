import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {
  clientId: string | null = '';

  ngOnInit(): void {
    this.clientId = localStorage.getItem('clientId');
    console.log(localStorage.getItem('clientId'));

    this.initComplianceTrendChart();
    this.initRecordsChart();
  }

  initComplianceTrendChart() {
    const ctx = document.getElementById('compliance-trend') as HTMLCanvasElement;
    if (ctx) {
      const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
      // Dégradé de vert
      gradient.addColorStop(0, 'rgb(34, 139, 34)'); // Vert foncé
      gradient.addColorStop(1, 'rgba(50, 205, 50, 0.0)'); // Vert clair transparent

      const shadowCtx = ctx.getContext('2d');
      if (shadowCtx) {
        shadowCtx.shadowColor = 'rgba(0, 100, 0, 0.2)'; // Ombre légèrement verte
        shadowCtx.shadowBlur = 10;
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Fruits', 'Legumes', 'Cereales', 'Légumineuses ', 'Produits laitiers', 'Viandes et poissons'],
          datasets: [{
            label: 'Vente de produits agricoles',
            data: [10, 6, 3, 1, 0, 0],
            borderColor: '#228B22', // Couleur de la ligne verte
            backgroundColor: gradient, // Gradient vert
            pointBackgroundColor: '#32CD32', // Points verts plus clairs
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#32CD32', // Bordure des points survolés en vert
            fill: true,
            tension: 0.3,  // Lissage modéré
            borderWidth: 3,
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
                  size: 16,
                  family: 'Arial, sans-serif'
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
                font: {
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: 'rgba(200, 200, 200, 0.2)',
              },
              ticks: {
                color: '#333',
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
  }



  initRecordsChart() {
    const ctx = document.getElementById('records-chart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Vendeur1(Babs)', 'Vendeur3(Ibou)', 'Vendeur4(Laye)', 'Vendeur7(Bara)', 'Vendeur5(baba)'],
          datasets: [{
            label: 'Records',
            data: [5, 7, 4, 2, 2],
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
