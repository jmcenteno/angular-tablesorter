angular.module('angular-tablesorter', [])

.directive('tablesorter', ['$timeout', function ($timeout) {

	var tpl = '<table><thead><tr></tr></thead><tbody></tbody></table>'

	return {
		restrict: 'E',
		replace: true,
		template: tpl,
		scope: {},
		link: function ($scope, iElement, iAttrs) {
			
			var options = $scope.$eval(iAttrs.options)
			
			var config = {
				widgets: [],
				widgetOptions: {

				}
			}

			angular.extend(config, options);

			$scope.$watch(function () {
			
				return $scope.$eval(iAttrs.data);
			
			}, function (data) {

				if (angular.isDefined(data)) {

					angular.forEach(data[0], function (item, key) {
						iElement.find('thead tr').append('<th>' + key + '</th>');
					});

					angular.forEach(data, function (item, index) {

						var row = angular.element('<tr/>');

						angular.forEach(item, function (value, key) {
							row.append('<td>' + value + '</td>')
						});

						iElement.find('tbody').append(row);

					});

					iElement.tablesorter(config);

				}

			}, true);			

		}
	};
}])