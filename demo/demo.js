angular.module('gridview-demo', ['ngRoute', 'ngui-gridview-component'])
      .config(function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/gridview', {
                templateUrl: '/demo/gridview/view.html',
                controller: GridviewCtrl,
                page:'gridview'
            })
      })

      .run(['$rootScope', '$route', function ($rootScope, $route) {
            $rootScope.$on('$routeChangeSuccess', function () {
              $rootScope.$pageName = document.title = $route.current.page;
            });
      }])
;

angular.module('ngui-gridview-component', [
        'ngui-gridview',
        'ngui-paging'
])
.config(function ($nguiGridConfigProvider) {
        $nguiGridConfigProvider.setBaseTemplateUrl('/template');
})
.config(function ($nguiConfigProvider) {
        $nguiConfigProvider.setBaseTemplateUrl('/bower_components/ngui-paging/tpl-bootstrap');
})
;
