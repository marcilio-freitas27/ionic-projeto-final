import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonTextarea } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { SpeechService } from '../service/speech.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {

  taxa!: RangeValue;
  tom!: RangeValue;
  constructor(private speechService: SpeechService) {

  }

  ngOnInit(){

  }

  speak(taxa: RangeValue, tom: RangeValue, text: IonTextarea){
    this.speechService.speak(taxa, tom, text);
  };

  stop(){
    this.speechService.stop();
  };

  taxaChange(taxa: RangeValue, event: Event){
    this.speechService.taxaChange(taxa, event);
  }

  tomChange(tom: RangeValue, event: Event){
    this.speechService.tomChange(tom, event);
  }

  clear(text: IonTextarea){
    this.speechService.clear(text);
  }

  speakStart(text: IonTextarea){
    this.speechService.speakStart(text);
  }

  speakAdd(){
    this.speechService.speakAdd();
  }

}
