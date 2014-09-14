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
    var principalElement = angular.module('appPrincipal', []).
        controller('principalController', ['$scope',"desLoguearse","$rootScope",
            function ($scope,desloguearse,$rooScope){

                $scope.desLoguearse = desloguearse.desLoguearse;

                $scope.sortear = function(){
                    console.log('sorteo')
                }

            }]).config(function($httpProvider){
                $httpProvider.defaults.headers.common['X-CSRFToken'] = CSRF_TOKEN;
            }).directive('casillaSorteo',['$rootScope','$compile',
            function($rootScope,$compile){
                return{
                    restrict: 'EA',
                    controller: 'principalController',
                    replace: true,
                    template: function(scope,element){
                        return "<div class='principalBox' >" +
                                    "<p>Bienvenido, porfavor oprima el siguiente boton para hacer el sorteo</p>" +
                                    "<button ng-click='sortear()'>Hacer sorteo</button>" +
                                "</div>";
                    },
                    scope:true,
                    link: function(scope, element, attrs){
                            console.log('algo');
                    }
                }
            }]).service('desLoguearse', ['$http',
            function($http){
                this.desLoguearse = function(){
                    $http({
                        method: 'GET',
                        url: '/desLoguearse/'
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

            }])
}
    )(window, window.angular);