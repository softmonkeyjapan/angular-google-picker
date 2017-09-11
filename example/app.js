angular.module('GooglePickerExample', ['lk-google-picker'])

.config(['lkGoogleSettingsProvider', function (lkGoogleSettingsProvider) {

  // Configure the API credentials here
  lkGoogleSettingsProvider.configure({
    apiKey   : 'AIzaSyAEu079vZFFeuFjpfWOrcmw2uGxISgmWwI',
    clientId : '20787361493-372fi66o31k7t4t2ha3nvj5j36blm417.apps.googleusercontent.com'
  });
}])

.filter('getExtension', function () {
  return function (url) {
    return url.split('.').pop();
  };
})

.controller('ExampleCtrl', ['$scope', 'lkGoogleSettings', function ($scope, lkGoogleSettings) {
  $scope.files     = [];
  $scope.languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국' },
  ];

  // Check for the current language depending on lkGoogleSettings.locale
  $scope.initialize = function () {
    angular.forEach($scope.languages, function (language, index) {
      if (lkGoogleSettings.locale === language.code) {
        $scope.selectedLocale = $scope.languages[index];
      }
    });
  };

  // Callback triggered after Picker is shown
  $scope.onLoaded = function () {
    console.log('Google Picker loaded!');
  }

  // Callback triggered after selecting files
  $scope.onPicked = function (docs) {
    angular.forEach(docs, function (file, index) {
      $scope.files.push(file);
    });
  }

  // Callback triggered after clicking on cancel
  $scope.onCancel = function () {
    console.log('Google picker close/cancel!');
  }

  // Define the locale to use
  $scope.changeLocale = function (locale) {
    lkGoogleSettings.locale = locale.code;
  };
}]);
