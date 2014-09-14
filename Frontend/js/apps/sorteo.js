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

                $scope.sorteados = null;


                $scope.intentos = 2;



                $scope.getSorteados = function(){
                    desloguearse.getSorteados($scope);
                };

                $scope.sortear = function(){
                    console.log('sorteando');
                    var randomPosition= null;
                    if($scope.sorteados && $scope.intentos > 0){
                        if($scope.elegidoElement){
                            forEach($scope.elegidoElement,function(value,key){
                                $scope.elementDom.removeChild($scope.elegidoElement[key]);
                            })
                        }
                        randomPosition = Math.floor((Math.random() * ($scope.sorteados.length)) + 1)-1;
                        randomPosition = (randomPosition < 0 ) ? 0 : randomPosition;
                        persona = $scope.sorteados[randomPosition];
                        $scope.elegido = persona;
                        console.log($scope.elegido);
                        elegidoElement = document.createElement('p');
                        elegidoElement.innerHTML = $scope.elegido.fields.name;
                        $scope.elementDom.appendChild(elegidoElement);
                        imagen = document.createElement('img');
                        imagen.src ="/static/media/img/"+$scope.elegido.fields.username+".jpg";
                        $scope.elementDom.appendChild(imagen);
                        $scope.elegidoElement = {name: elegidoElement, img: imagen};
                        $scope.intentos--;
                        if($scope.intentos <= 0){
                            desloguearse.postSorteado($scope)
                        }
                    }
                }

                $scope.postSorteado = function(){
                    desloguearse.postSorteado($scope);
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
                                    "<p>Bienvenido, porfavor oprima el siguiente boton para hacer el sorteo<br> recuerde" +
                                    "que solo tiene 2 intentos</p>" +
                                "</div>";
                    },
                    scope:true,
                    link: function(scope, element, attrs){
                        scope.elementDom = element[0];
                        mensaje = document.createElement('p');
                        mensaje.innerHTML = "cargando ..."
                        scope.elementDom.appendChild(mensaje);
                        scope.mensajeElement = mensaje;
                        scope.getSorteados();
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

                this.getSorteados = function(scope){

                    $http({
                        method: 'GET',
                        url: '/getSorteados/'
                    }).success(function (data,status) {
                        scope.sorteados = data;
                        boton = document.createElement('button');
                        boton.innerHTML = 'sortear'
                        boton.onclick = scope.sortear
                        scope.elementDom.removeChild(scope.mensajeElement);
                        scope.elementDom.appendChild(boton);
                        console.log(scope.sorteados);
                    }).error(function(data,status){
                        alert("Error al cargar la informacion del usuario")
                    });
                };

                this.postSorteado = function(scope){
                    var sorteado = JSON.stringify({id: scope.elegido.pk, username: scope.elegido.username});
                    $http({
                        method: 'POST',
                        url: '/postSorteado/',
                        data: sorteado
                    }).success(function (data,status) {
                        scope.sorteados = data;
                        console.log(scope.sorteados);
                    }).error(function(data,status){
                        alert("Error al cargar la informacion del usuario")
                    });
                };


            }])
}
    )(window, window.angular);