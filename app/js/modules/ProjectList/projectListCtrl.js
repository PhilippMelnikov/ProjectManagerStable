import app from './modules/main'

// Project List
app.controller('ProjectListCtrl', function($scope, $rootScope, $mdDialog, projectService) {
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

   $scope.showAddProjectDialog = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .clickOutsideToClose(true)
      .title('What would you name your brand new project?')
      .textContent('Bowser is a common name.')
      .placeholder('Project name')
      .ariaLabel('Project name')
      .initialValue('Bowser')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      projectService.addProject(result);
      $scope.status = 'New project added.';
    }, function() {
      $scope.status = 'Adding new project canceled.';
    });
  };


} );