'use strict'

// como se repite en las tres tareas se extrajo como constante
const description = {
    demand: true, //es obligatorio la descripcion --description o -d
    alias: 'd',
    desc: 'The exact name of the task to operate'
}

const argv = require('yargs').
    command('create', 'Creates a new task on the task list', {
        description: description
    })
    .command('list', 'List all tasks', {
    })
    .command('update', 'Updates the complete state of a task', {
        description,
        complete: {
            default: true, //si no llega nada sera el valor por defecto
            alias: 'c',
            description: 'Marks as completed a task'
        }
    })
    .command('delete', 'Deletes a task by description', {
        description
    })
    .command('filter', 'Filters the task with specified state', {
        filter: {
            default: false,
            alias: 'f',
            description: 'Filters the task by complete atribute'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}