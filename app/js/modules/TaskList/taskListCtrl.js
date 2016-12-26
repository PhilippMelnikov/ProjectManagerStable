import app from './modules/main'

app.controller('TaskListCtrl', function($scope, $mdDialog, projectService, finalTaskListService) {

   $scope.myDate = new Date();
   $scope.myTask = " ";
   var currentProject = projectService.getCurrentProject();

   $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);


  $scope.$on('switchProject', function (event, project) {
    projectService.setCurrentProject(project);
    currentProject = projectService.getCurrentProject();
    $scope.finalTaskList = finalTaskListService.formTaskList(project);
  });


  $scope.showAddTaskDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './js/modules/TaskList/add.task.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(date, text) {
      $scope.status = 'You said the information was "' + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };  

    function formListForShow ()
    {
       $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
    }

    // push task into current project
    function addTask (task)
    {
      projectService.addTask(task);
      formListForShow ();
    }

    function DialogController($scope, $mdDialog, taskService, projectService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
      var curProj = projectService.getCurrentProject();
    $scope.answer = function(date, text) {

       var task = {
        id: curProj.tasksIdCount,
        date: date,
        text: text
      };
      curProj.tasksQuantity+=1;
      curProj.tasksIdCount+=1;
      addTask(task);
      $mdDialog.hide("answer");

    };
  }

} );
