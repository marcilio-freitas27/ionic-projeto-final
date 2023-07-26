# Speech to search, Speech to do

## Possíveis funcionalidades a serem implementadas

- Consultar um item no mapa por voz;
- Ver resultados por voz;
- Gerar gráfico por voz;
- Listar buscas (histórico de buscas);
- entre outras possibilidades.


# Build android e web

## Standalone

- Caso o seu projeto seja do tipo *standalone* (angular 13+) é necessário fazer os seguintes comandos para gerar o build:

- Para o build web
```
$ npm build

ou

$ ng build
```

- Para o build android
- certifique-se de ter instalado o capacitor (npm i @capacitor/android)

```
$ npx capacitor add android
$ npx capacitor sync

```