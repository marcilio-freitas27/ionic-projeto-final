import { Filesystem } from '@capacitor/filesystem';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FilesystemService } from '../service/filesystem.service';
import { SpeechService } from '../service/speech.service';
import { IonInput } from '@ionic/angular';

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
  result = false;
  entrada!: any;
  constructor(
    public fileService: FilesystemService,
    private speechService: SpeechService
  ) {}

  ngOnInit() {
    this.fileService.deleteSecretFile();
    this.dadosGravados = this.fileService.getDados();
    this.caminhoGravado = this.fileService.getCaminho();
    this.fileService.readSecretFile();
  }

  googleResults(text: any) {
    this.speechService
      .consultaGoogle(text)
      .subscribe((arg) => console.log(arg));
  }

  speakStart(text: any) {
    this.speechService.speakStart(text);
    this.writeSecretFile(text);
    this.entrada = text;
  }

  isOpen() {
    this.result = true;
  }

  isClosed() {
    this.result = false;
  }

  async writeSecretFile(data: any) {
    await this.fileService.writeSecretFile(data);
    this.entrada = data;
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


























