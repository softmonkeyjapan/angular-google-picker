/*
 * angular-google-picker
 *
 * Interact with the Google API Picker
 * More information about the Google API can be found at https://developers.google.com/picker/
 *
 * (c) 2014 Loic Kartono
 * License: MIT
 */

angular.module('lk-google-picker', [])

.provider('lkGoogleSettings', function() {
  this.apiKey   = null;
  this.clientId = null;
  this.scopes   = ['https://www.googleapis.com/auth/drive'];
  this.features = ['MULTISELECT_ENABLED'];
  this.views    = [
    'DocsView().setIncludeFolders(true)',
    'DocsUploadView().setIncludeFolders(true)'
  ];
  this.locale   = 'en'; // Default to English

  /**
   * Provider factory $get method
   * Return Google Picker API settings
   */
  this.$get = function() {
    return {
      apiKey   : this.apiKey,
      clientId : this.clientId,
      scopes   : this.scopes,
      features : this.features,
      views    : this.views,
      locale   : this.locale
    }
  };

  /**
   * Set the API config params using a hash
   */
  this.configure = function(config) {
    for (key in config) {
      this[key] = config[key];
    }
  };
})

.directive('lkGooglePicker', ['lkGoogleSettings', function(lkGoogleSettings) {
  return {
    restrict: 'A',
    scope: {
      pickerFiles: '='
    },
    link: function(scope, element, attrs) {
      var accessToken = null;

      /**
       * Load required modules
       */
      function instanciate() {
        gapi.load('auth', { 'callback': onApiAuthLoad });
        gapi.load('picker');
      }

      /**
       * OAuth autorization
       * If user is already logged in, then open the Picker modal
       */
      function onApiAuthLoad() {
        if (gapi.auth.getToken() && accessToken) {
          openDialog();
        } else {
          gapi.auth.authorize({
            'client_id' : lkGoogleSettings.clientId,
            'scope'     : lkGoogleSettings.scopes,
            'immediate' : false
          }, handleAuthResult);
        }
      }

      /**
       * Google API OAuth response
       */
      function handleAuthResult(result) {
        if (result && !result.error) {
          accessToken = result.access_token;
          openDialog();
        }
      }

      /**
       * Everything is good, open the files picker
       */
      function openDialog() {
        var picker = new google.picker.PickerBuilder()
                               .setLocale(lkGoogleSettings.locale)
                               .setDeveloperKey(lkGoogleSettings.apiKey)
                               .setOAuthToken(accessToken)
                               .setCallback(pickerResponse);

        if (lkGoogleSettings.features.length > 0) {
          angular.forEach(lkGoogleSettings.features, function(feature, key) {
            picker.enableFeature(google.picker.Feature[feature]);
          });
        }

        if (lkGoogleSettings.views.length > 0) {
          angular.forEach(lkGoogleSettings.views, function(view, key) {
            var view = eval('new google.picker.' + view);
            picker.addView(view);
          });
        }

        picker.build().setVisible(true);
      }

      /**
       * Callback invoked when interacting with the Picker
       * data: Object returned by the API
       */
      function pickerResponse(data) {
        if (data.action == google.picker.Action.PICKED) {
          gapi.client.load('drive', 'v2', function() {
            angular.forEach(data.docs, function(file, index) {
              scope.pickerFiles.push(file);
            });
            scope.$apply();
          });
        }
      }

      gapi.load('auth');
      gapi.load('picker');

      element.bind('click', function(e) {
        instanciate();
      });
    }
  }
}]);
