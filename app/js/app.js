(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('ProjectManagerApp', ['ngMaterial', 'ngMessages']);

app.config(function ($mdThemingProvider) {

  var customPrimary = {
    '50': '#b6b6cd',
    '100': '#a7a7c3',
    '200': '#9898b8',
    '300': '#8989ae',
    '400': '#7a7aa3',
    '500': '#6b6b99',
    '600': '#60608b',
    '700': '#55557c',
    '800': '#4b4b6d',
    '900': '#40405e',
    'A100': '#c6c6d7',
    'A200': '#d5d5e2',
    'A400': '#e4e4ec',
    'A700': '#36364e'
  };
  $mdThemingProvider.definePalette('customPrimary', customPrimary);

  $mdThemingProvider.theme('default').primaryPalette('customPrimary').accentPalette('green');
});

module.exports = app;
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Project List
_main2.default.controller('ProjectListCtrl', function ($scope, $rootScope, $mdDialog, projectService) {
  // data
  $scope.projects = projectService.getProjects();

  // Get projects
  $scope.setCurrentProject = function (project) {
    console.log("setCurrentProject");
    // projectService.setCurrentProject(project);
    $rootScope.$broadcast('switchProject', project);
  };
  // end fake data
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAddProjectDialog = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt().clickOutsideToClose(true).title('What would you name your brand new project?').textContent('Bowser is a common name.').placeholder('Project name').ariaLabel('Project name').initialValue('Bowser').targetEvent(ev).ok('Okay!').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      projectService.addProject(result);
      $scope.status = 'New project added.';
    }, function () {
      $scope.status = 'Adding new project canceled.';
    });
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.controller('TaskListCtrl', function ($scope, $mdDialog, projectService, finalTaskListService) {

  $scope.myDate = new Date();
  $scope.myTask = " ";
  var currentProject = projectService.getCurrentProject();

  $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);

  $scope.$on('switchProject', function (event, project) {
    projectService.setCurrentProject(project);
    currentProject = projectService.getCurrentProject();
    $scope.finalTaskList = finalTaskListService.formTaskList(project);
  });

  $scope.showAddTaskDialog = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './js/modules/TaskList/add.task.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function (date, text) {
      $scope.status = 'You said the information was "' + '".';
    }, function () {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function formListForShow() {
    $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
  }

  // push task into current project
  function addTask(task) {
    projectService.addTask(task);
    formListForShow();
  }

  function DialogController($scope, $mdDialog, taskService, projectService) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    var curProj = projectService.getCurrentProject();
    $scope.answer = function (date, text) {

      var task = {
        id: curProj.tasksIdCount,
        date: date,
        text: text
      };
      curProj.tasksQuantity += 1;
      curProj.tasksIdCount += 1;
      addTask(task);
      $mdDialog.hide("answer");
    };
  }
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Task List
_main2.default.directive('taskList', function () {
  return {
    restrict: 'E',
    templateUrl: './js/modules/TaskList/taskList.html',
    scope: {},
    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('finalTaskListService', function () {

  // var daysInMonth = function(month,year) {
  //   return new Date(year, month, 0).getDate();
  // }

  var sortByDateAsc = function sortByDateAsc(obj1, obj2) {

    if (obj1.date > obj2.date) return 1;
    if (obj1.date < obj2.date) return -1;
    return 0;
  };

  var sortByDateDesc = function sortByDateDesc(obj1, obj2) {

    if (obj1.date > obj2.date) return -1;
    if (obj1.date < obj2.date) return 1;
    return 0;
  };
  var formatDate = function formatDate(userDate) {
    var date = new Date(userDate),
        yr = date.getFullYear(),
        month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate(),
        newDate = day + '.' + month + '.' + yr;
    return newDate;
  };

  var getDayOfWeek = function getDayOfWeek(date) {
    var string = "";
    var now = moment(new Date());
    var myDate = moment(date);

    if (myDate.isSame(now, 'day')) {
      string = "Today";
      return string;
    }
    if (myDate.isSame(now.add(1, 'days'), 'day')) {
      string = "Tomorrow";
      return string;
    }

    var day = date.getDay();

    switch (day) {
      case 0:
        string = "Sunday";
        break;
      case 1:
        string = "Monday";
        break;
      case 2:
        string = "Tuesday";
        break;
      case 3:
        string = "Wednesday";
        break;
      case 4:
        string = "Thursday";
        break;
      case 5:
        string = "Friday";
        break;
      case 6:
        string = "Saturday";
        break;
      default:
        string = 'Потом';
    }
    return string;
  };

  // var finalTaskList = [];
  var formTaskList = function formTaskList(currentProject) {
    // sorting based on date
    var taskList = [];
    var tasks = currentProject.tasks;
    console.log('formTaskList');

    for (var key = 0; key < tasks.length; key++) {

      if (taskList.length < 1) {
        var taskObject = new Object();
        taskObject.date = tasks[key].date;
        taskObject.tasks = [tasks[key].text];

        taskList.push(taskObject);
      } else {
        var flag = false;
        for (var taskListKey = 0; taskListKey < taskList.length; taskListKey++) {
          if (moment(taskList[taskListKey].date).isSame(moment(tasks[key].date), 'day')) {
            taskList[taskListKey].tasks.push(tasks[key].text);
            flag = true;
          }
        }
        if (flag) {
          continue;
        }
        var taskObject = new Object();
        taskObject.date = tasks[key].date;
        taskObject.tasks = [tasks[key].text];

        taskList.push(taskObject);
      }
    }
    taskList.sort(sortByDateAsc);
    for (var i = 0; i < taskList.length; i++) {
      taskList[i].dayOfWeek = getDayOfWeek(taskList[i].date);
      taskList[i].date = formatDate(taskList[i].date);
    }

    // finalTaskList = taskList;
    return taskList;
  };

  return {
    formTaskList: formTaskList
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('projectService', function () {

  var task = {
    id: 0,
    date: new Date(),
    text: "Have a good day"
  };

  var projectList = [{
    id: 0,
    name: 'Private',
    tasks: [task],
    tasksQuantity: 1,
    tasksIdCount: 1
  }, {
    id: 1,
    name: 'Decode',
    tasks: [],
    tasksQuantity: 0,
    tasksIdCount: 0
  }, {
    id: 2,
    name: 'Family',
    tasks: [],
    tasksQuantity: 0,
    tasksIdCount: 0
  }];

  var createProject = function createProject(name) {
    return {
      name: name,
      tasks: [],
      tasksQuantity: 0,
      tasksIdCount: 0
    };
  };

  var currentProject = projectList[0];

  var setCurrentProject = function setCurrentProject(project) {
    currentProject = project;
  };

  var getCurrentProject = function getCurrentProject() {
    return currentProject;
  };

  var addProject = function addProject(name) {
    var newObj = createProject(name);
    projectList.unshift(newObj);
  };

  var getProjects = function getProjects() {
    return projectList;
  };

  var addTask = function addTask(newObj) {
    console.log(currentProject);
    currentProject.tasks.push(newObj);
  };

  var getTasks = function getTasks() {
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
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('taskService', function () {

  var addTask = function addTask(currentProject, newObj) {
    currentProject.tasks.push(newObj);
  };

  var getTasks = function getTasks(currentProject) {
    return currentProject.tasks;
  };

  return {
    addTask: addTask,
    getTasks: getTasks

  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Seach Bar
_main2.default.directive('searchBar', function () {
  return {
    restrict: 'E',
    link: function link(scope, element, attrs) {

      var searchButton = $("#search-button");;
      var searchBar = $("#search-bar");
      var active = false;
      var clickPermission = true;

      function activateDisactivateSearchBar() {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          if (active) {
            searchBar.removeClass('not-active');
            searchBar.addClass('active');
            searchBar.find("input").focus();
          } else {
            searchBar.addClass('not-active');
            setTimeout(function () {
              searchBar.removeClass('active');
              searchBar.find("input").val("");
            }, 200);
          }
        } else {
          console.log("doubleClick");
        }
      }

      searchButton.on('click', function () {
        activateDisactivateSearchBar();
      });

      searchBar.focusout(function (event) {
        activateDisactivateSearchBar();
      });
    }
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('toolsMenu', function () {
  return {
    restrict: 'E',
    link: function link(scope, element, attrs) {
      var tButton = document.getElementById("tools-button");
      var dMenu = document.getElementById("drop-down-menu");

      var toolsButton = angular.element(tButton);
      // var dropMenu = angular.element(dMenu);
      var dropMenu = $("#drop-down-menu");
      var active = false;
      var clickPermission = true;
      dropMenu.attr('tabindex', -1);

      toolsButton.on('click', function (event) {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          if (active) {

            dropMenu.removeClass('not-active');
            dropMenu.addClass('active');
            dropMenu.focus();
          } else {}
        } else {
          console.log("doubleClick");
        }
      });

      dropMenu.focusout(function (event) {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          dropMenu.addClass('not-active');
          setTimeout(function () {
            dropMenu.removeClass('active');
          }, 200);
        } else {
          console.log("doubleClick");
        }
      });
    }
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('userProfile', function () {
  return {
    restrict: 'E',
    templateUrl: './js/modules/User/userProfile.tmpl.html',
    scope: {
      name: '@',
      theme: '@'
    },
    controller: function controller($scope) {}
  };
}); // User Profile


},{"./modules/main":2}],2:[function(require,module,exports){
var app = angular.module('ProjectManagerApp', ['ngMaterial', 'ngMessages']);

app.config(function ($mdThemingProvider) {

   var customPrimary = {
        '50': '#b6b6cd',
        '100': '#a7a7c3',
        '200': '#9898b8',
        '300': '#8989ae',
        '400': '#7a7aa3',
        '500': '#6b6b99',
        '600': '#60608b',
        '700': '#55557c',
        '800': '#4b4b6d',
        '900': '#40405e',
        'A100': '#c6c6d7',
        'A200': '#d5d5e2',
        'A400': '#e4e4ec',
        'A700': '#36364e'
    };
    $mdThemingProvider.definePalette('customPrimary', customPrimary);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('green');

  });

module.exports = app;
},{}]},{},[1]);
