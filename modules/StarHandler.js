"use strict";

var Star = angular.module('StarHandler', ['FigureGenerator', 'GeoParser','ViewHandler']);

Star.directive('star', function(){
    return{
        restric: 'E',
        scope: {},
        controller: function($scope, FigGen, GeoParser, Model){
            $scope.model = Model;
            $scope.vector = GeoParser.getParser;
            $scope.createStar = FigGen.star;
        },
        link: function($scope, $element, $attrs){
            $scope.model.star = $scope.createStar(parseInt($attrs.color), $attrs.size);
            $scope.vector = $scope.vector($attrs.range);
            $scope.model.star.position.copy($scope.vector(10,-90));
            $scope.model.scene.add($scope.model.star);
        }
    }
});
/**
 * Created by Christer on 15.05.2015.
 */