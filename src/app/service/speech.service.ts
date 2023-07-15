import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { RangeValue } from '@ionic/core';
import { RangeCustomEvent } from '@ionic/angular';
import { IonTextarea, IonicModule } from '@ionic/angular';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  constructor() {
    SpeechRecognition.requestPermissions();
  }

  public speak = async (
    taxa: RangeValue,
    tom: RangeValue,
    text: IonTextarea
  ) => {
    await TextToSpeech.speak({
      text: JSON.stringify(text.value),
      lang: 'pt-BR',
      rate: +taxa,
      pitch: +tom,
      volume: 1.0,
      category: 'ambient',
    });
  };

  public stop = async () => {
    await TextToSpeech.stop();
  };

  public taxaChange(taxa: RangeValue, event: Event) {
    taxa = (event as RangeCustomEvent).detail.value;
  }

  public tomChange(tom: RangeValue, event: Event) {
    tom = (event as RangeCustomEvent).detail.value;
  }

  public clear = (text: IonTextarea) => {
    text.value = '';
  };

  public speakStart = async (text: IonTextarea) => {
    await SpeechRecognition.available();
    await SpeechRecognition.start({
      language: 'pt-BR',
      maxResults: 5,
      prompt: 'Say something',
      partialResults: true,
      popup: true,
    }).then((res) => (text.value = res?.matches[0]));
    this.speakAdd();
  };

  public speakAdd = async () => {
    await SpeechRecognition.addListener('partialResults', (data: any) => {
      console.log('partialResults was fired', data.matches);
    });
  };
}
