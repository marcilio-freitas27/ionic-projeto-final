import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, CommonModule, ReactiveFormsModule],
})
export class Tab1Page {
  dadosGravados: any;
  caminhoGravado: any;
  constructor() {
    this.deleteSecretFile();
  }

  async writeSecretFile(data: any) {
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  async readSecretFile() {
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    this.dadosGravados = contents.data;
  }

  async deleteSecretFile() {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
  }

  async readFilePath() {
    const contents = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
    });

    this.caminhoGravado = contents;
  }
}
