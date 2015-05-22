"use strict";

var WorldView = angular.module('WorldView', []);

WorldView.directive('worldview', function(){
    return {
        scope:{},
        restrict: 'E',

        controller: function($scope, $element, View, Star, Space, World){

            View.renderer.setSize(window.innerWidth,window.innerHeight);
            window.addEventListener("resize", function(){
                View.renderer.setSize((window.innerWidth) , (window.innerHeight));
            }, false);

            View.camera.position.setZ(300);
            View.scene.add(View.camera);
            window.addEventListener('resize',function(){
                View.camera.aspect = (window.innerWidth) / (window.innerHeight);
                View.camera.updateProjectionMatrix();
            }, false);

            $element.append(WorldView.renderer.domElement);


            View.scene.add(Star.object);
            View.scene.add(Space.object);

            View.scene.add(new THREE.AmbientLight(0xe0e0e0));


             var requestUpdate = function (view) {  // Adds the scene model "WorldView" to the animation loop
                return function request() {

                    for(var i = 0; i < view.animations.length; i++){
                        view.animations[i]();
                    }

                    view.renderer.render(view.scene, view.camera);
                    window.setTimeout(requestAnimationFrame(request), (1000/60));
                }
            }
            $scope.animate = requestUpdate(WorldView);
        },
        link: function($scope){
            $scope.animate();
        }
    }
});


WorldView.factory('World', ['WorldView','FigGen',function(WorldView, FigGen){

    var rad = 100;
    var world = FigGen.world(rad,300);
    world.name = "world";

    return{
        object: world,
        radius: rad,
        rotation : 0.001,
        add: world.add,
        rotate: function(){
            this.object.rotation.y += this.rotation;
        },
        setName: function(name){
            this.object.name = name;
        }
    }
}]);


WorldView.factory('View',[function(){
    return {
        renderer: new THREE.WebGLRenderer(),
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 5000),
        animations: []
    }
}]);

WorldView.factory('Space',['FigGen', function(FigGen)
{
    return{
        object: FigGen.universe(),
        rotation: 0.001,
        rotate: function(){
            this.object.rotation.y += this.rotation;
        }
    };
}]);


WorldView.factory('Star', ['FigGen','GeoParser', function(FigGen,GeoParser){
    return {
        object: FigGen.star(0xffffff,  0.3),
        range: 1000,
        moveTo: function(lat,lon){
            this.object.position = GeoParser(lat,lon,this.range);
        }
    };
}]);


WorldView.factory('GeoParser', function(){
    return function(la, lo, rad){
        return new THREE.Vector3(
            rad * Math.cos(la) * Math.cos(lo),
            rad * Math.sin(la),
            rad * Math.cos(la) * Math.sin(lo)
        );
    };
});


WorldView.factory('FigGen', function(){
    return {
        event: function(color){
            if(color === undefined){
                color = 0xffffff
            }
            return new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 10,10),
                new THREE.MeshBasicMaterial({color: color})
            );
        },

        transfer: function(){
            console.log("Transfer figure is not defined ");
        },

        world: function(rad, seg){
            return new THREE.Mesh(
                new THREE.SphereGeometry(rad, seg, seg),
                new THREE.MeshPhongMaterial({
                    map:            THREE.ImageUtils.loadTexture('img/earth.jpg'),
                    bumpMap:        THREE.ImageUtils.loadTexture('img/bump.jpg'),
                    bumpScale:      2,
                    specularMap:    THREE.ImageUtils.loadTexture('img/water.png'),
                    specular:       new THREE.Color('grey')
                })
            );
        },
        star: function(color, size){
            return new THREE.DirectionalLight(color, size)
        },
        universe: function(){
            return new THREE.Mesh(
                new THREE.SphereGeometry(1000, 300, 300),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/stars.png'),
                    side: THREE.BackSide })
            );
        }
    }
});
