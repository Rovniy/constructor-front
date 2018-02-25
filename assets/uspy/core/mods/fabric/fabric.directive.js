(function () {
    'use strict';

    angular
        .module('uspy')
        .directive('fabric', fabric)
        .directive('parentClick', parentClick);

    fabric.$inject = ['$timeout', 'fabricCanvas'];

    function fabric($timeout, fabricCanvas) {
        return {
            scope: {
                fabric: '='
            },
            controller: function ($scope, $element) {
                fabricCanvas.setElement($element);
                fabricCanvas.createCanvas();

                // Continue rendering the canvas until the user clicks
                // to avoid the "calcOffset" bug upon load.
                $('body').on('click', 'canvas', function () {
                    if ($scope.fabric.setUserHasClickedCanvas) {
                        $scope.fabric.setUserHasClickedCanvas(true);
                    }
                });

                //
                // Watching Controller Variables
                // ============================================================
                $scope.$watch('fabric.canvasBackgroundColor', function (newVal) {
                    if ($scope.fabric.setCanvasBackgroundColor) {
                        $scope.fabric.setCanvasBackgroundColor(newVal);
                    }
                });

                $scope.$watch('fabric.selectedObject.text', function (newVal) {
                    if (typeof newVal === 'string') {
                        $scope.fabric.setText(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.fontSize', function (newVal) {
                    if (typeof newVal === 'string' || typeof newVal === 'number') {
                        $scope.fabric.setFontSize(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.lineHeight', function (newVal) {
                    if (typeof newVal === 'string' || typeof newVal === 'number') {
                        $scope.fabric.setLineHeight(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.textAlign', function (newVal) {
                    if (typeof newVal === 'string') {
                        $scope.fabric.setTextAlign(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.fontFamily', function (newVal) {
                    if (typeof newVal === 'string' && newVal) {
                        $scope.fabric.setFontFamily(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.opacity', function (newVal) {
                    if (typeof newVal === 'string' || typeof newVal === 'number') {
                        $scope.fabric.setOpacity(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.fill', function (newVal) {
                    if (typeof newVal === 'string') {
                        $scope.fabric.setFill(newVal);
                        $scope.fabric.render();
                    }
                });

                $scope.$watch('fabric.selectedObject.tint', function (newVal) {
                    if (typeof newVal === 'string') {
                        $scope.fabric.setTint(newVal);
                        $scope.fabric.render();
                    }
                });
            }
        };
    }


    parentClick.$inject = ['$timeout'];

    function parentClick($timeout) {
        return {
            scope: {
                parentClick: '&'
            },
            link: function (scope, element) {
                element.mousedown(function () {
                    $timeout(function () {
                        scope.parentClick();
                    });
                })
                    .children()
                    .mousedown(function (e) {
                        e.stopPropagation();
                    });
            }
        };

    }
})();
