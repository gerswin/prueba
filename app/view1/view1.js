'use strict'

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    activetab: 'dashboard'
  })
}])

.controller('View1Ctrl', ['$scope', '$interval', 'getData', '$route', function ($scope, $interval, getData, $route) {
  $scope.$route = $route
  function shuffle (array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex

      // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

        // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  $scope.speedData = {
    values: [
        [0, 0, 0, 0, 0, 0]
    ],
    labels: []
  }
  $scope.onClick = function (points, evt) {
    console.log(points, evt)
  }

  $scope.colors = ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']

  $scope.formatData = function (data, init) {
    let speed = []
    let labels = []
    angular.forEach(data, function (value, key) {
      speed.push(value.data.speed)
      labels.push(value.zoneId)
    })
    $scope.speedData.values = [shuffle(speed)]
    $scope.speedData.labels = labels
    if (init !== true) {
      $scope.$apply()
    }
      //
  }
  getData().then(function (res) {
    $scope.formatData(res.data, true)
    setInterval(function () {
      $scope.formatData(res.data)
    }, 60000)
  })
}])
  .factory('getData', ['$http', function ($http) {
    return function getData () {
      return $http.get('https://94tfltwre9.execute-api.us-west-2.amazonaws.com/beta')
    }
  }])
