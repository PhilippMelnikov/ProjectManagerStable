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