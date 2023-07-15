import { Filesystem } from '@capacitor/filesystem';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FilesystemService } from '../service/filesystem.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class Tab1Page {
  dadosGravados!: any[];
  caminhoGravado!: any;
  constructor(public fileService: FilesystemService) {
    
  }

  ngOnInit(){
    this.fileService.deleteSecretFile();
    this.dadosGravados = this.fileService.getDados();
    this.caminhoGravado = this.fileService.getCaminho();
  }

  async writeSecretFile(data: any) {
    await this.fileService.writeSecretFile(data);
  }

  async readSecretFile() {
    await this.fileService.readSecretFile();
  }

  async deleteSecretFile() {
    await this.fileService.deleteSecretFile();
  }

  async readFilePath() {
    await this.fileService.readFilePath();
  }
}
