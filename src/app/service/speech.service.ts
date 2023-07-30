import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { RangeValue } from '@ionic/core';
import { IonInput, RangeCustomEvent } from '@ionic/angular';
import { IonTextarea, IonicModule } from '@ionic/angular';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  googleApi!: string;
  constructor(private http: HttpClient) {
    SpeechRecognition.requestPermissions();
    // this.googleApi = 'http://www.google.com.br/';
    this.googleApi = 'https://api.getambassador.com/api/v2/username/token/json/ambassador/get/';
  }

  public consultaGoogle(query: string){
    return this.http.get(this.googleApi + `search?q=${query}`);
  }

  public speak = async (taxa: RangeValue, tom: RangeValue, text: IonInput) => {
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

  public clear = (text: IonInput) => {
    text.value = '';
  };

  public speakStart = async (text: IonInput) => {
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
