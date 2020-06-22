'use strict'

//const argv = require('yargs').argv;
// como hize una configuracion en el archivo userinputyargs ahora sera:
const argv = require('./config/yargs').argv;
const toDo = require('./logic/toDo');
const consoleColors = require('colors');

console.log('Argumentos consola: ', argv);

let command = argv._[0];

switch (command) {
    case 'create':
        console.log('Creando');
        let work = toDo.create(argv.description); //se sabe que es un array y que la pos description de arg contiene la desc
        console.log(work);
        break;
    case 'list':
        console.log('===============To Do List==============='.blue);
        let taskList = toDo.getList();
        for (let task of taskList) {
            console.log(task.description);
            console.log(`\tIs complete: ${task.complete}`.white);
        }
        console.log('========================================'.blue);
        break;
    case 'update':
        console.log('Updating');
        // tambien se puede argv.d, argv.c debido a los shortcuts
        let isSaved = toDo.update(argv.description, argv.complete);
        console.log(`${isSaved ? 'OK'.yellow : 'Error on DB'.red}`);
        break;
    case 'delete':
        console.log('Deleting');
        let deleted = toDo.remove(argv.description);
        console.log(`${deleted ? 'Task deleted'.yellow : 'Error, that task does not exists'.red}`);
        break;
    case 'filter':
        console.log('Filter');
        let auxList = toDo.filterByCompleteState(argv.filter);
        console.log(`###########- Filter by ${argv.filter} state -###########`.cyan);
        for (let i = 0; i < auxList.length; i++) {
            console.log(`\t${i + 1} -> ${auxList[i].description}`.cyan);
        };
        console.log(`###########-######################-###########`.cyan);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}