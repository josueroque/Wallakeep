# Practica Wallakeep Redux

## 1. Configurar un store Redux donde se almacenará al menos la siguiente información

  - Componentes que pasaron a manejarse a traves de redux:
    - Register
    - List
    - Create-Edit
  - Las consultas de estado del usuario y tags pasaron a ser consultadas al stores de redux en lugar de local de
    local storage.
  - Las acciones de guardar y editar anuncios pasaron a ejecutarse a traves de redux.           

## 2.Crear las acciones y reducers necesarios para poder cumplir los objetivos del punto 1.
  - Se crearon los reducers:
    - adsReducer
    - tagsReducer
    - userReducer
  - Se crearon los siguientes archivos de acciones:
    - adsActions
    - tagsActions
    - userActions

## 3. Configurar Redux Dev Tools para simplificar las tareas de debugging de la aplicación.
    Se consfiguraron las Dev tools.

## 4. Formularios   
   Se crearon los siguientes componentes y se agregaron al componente Register utilizando Hoc y Context
    - Form
    - Input

## 5. Refactorizar algún componenente para que use hooks, por ejemplo gestionando su estado con useState o sus efectos con useEffect.
    Se refactorizaron para usar hooks los siguientes componentes:
     - List
     - Create-Edit
          
## 6.Testing. Crear tests unitarios, dando al menos un ejemplo de cada uno de estos casos.
    - Una acción síncrona => adsActions.spec.js 
    - Una acción asíncrona => tagsActions.spec.js
    - Un reducer => userReducer.spec.js
    - Un componente con snapshot testing => Detail.spec.js.snap
    - Comprobar el funcionamiento de un componente que ejecuta una acción del store => Detail.spec.js


