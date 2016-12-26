import app from './modules/main'

app.service('projectService', function() {

   var task = {
    id: 0,
    date: new Date(),
    text: "Have a good day"
    };

  var projectList = [
    { 
      id: 0,
      name: 'Private',
      tasks: [task], 
      tasksQuantity: 1,
      tasksIdCount: 1   
    },
    { 
      id: 1,
      name: 'Decode', 
      tasks: [],
      tasksQuantity: 0,
      tasksIdCount: 0  
    },
    { 
      id: 2,
      name: 'Family', 
      tasks: [],
      tasksQuantity: 0,
      tasksIdCount: 0   
    }
  ];

  var createProject = function (name)
  {
    return{
      name: name,
      tasks: [],
      tasksQuantity: 0,
      tasksIdCount: 0  
    };
  }

  var currentProject = projectList[0];


  var setCurrentProject = function (project)
  {
    currentProject = project;
  }

  var getCurrentProject = function ()
  {
    return currentProject;
  }

  var addProject = function(name) {
      var newObj = createProject(name);
      projectList.unshift(newObj);
  };

  var getProjects = function(){
      return projectList;
  };

   var addTask = function(newObj) {
    console.log(currentProject);
    currentProject.tasks.push(newObj);
  };

  var getTasks = function(){
      return currentProject.tasks;
  };


  return {
    addProject: addProject,
    getProjects: getProjects,
    setCurrentProject: setCurrentProject,
    getCurrentProject: getCurrentProject,
    addTask: addTask,
    getTasks: getTasks

  };

});