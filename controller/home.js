define(['app','layer','css!../custom/css/home/home.css'],function (app, layer, require) {

	var homeDataURL ="data/home.json";
	app.controller('home', function($scope, httpService,pagingService) {

		httpService.get(homeDataURL, function(resp){
			//数据源
			$scope.homeData = resp.homeData.slice(0,4);
			$scope.Data = resp.homeData;
			//每页显示
			$scope.pageSize = 4;
			//分页数
			$scope.pages = Math.ceil($scope.Data.length / $scope.pageSize);
			$scope.newPages = $scope.pages > 4 ? 4 : $scope.pages;
			$scope.pageList = [];
			$scope.selPage = 1;
			//设置表格数据源(分页)
			$scope.setData = function () {
				//通过当前页数筛选出表格当前显示数据
				$scope.items = $scope.Data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
			}
			$scope.items = $scope.Data.slice(0, $scope.pageSize);
			//分页要repeat的数组
			for (var i = 0; i < $scope.newPages; i++) {
				$scope.pageList.push(i + 1);
			}
			//打印当前选中页索引
			$scope.selectPage = function (page) {
			//不能小于1大于最大
				if (page < 1 || page > $scope.pages) return;
			//最多显示分页数5
				if (page > 2) {
			//因为只显示5个页数，大于2页开始分页转换
					var newpageList = [];
					for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
						newpageList.push(i + 1);
					}
					$scope.pageList = newpageList;
				}
				$scope.selPage = page;
				$scope.setData();
				$scope.isActivePage(page);
				console.log("选择的页：" + page);
			};
			//设置当前选中页样式
			$scope.isActivePage = function (page) {
				return $scope.selPage == page;
			};
			//上一页
			$scope.Previous = function () {
				$scope.selectPage($scope.selPage - 1);
			}
			//下一页
			$scope.Next = function () {
				$scope.selectPage($scope.selPage + 1);
			};


		});

	});
	//发生异常错误的时候显示错误信息
	requirejs.onError = function (err) {
		console.log(err.requireType);
		if (err.requireType === 'timeout') {
			console.log('modules: ' + err.requireModules);
		}

		throw err;
	};
});
