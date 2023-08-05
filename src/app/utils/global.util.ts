import { Capacitor } from '@capacitor/core';

export class GlobalUtil {

    constructor(){}

    isAndroidOrWeb(): boolean{
        let plataform = Capacitor.getPlatform();
        return plataform == 'android' ? true : false;
    }
}