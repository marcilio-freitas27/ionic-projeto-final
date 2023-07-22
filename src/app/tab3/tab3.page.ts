import { Chart } from 'chart.js/auto';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FilesystemService } from '../service/filesystem.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class Tab3Page {
  dadosGravados!: any[];
  ctx!: any;
  constructor(public fileService: FilesystemService) {}

  ngOnInit() {
    this.dadosGravados = this.fileService.getDados();
    this.getChart();
  }

  async readSecretFile() {
    await this.fileService.readSecretFile();
  }

  getChart() {
    this.ctx = document.getElementById('myChart');
    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Mais Acessados', 'Menos Acessados', 'Total'],
        datasets: [
          {
            label: 'Pesquisas',
            data: [10, 20, 30],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
