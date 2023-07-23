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
  maisAcessados!: any[];
  menosAcessados!: any[];
  total!: any[];
  ctx!: any;
  constructor(public fileService: FilesystemService) {
    this.dadosGravados = [];
    this.maisAcessados = [];
    this.menosAcessados = [];
    this.total = [];
  }

  ngOnInit() {
    this.fileService.deleteSecretFile();
    this.dadosGravados = this.fileService.getDados();
    this.getChart();
  }

  async readSecretFile() {
    await this.fileService.readSecretFile();
  }

  // updateChart(dado:any ){
  //   this.total.push(dado);
  // }

  getChart() {
    this.ctx = document.getElementById('myChart');
    const [maiorLista, menorLista] = separarItensSemelhantes(this.dadosGravados);
    console.log(maiorLista,menorLista, this.dadosGravados)
    let chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [`Menos acessada: ${maiorLista?.[0]}`, `Mais acessada: ${menorLista?.[0]}`, 'Total'],
        datasets: [
          {
            label: 'Pesquisas',
            data: [menorLista?.length, maiorLista?.length, this.dadosGravados.length],
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
    chart.update();
  }
}

function separarItensSemelhantes<T>(lista: T[]): [T[] | undefined, T[] | undefined] {
  const grupos: T[][] = [];

  lista.forEach((item) => {
    let grupoEncontrado = false;

    // Procura por um grupo existente para o item atual
    for (const grupo of grupos) {
      if (grupo.some((elemento) => saoItensSemelhantes(item, elemento))) {
        grupo.push(item);
        grupoEncontrado = true;
        break;
      }
    }

    // Se não encontrou um grupo, cria um novo grupo
    if (!grupoEncontrado) {
      grupos.push([item]);
    }
  });

  // Filtrar apenas os grupos que possuem repetições de itens
  const gruposComRepeticoes = grupos.filter((grupo) => grupo.length > 1);

  // Ordenar os grupos com repetições por quantidade de elementos (do maior para o menor)
  gruposComRepeticoes.sort((a, b) => b.length - a.length);

  // Encontrar a maior e a menor quantidade de elementos nos grupos com repetições
  const maiorQuantidade = gruposComRepeticoes[0]?.length;
  const menorQuantidade = gruposComRepeticoes[gruposComRepeticoes.length - 1]?.length;

  // Filtrar as listas maior e menor (priorizadas) e verificar se elas estão em ordem crescente
  const maiorListaPriorizada: T[] | undefined = gruposComRepeticoes.find((grupo) => grupo.length === maiorQuantidade);
  const menorListaPriorizada: T[] | undefined = gruposComRepeticoes.find((grupo) => grupo.length === menorQuantidade);

  return [maiorListaPriorizada, menorListaPriorizada];
}

// Função auxiliar para verificar se dois itens são semelhantes (pode ser personalizada para a comparação específica dos itens)
function saoItensSemelhantes<T>(item1: T, item2: T): boolean {
  return item1 === item2;
}
