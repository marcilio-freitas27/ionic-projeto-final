import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  dadosGravados: any[];
  caminhoGravado: any;
  constructor() {
    this.dadosGravados = [];
  }

  getDados() {
    return this.dadosGravados;
  }

  getCaminho() {
    return this.caminhoGravado;
  }

  setCaminho(dados: any) {
    this.caminhoGravado = dados;
  }

  setDados(dados: any) {
    this.dadosGravados.push(dados);
  }

  async writeSecretFile(data: any) {
    await this.setDados(data);
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  async readSecretFile() {
    const contents: any = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    this.dadosGravados = contents.data;
    return this.dadosGravados;
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

    this.setCaminho(contents);
  }
}
