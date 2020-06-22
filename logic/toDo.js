'use strict'

const fileSystem = require('fs');
let taskList = [];

const chargeFromDB = () => {
    //si el arachivo esta vacio crea una lista vacia o lo inicializa a arreglo vacio
    try {
        taskList = require('../db/data.json');
    } catch (error) {
        taskList = [];
    }
}

const saveOnDataBase = () => {
    let data = JSON.stringify(taskList);

    //tambien funnciona con la ruta .//db/data.json
    fileSystem.writeFile('db/data.json', data, (error) => {
        if (error) throw new Error('Misspelled file :/');
    });
};

const create = (description) => {
    chargeFromDB();

    let toDo = {
        //description: description, esto en el ecs 6 es redundante
        description,
        complete: false
    };

    taskList.push(toDo);
    saveOnDataBase();

    return toDo;
};

const getList = () => {
    chargeFromDB();
    return taskList;
};

const update = (incomingDescription, completeState = true) => {
    chargeFromDB();
    let index = taskList.findIndex(eachTask => eachTask.description === incomingDescription);

    if (index >= 0) {
        console.log(incomingDescription, completeState, taskList[index].complete);
        taskList[index].complete = completeState;
        saveOnDataBase();
        return true;
    }
    return false;
};

const remove = (taskName) => {
    chargeFromDB();

    //con filter de los arreglos
    let filteredList = taskList.filter(filterTask => filterTask.description !== taskName);
    console.log(filteredList);

    for (let k = 0; k < taskList.length; k++) {
        if (taskList[k].description === taskName) {
            taskList.splice(k, 1);
            saveOnDataBase();
            return true;
        }
    }

    return false;
};

const filterByCompleteState = (searchState) => {
    chargeFromDB();
    let filterByState = taskList.filter(task => task.complete.toString() === searchState.toString());
    return filterByState;
};

module.exports = {
    create,
    getList,
    update,
    remove,
    filterByCompleteState
}