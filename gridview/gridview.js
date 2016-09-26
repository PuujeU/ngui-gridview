(function () {
    'use strict';
    /* global angular */
    var nguiModule = angular.module('ngui-gridview', []);


    nguiModule.factory('$nguiGridview', ['$nguiGridConfig',
        function ($nguiGridConfig) {
            return function (options) {
                var opts = options || {};
                var onChangeListeners = [];
                var self = {
                    order: {},
                    filter: {},
                    onChange: function (handle) {
                        onChangeListeners.push(handle);
                    },
                    $onChange: function () {
                        onChangeListeners.forEach(function (handle) {
                            handle(self);
                        });
                    },
                    get params() {
                        return {
                            order: self.order,
                            filter: self.filter
                        }
                    }
                };

                return self;
            };
        }
    ]);

    nguiModule.directive('nguiGridview', ['$nguiGridConfig', '$nguiGridview',
        function ($nguiGridConfig, $nguiGridview) {
            return {
                restrict: 'A',
                scope: {
                    gridview: '=nguiGridview',
                    onChange: '&'
                },
                controller: ['$scope',
                  function ($scope) {
                      var $gridview = this.$gridview = $scope.gridview || ($scope.gridview = $nguiGridview());
                      $gridview.onChange(function () {
                          if ($scope.onChange) {
                              $scope.onChange();
                          }
                      });
                  }]
            }


        }
    ]);

    nguiModule.directive('nguiGridviewOrder', ['$nguiGridConfig',
        function ($nguiGridConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                transclude: true,
                //replace: true,
                scope: {
                    field: '@nguiGridviewOrder'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiGridConfig.baseTemplateUrl + '/order.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$order = {
                        get status() {
                            return $ctrl.$gridview.order[$scope.field];
                        },
                        flag: function (flag) {
                            var old = $ctrl.$gridview.order[$scope.field];
                            if (old !== flag) {
                                $ctrl.$gridview.order[$scope.field] = flag;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    }
                    $elem.append($tran());
                }
            };
        }
    ]);

    nguiModule.directive('nguiGridviewFilterNumber', ['$nguiGridConfig',
        function ($nguiGridConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                scope: {
                    field: '@nguiGridviewFilterNumber'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiGridConfig.baseTemplateUrl + '/filter-number.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$filter = {
                        get query() {
                            return $ctrl.$gridview.filter[$scope.field];
                        },
                        set query(value) {
                            var old = $ctrl.$gridview.filter[$scope.field];
                            if (old !== value) {
                                $ctrl.$gridview.filter[$scope.field] = value;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    };
                }
            };
        }
    ]);

    nguiModule.directive('nguiGridviewFilterText', ['$nguiGridConfig',
        function ($nguiGridConfig) {
            return {
                restrict: 'A',
                require: '^nguiGridview',
                scope: {
                    field: '@nguiGridviewFilterText'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiGridConfig.baseTemplateUrl + '/filter-text.htm';
                },
                link: function ($scope, $elem, $attrs, $ctrl, $tran) {
                    $scope.$filter = {
                        get query() {
                            return $ctrl.$gridview.filter[$scope.field];
                        },
                        set query(value) {
                            var old = $ctrl.$gridview.filter[$scope.field];
                            if (old !== value) {
                                $ctrl.$gridview.filter[$scope.field] = value;
                                $ctrl.$gridview.$onChange();
                            }
                        }
                    };
                }
            };
        }
    ]);

    nguiModule.provider("$nguiGridConfig", function () {
      var baseTemplateUrl = "/ngui-gridview";

      return {
        setBaseTemplateUrl: function (url) {
          baseTemplateUrl = url;
        },
        $get: function () {
          return {
            get baseTemplateUrl() {
              return baseTemplateUrl;
            }
          };
        }
      };

    });


})();
