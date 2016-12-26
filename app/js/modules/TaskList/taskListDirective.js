import app from './modules/main'

// Task List
app.directive('taskList', function () {
    return {
      restrict: 'E',
      templateUrl: './js/modules/TaskList/taskList.html',
      scope: {
        
      },
      controller: function ($scope) {
      
      }
    }
  });