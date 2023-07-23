import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilesystemService } from '../service/filesystem.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  total!: any[];
  constructor(private fileService: FilesystemService) {}

  ngOnInit(){
    this.total = this.fileService.getDados();
  }
}
