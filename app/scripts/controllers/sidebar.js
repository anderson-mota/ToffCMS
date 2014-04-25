/* global app:true */
'use strict';

app.controller('SidebarCtrl', function ($scope, $location) {

    // Navigation instances
    $scope.navigation = [
      {
        name: 'Dashboard',
        url: '/',
        icon: 'fa-dashboard'
      }, {
        name: 'Pages',
        url: '/pages',
        icon: 'fa-edit'
      }, {
        name: 'Gallery',
        url: '/gallery',
        icon: 'fa-picture-o'
      }, {
        name: 'Navigation',
        url: '/navigation',
        icon: 'fa-sitemap'
      }, {
        name: 'Settings',
        url: '/settings',
        icon: 'fa-wrench'
      }
    ];

    // Check if the current instance is active
    $scope.navClass = function (instance) {
      var path = $location.path();

      // if (path.substr(-1, 1) === '/') {
      //   path = path.substr(0, path.length-1);
      // }

      if (instance.url === path)
      {
        return 'active';
      }

      return '';
    };

  });
