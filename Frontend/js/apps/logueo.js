/**
 * Created by noescobar on 13/09/14.
 */

/**
 *
 * importante: toda documentacion encontrada en el documento se excusa de faltas ortograficas como el uso de las tildes y/o las letras
 * especiales del espanol, esto con el fin de no crear problema alguno con el formato del archivo javascript
 *
 */



(function(window, angular, undefined) {
    var forEach = angular.forEach;
    var logeoElemento = angular.module('appLogueo', []).
        controller('logueoController', ['$scope',"logueoLoadInfo","$rootScope",
            function ($scope,logueoLoadInfo,$rooScope){
                $scope.username = null;
                $scope.password = null;

                $scope.loguearse = function(){
                    logueoLoadInfo.loguearse($scope.username,$scope.password);
                };

                $scope.probarsession = function(){
                    logueoLoadInfo.pruebaSession();
                }

            }]).config(function($httpProvider){
                $httpProvider.defaults.headers.common['X-CSRFToken'] = CSRF_TOKEN;
            }).directive('logueoElement',['$rootScope','$compile','logueoLoadInfo',
            function($rootScope,$compile,logueoLoadInfo){
                return{
                    restrict: 'EA',
                    controller: 'logueoController',
                    replace: true,
                    template: function(scope,element){
                        return "<div class='logueo' >" +
                                    "username: <input type='text' ng-model='username'></input><br>" +
                                    "password: <input type='password' ng-model='password'></input><br>"+
                                    "<button ng-click='loguearse()'> conectar</button>"+
                                "</div>";
                    },
                    scope:true,
                    link: function(scope, element, attrs){
                            console.log('algo');
                    }
                }
            }]).service('logueoLoadInfo', ['$http',
            function($http){
                this.loguearse = function(username,password){
                    var user= JSON.stringify({'user':{'username': username,'password': password}});
                    $http({
                        method: 'POST',
                        url: '/loguearse/',
                        data: user
                    }).success(function (data,status) {
                        $('body').css({
                            cursor : ''
                        });
                        location.reload();
                    }).error(function(data,status){
                        alert("Error al cargar la informacion del usuario")
                    });
                    $('body').css({
                        cursor : 'wait'
                    });
                };

                this.pruebaSession = function(){

                    $http({
                        method: 'GET',
                        url: '/puebaSession/'
                    }).success(function (data,status) {
                        console.log(data);
                    }).error(function(data,status){
                        alert("Error al cargar la informacion del usuario")
                    });
                };

            }])
}
    )(window, window.angular);