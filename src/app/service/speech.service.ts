import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { RangeValue } from '@ionic/core';
import { IonInput, RangeCustomEvent } from '@ionic/angular';
import { IonTextarea, IonicModule } from '@ionic/angular';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GlobalUtil } from '../utils/global.util';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  googleApi!: string;
  util!: GlobalUtil;
  constructor(private http: HttpClient) {
    this.util = new GlobalUtil();
    if (this.util.isAndroidOrWeb()) {
      SpeechRecognition.requestPermissions(); 
    }
    let key = 'AIzaSyAhaoj9L6eIaREOjTUzLMsSaSUaV6FXmIo';
    this.googleApi = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=017576662512468239146:omuauf_lfve`;
    // this.googleApi = 'https://api.getambassador.com/api/v2/username/token/json/ambassador/get/';
  }

  public consultaGoogle(query: any){
    const headers= new HttpHeaders()
    .set('Accept-Language', 'pt-BR')
    return this.http.get(this.googleApi + `&q=${query}&oq=${query}`, {
      'headers': headers
    });
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
    if (this.util.isAndroidOrWeb()) {
      await SpeechRecognition.available();
      await SpeechRecognition.start({
        language: 'pt-BR',
        maxResults: 5,
        prompt: 'Say something',
        partialResults: true,
        popup: true,
      }).then((res) => (text.value = res?.matches[0]));
      this.speakAdd();
    }
  };

  public speakAdd = async () => {
    await SpeechRecognition.addListener('partialResults', (data: any) => {
      console.log('partialResults was fired', data.matches);
    });
  };
}
