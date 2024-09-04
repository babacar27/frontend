import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chargement',
  templateUrl: './chargement.component.html',
  styleUrls: ['./chargement.component.css']
})
export class ChargementComponent implements OnInit {

  ngOnInit() {
    // Initialisez le préchargeur lorsque le composant est chargé
    this.simulateLoading();
  }

  private updateProgress(percentage: number) {
    const progressDiv = document.getElementById('progress_div');
    const bar1 = document.getElementById('bar1');
    const percent1 = document.getElementById('percent1');

    if (progressDiv && bar1 && percent1) {
      bar1.style.width = `${percentage}%`;
      percent1.textContent = `${percentage}%`;
    }
  }

  private simulateLoading() {
    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 10;
      this.updateProgress(percentage);
      if (percentage >= 100) {
        clearInterval(interval);
        // Optionnel : masquer le préchargeur après chargement complet
        const preLoader = document.querySelector('.pre-loader');
        if (preLoader) {
          preLoader.classList.add('hide');
        }
      }
    }, 100);
  }
}
