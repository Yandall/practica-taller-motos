# Práctica final - Taller de motos

## API para el registro de motos y su mantenimiento
Es una página web donde se pueden registrar los mantenimientos de motos que se hacen en cierto taller y contabilizar
el trabajo de los mecánicos

## Características
Es necesario que un administrador te generé un nuevo usuario como mecánico u otro administrador 
para poder hacer login y utilizar el api.
Hay registro para nuevas motos.
Un administrador puede elegir que mecánico va a realizar el mantenimiento de una moto en espera.
Los mecánicos pueden registrar y actualizar información sobre las motos a las que realizaron un mantenimiento

## ¿Cómo correr?

1. Instalar las dependencias de express y postgres
```
npm i express
npm i pg
```
2. En el root del proyecto correr en la terminal 
```
node .\app.js
```
3. Ya está listo para usar el api. Se puede loguear con la misma cuenta desde cualquier dispositivo ya que se usa una base de datos en la nube. Solo es necesario entrar a la ruta
```
localhost:3000
```
