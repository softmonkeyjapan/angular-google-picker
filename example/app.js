angular.module('GooglePickerExample', ['lk-google-picker'])

.config(['lkGoogleSettingsProvider', function(lkGoogleSettingsProvider) {

  // Configure the API credentials here
  lkGoogleSettingsProvider.configure({
    apiKey   : 'AIzaSyAEu079vZFFeuFjpfWOrcmw2uGxISgmWwI',
    clientId : '20787361493-372fi66o31k7t4t2ha3nvj5j36blm417.apps.googleusercontent.com',
    scopes   : ['https://www.googleapis.com/auth/drive'],
    features : ['MULTISELECT_ENABLED'],
    views    : [
      'DocsView().setIncludeFolders(true)',
      'DocsUploadView().setIncludeFolders(true)'
    ]
  });
}])

.filter('getExtension', function() {
  return function(url) {
    return url.split('.').pop();
  };
})

.controller('ExampleCtrl', ['$scope', function($scope) {
  $scope.files = [];
}]);
