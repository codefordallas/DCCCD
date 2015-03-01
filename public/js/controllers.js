angular
  .module('checkregister')
  .controller('SpendingByYear', function ($scope, $q, CheckRegister) {

    angular.extend($scope, {
      vendors: [],

      vendorAmounts: {},

      yearToAnalyze: 2010,

      selectedVendor: null,

      spendingByVendor: {
        data: []
      },

      selectVendor: function (vendor) {
        $scope.selectedVendor = vendor;
        var data = CheckRegister.getSpendingByVendor(vendor);

        $scope.spendingByVendor.data = data;
      },

      init: function () {
        CheckRegister
          .loadDataForYear($scope.yearToAnalyze)
          .then(function (overrides) {
            angular.extend($scope, overrides);
          });
      }

    });

    $scope.init();

    $scope.$watch('yearToAnalyze', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        CheckRegister
          .loadDataForYear(newVal)
          .then(function (overrides) {
            angular.extend($scope, overrides);
          });
      }
    });
  });