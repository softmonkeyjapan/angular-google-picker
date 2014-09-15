'use strict';

describe('lkGoogleSettingsProvider', function() {

  var googleSettings;

  beforeEach(module('lk-google-picker', function(lkGoogleSettingsProvider) {
    googleSettings = lkGoogleSettingsProvider;
  }));

  it('should have a configure method', inject(function(lkGoogleSettings) {
    expect(googleSettings.configure).toBeDefined();
  }));

  describe('settings', function() {
    it('should have default values', inject(function(lkGoogleSettings) {
      expect(lkGoogleSettings.apiKey).toBeNull();
      expect(lkGoogleSettings.clientId).toBeNull();
      expect(lkGoogleSettings.scopes).toEqual(['https://www.googleapis.com/auth/drive']);
      expect(lkGoogleSettings.features).toEqual(['MULTISELECT_ENABLED']);
      expect(lkGoogleSettings.views).toEqual([
        'DocsView().setIncludeFolders(true)',
        'DocsUploadView().setIncludeFolders(true)'
      ]);
      expect(lkGoogleSettings.locale).toBe('en');
    }));

    describe('assign with configure()', function() {
      beforeEach(module('lk-google-picker', function(lkGoogleSettingsProvider) {
        lkGoogleSettingsProvider.configure({
          apiKey   : 'qwertyuiopasdfghjkl',
          clientId : 'lkjhgfdsapoiuytrewq.apps.googleusercontent.com',
          scopes   : ['scope_url'],
          features : ['first_feature'],
          views    : ['first_view', 'second_view'],
          locale: 'ja'
        });
      }));

      it('should change values', inject(function(lkGoogleSettings) {
        expect(lkGoogleSettings.apiKey).toBe('qwertyuiopasdfghjkl');
        expect(lkGoogleSettings.clientId).toBe('lkjhgfdsapoiuytrewq.apps.googleusercontent.com');
        expect(lkGoogleSettings.scopes).toEqual(['scope_url']);
        expect(lkGoogleSettings.features).toEqual(['first_feature']);
        expect(lkGoogleSettings.views).toEqual(['first_view', 'second_view']);
        expect(lkGoogleSettings.locale).toBe('ja');
      }));
    });

    describe('assign with direct access', function() {
      beforeEach(module('lk-google-picker', function(lkGoogleSettingsProvider) {
        lkGoogleSettingsProvider.apiKey   = 'qazwsxedc';
        lkGoogleSettingsProvider.clientId = 'okmijnuhb.apps.googleusercontent.com';
        lkGoogleSettingsProvider.scopes   = ['other_scope'];
        lkGoogleSettingsProvider.features = ['other_feature'];
        lkGoogleSettingsProvider.views    = ['other_view'];
        lkGoogleSettingsProvider.locale   = 'fr';
      }));

      it('should change values', inject(function(lkGoogleSettings) {
        expect(lkGoogleSettings.apiKey).toBe('qazwsxedc');
        expect(lkGoogleSettings.clientId).toBe('okmijnuhb.apps.googleusercontent.com');
        expect(lkGoogleSettings.scopes).toEqual(['other_scope']);
        expect(lkGoogleSettings.features).toEqual(['other_feature']);
        expect(lkGoogleSettings.views).toEqual(['other_view']);
        expect(lkGoogleSettings.locale).toBe('fr');
      }));
    });
  });
});
