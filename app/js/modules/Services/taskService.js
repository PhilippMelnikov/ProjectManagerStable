import app from './modules/main'

app.service('taskService', function() {

  var addTask = function(currentProject, newObj) {
    currentProject.tasks.push(newObj);
  };

  var getTasks = function(currentProject){
      return currentProject.tasks;
  };

  return {
    addTask: addTask,
    getTasks: getTasks

  };

});