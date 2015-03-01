angular
  .module('checkregister')
  .service('CheckRegister', function ($q) {
    function loadCSV (csv, cb) {
      Papa.parse(csv, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: cb
      });
    }

    return {
      cache: {},

      getSpendingByVendor: function (vendor) {
        console.log(this.cache);

        var matches = _.filter(this.cache, {
          name: vendor
        });

        console.log(matches);

        return matches;
      },

      loadDataForYear: function (year) {
        console.log('called');

        var self = this;

        var d = $q.defer();

        loadCSV('/data/' + year + '.csv', function (results) {
          // cache the current year for future operations
          self.cache = results.data;

          // get unique vendors
          var vendors = _.pluck(results.data, 'name');
          vendors = _.uniq(vendors);

          // get totals for each vendor
          var vendorTotals = {};
          angular.forEach(results.data, function (item) {
            if (!vendorTotals[item.name]) {
              vendorTotals[item.name] = {
                name: item.name,
                amount: 0
              };
            }
            vendorTotals[item.name].amount += item.amount;
          });

          d.resolve({
            vendors: vendors,
            vendorAmounts: vendorTotals
          });
        });

        return d.promise;
      }
    };
  });