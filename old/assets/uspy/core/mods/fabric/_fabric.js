(function () {
    'use strict';

    angular
        .module('uspy')
        .factory('fabricFactory', fabricFactory);

    fabricFactory.$inject = ['$timeout', '$window', 'fabricCanvas', 'fabricDirtyStatus'];

    function fabricFactory($timeout, $window, fabricCanvas, fabricDirtyStatus) {
        return function (options) {

            let fabricWindow = $window.fabric;
            let canvas;
            let JSONObject;
            let self = angular.extend({
                canvasBackgroundColor: '#ffffff',
                canvasWidth: 800,
                canvasHeight: 500,
                canvasOriginalHeight: 800,
                canvasOriginalWidth: 500,
                maxContinuousRenderLoops: 100,
                continuousRenderTimeDelay: 0,
                editable: true,
                JSONExportProperties: [],
                loading: true,
                dirty: false,
                initialized: false,
                userHasClickedCanvas: false,
                downloadMultipler: 2,
                imageDefaults: {},
                textDefaults: {},
                shapeDefaults: {},
                windowDefaults: {
                    transparentCorners: false,
                    rotatingPointOffset: 25,
                    padding: 0
                },
                canvasDefaults: {
                    selection: true
                }
            }, options);

            function capitalize(string) {
                if (typeof string !== 'string') {
                    return '';
                }

                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function getActiveStyle(styleName, object) {
                object = object || canvas.getActiveObject();

                if (typeof object !== 'object' || object === null) {
                    return '';
                }

                return (object.getSelectionStyles && object.isEditing) ? (object.getSelectionStyles()[styleName] || '') : (object[styleName] || '');
            }

            function setActiveStyle(styleName, value, object) {
                object = object || canvas.getActiveObject();

                if (object.setSelectionStyles && object.isEditing) {
                    let style = {};
                    style[styleName] = value;
                    object.setSelectionStyles(style);
                } else {
                    object[styleName] = value;
                }

                self.render();
            }

            function getActiveProp(name) {
                let object = canvas.getActiveObject();

                return typeof object === 'object' && object !== null ? object[name] : '';
            }

            function setActiveProp(name, value) {
                let object = canvas.getActiveObject();
                object.set(name, value);
                self.render();
            }

            function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                let byteCharacters = atob(b64Data);
                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                let blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }

            function isHex(str) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/gi.test(str);
            }

            //
            // Canvas
            // ==============================================================
            self.renderCount = 0;
            self.render = function () {
                let objects = canvas.getObjects();
                for (let i in objects) {
                    objects[i].setCoords();
                }

                canvas.calcOffset();
                canvas.renderAll();
                self.renderCount++;
                //console.log('Render cycle:', self.renderCount);
            };

            self.setCanvas = function (newCanvas) {
                canvas = newCanvas;
                canvas.selection = self.canvasDefaults.selection;
            };

            self.setTextDefaults = function (textDefaults) {
                self.textDefaults = textDefaults;
            };

            self.setJSONExportProperties = function (JSONExportProperties) {
                self.JSONExportProperties = JSONExportProperties;
            };

            self.setCanvasBackgroundColor = function (color) {
                self.canvasBackgroundColor = color;
                canvas.setBackgroundColor(color);
                self.render();
            };

            self.setCanvasWidth = function (width) {
                self.canvasWidth = width;
                canvas.setWidth(width);
                self.render();
            };

            self.setCanvasHeight = function (height) {
                self.canvasHeight = height;
                canvas.setHeight(height);
                self.render();
            };

            self.setCanvasSize = function (width, height) {
                self.stopContinuousRendering();
                let initialCanvasScale = self.canvasScale;
                self.resetZoom();

                self.canvasWidth = width;
                self.canvasOriginalWidth = width;
                canvas.originalWidth = width;
                canvas.setWidth(width);

                self.canvasHeight = height;
                self.canvasOriginalHeight = height;
                canvas.originalHeight = height;
                canvas.setHeight(height);

                self.canvasScale = initialCanvasScale;
                self.render();
                self.setZoom();
                self.render();
                self.setZoom();
            };

            self.isLoading = function () {
                return self.isLoading;
            };

            self.deactivateAll = function () {
                console.log('canvas',canvas);
                canvas.discardActiveObject();
                self.deselectActiveObject();
                self.render();
            };

            self.clearCanvas = function () {
                canvas.clear();
                canvas.setBackgroundColor('#ffffff');
                self.render();
            };

            //
            // Creating Objects
            // ==============================================================
            self.addObjectToCanvas = function (object) {
                object.originalScaleX = object.scaleX;
                object.originalScaleY = object.scaleY;
                object.originalLeft = object.left;
                object.originalTop = object.top;

                canvas.add(object);
                self.setObjectZoom(object);
                canvas.setActiveObject(object);
                object.bringToFront();
                self.center();
                self.render();
            };

            //
            // Image
            // ==============================================================
            self.addImage = function (imageURL) {
                fabric.Image.fromURL(imageURL, function (object) {
                    object.id = self.createId();

                    for (let p in self.imageOptions) {
                        object[p] = self.imageOptions[p];
                    }

                    // Add a filter that can be used to turn the image
                    // into a solid colored shape.
                    let filter = new fabric.Image.filters.Tint({
                        color: '#ffffff',
                        opacity: 0
                    });
                    object.filters.push(filter);
                    object.applyFilters(canvas.renderAll.bind(canvas));

                    self.addObjectToCanvas(object);
                }, self.imageDefaults);
            };

            //
            // Shape
            // ==============================================================
            self.addShape = function (svgURL) {
                fabric.loadSVGFromURL(svgURL, function (objects) {
                    let object = fabric.util.groupSVGElements(objects, self.shapeDefaults);
                    object.id = self.createId();

                    for (let p in self.shapeDefaults) {
                        object[p] = self.shapeDefaults[p];
                    }

                    if (object.isSameColor && object.isSameColor() || !object.paths) {
                        object.setFill('#0088cc');
                    } else if (object.paths) {
                        for (let i = 0; i < object.paths.length; i++) {
                            object.paths[i].setFill('#0088cc');
                        }
                    }

                    self.addObjectToCanvas(object);
                });
            };

            //
            // Text
            // ==============================================================
            self.addText = function (str) {
                str = str || 'New Text';
                let object = new fabricWindow.Text(str, self.textDefaults);
                object.id = self.createId();

                self.addObjectToCanvas(object);
            };

            self.getText = function () {
                return getActiveProp('text');
            };

            self.setText = function (value) {
                setActiveProp('text', value);
            };

            //
            // Font Size
            // ==============================================================
            self.getFontSize = function () {
                return getActiveStyle('fontSize');
            };

            self.setFontSize = function (value) {
                setActiveStyle('fontSize', parseInt(value, 10));
                self.render();
            };

            //
            // Text Align
            // ==============================================================
            self.getTextAlign = function () {
                return capitalize(getActiveProp('textAlign'));
            };

            self.setTextAlign = function (value) {
                setActiveProp('textAlign', value.toLowerCase());
            };

            //
            // Font Family
            // ==============================================================
            self.getFontFamily = function () {
                let fontFamily = getActiveProp('fontFamily');
                return fontFamily ? fontFamily.toLowerCase() : '';
            };

            self.setFontFamily = function (value) {
                setActiveProp('fontFamily', value.toLowerCase());
            };

            //
            // Lineheight
            // ==============================================================
            self.getLineHeight = function () {
                return getActiveStyle('lineHeight');
            };

            self.setLineHeight = function (value) {
                setActiveStyle('lineHeight', parseFloat(value, 10));
                self.render();
            };

            //
            // Bold
            // ==============================================================
            self.isBold = function () {
                return getActiveStyle('fontWeight') === 'bold';
            };

            self.toggleBold = function () {
                setActiveStyle('fontWeight',
                    getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
                self.render();
            };

            //
            // Italic
            // ==============================================================
            self.isItalic = function () {
                return getActiveStyle('fontStyle') === 'italic';
            };

            self.toggleItalic = function () {
                setActiveStyle('fontStyle',
                    getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
                self.render();
            };

            //
            // Underline
            // ==============================================================
            self.isUnderline = function () {
                return getActiveStyle('textDecoration').indexOf('underline') > -1;
            };

            self.toggleUnderline = function () {
                let value = self.isUnderline() ? getActiveStyle('textDecoration').replace('underline', '') : (getActiveStyle('textDecoration') + ' underline');

                setActiveStyle('textDecoration', value);
                self.render();
            };

            //
            // Linethrough
            // ==============================================================
            self.isLinethrough = function () {
                return getActiveStyle('textDecoration').indexOf('line-through') > -1;
            };

            self.toggleLinethrough = function () {
                let value = self.isLinethrough() ? getActiveStyle('textDecoration').replace('line-through', '') : (getActiveStyle('textDecoration') + ' line-through');

                setActiveStyle('textDecoration', value);
                self.render();
            };

            //
            // Text Align
            // ==============================================================
            self.getTextAlign = function () {
                return getActiveProp('textAlign');
            };

            self.setTextAlign = function (value) {
                setActiveProp('textAlign', value);
            };

            //
            // Opacity
            // ==============================================================
            self.getOpacity = function () {
                return getActiveStyle('opacity');
            };

            self.setOpacity = function (value) {
                setActiveStyle('opacity', value);
            };

            //
            // FlipX
            // ==============================================================
            self.getFlipX = function () {
                return getActiveProp('flipX');
            };

            self.setFlipX = function (value) {
                setActiveProp('flipX', value);
            };

            self.toggleFlipX = function () {
                let value = self.getFlipX() ? false : true;
                self.setFlipX(value);
                self.render();
            };

            //
            // Align Active Object
            // ==============================================================
            self.center = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    activeObject.center();
                    self.updateActiveObjectOriginals();
                    self.render();
                }
            };

            self.centerH = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    activeObject.centerH();
                    self.updateActiveObjectOriginals();
                    self.render();
                }
            };

            self.centerV = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    activeObject.centerV();
                    self.updateActiveObjectOriginals();
                    self.render();
                }
            };

            //
            // Active Object Layer Position
            // ==============================================================
            self.sendBackwards = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.sendBackwards(activeObject);
                    self.render();
                }
            };

            self.sendToBack = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.sendToBack(activeObject);
                    self.render();
                }
            };

            self.bringForward = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.bringForward(activeObject);
                    self.render();
                }
            };

            self.bringToFront = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.bringToFront(activeObject);
                    self.render();
                }
            };

            //
            // Active Object Tint Color
            // ==============================================================
            self.isTinted = function () {
                return getActiveProp('isTinted');
            };

            self.toggleTint = function () {
                let activeObject = canvas.getActiveObject();
                activeObject.isTinted = !activeObject.isTinted;
                activeObject.filters[0].opacity = activeObject.isTinted ? 1 : 0;
                activeObject.applyFilters(canvas.renderAll.bind(canvas));
            };

            self.getTint = function () {
                let object = canvas.getActiveObject();

                if (typeof object !== 'object' || object === null) {
                    return '';
                }

                if (object.filters !== undefined) {
                    if (object.filters[0] !== undefined) {
                        return object.filters[0].color;
                    }
                }
            };

            self.setTint = function (tint) {
                if (!isHex(tint)) {
                    return;
                }

                let activeObject = canvas.getActiveObject();
                if (activeObject.filters !== undefined) {
                    if (activeObject.filters[0] !== undefined) {
                        activeObject.filters[0].color = tint;
                        activeObject.applyFilters(canvas.renderAll.bind(canvas));
                    }
                }
            };

            //
            // Active Object Fill Color
            // ==============================================================
            self.getFill = function () {
                return getActiveStyle('fill');
            };

            self.setFill = function (value) {
                let object = canvas.getActiveObject();
                if (object) {
                    if (object.type === 'text') {
                        setActiveStyle('fill', value);
                    } else {
                        self.setFillPath(object, value);
                    }
                }
            };

            self.setFillPath = function (object, value) {
                if (object.isSameColor && object.isSameColor() || !object.paths) {
                    object.setFill(value);
                } else if (object.paths) {
                    for (let i = 0; i < object.paths.length; i++) {
                        object.paths[i].setFill(value);
                    }
                }
            };

            //
            // Canvas Zoom
            // ==============================================================
            self.resetZoom = function () {
                self.canvasScale = 1;
                self.setZoom();
            };

            self.setZoom = function () {
                let objects = canvas.getObjects();
                for (let i in objects) {
                    objects[i].originalScaleX = objects[i].originalScaleX ? objects[i].originalScaleX : objects[i].scaleX;
                    objects[i].originalScaleY = objects[i].originalScaleY ? objects[i].originalScaleY : objects[i].scaleY;
                    objects[i].originalLeft = objects[i].originalLeft ? objects[i].originalLeft : objects[i].left;
                    objects[i].originalTop = objects[i].originalTop ? objects[i].originalTop : objects[i].top;
                    self.setObjectZoom(objects[i]);
                }

                self.setCanvasZoom();
                self.render();
            };

            self.setObjectZoom = function (object) {
                let scaleX = object.originalScaleX;
                let scaleY = object.originalScaleY;
                let left = object.originalLeft;
                let top = object.originalTop;

                let tempScaleX = scaleX * self.canvasScale;
                let tempScaleY = scaleY * self.canvasScale;
                let tempLeft = left * self.canvasScale;
                let tempTop = top * self.canvasScale;

                object.scaleX = tempScaleX;
                object.scaleY = tempScaleY;
                object.left = tempLeft;
                object.top = tempTop;

                object.setCoords();
            };

            self.setCanvasZoom = function () {
                let width = self.canvasOriginalWidth;
                let height = self.canvasOriginalHeight;

                let tempWidth = width * self.canvasScale;
                let tempHeight = height * self.canvasScale;

                canvas.setWidth(tempWidth);
                canvas.setHeight(tempHeight);
            };

            self.updateActiveObjectOriginals = function () {
                let object = canvas.getActiveObject();
                if (object) {
                    object.originalScaleX = object.scaleX / self.canvasScale;
                    object.originalScaleY = object.scaleY / self.canvasScale;
                    object.originalLeft = object.left / self.canvasScale;
                    object.originalTop = object.top / self.canvasScale;
                }
            };

            //
            // Active Object Lock
            // ==============================================================
            self.toggleLockActiveObject = function () {
                let activeObject = canvas.getActiveObject();
                if (activeObject) {
                    activeObject.lockMovementX = !activeObject.lockMovementX;
                    activeObject.lockMovementY = !activeObject.lockMovementY;
                    activeObject.lockScalingX = !activeObject.lockScalingX;
                    activeObject.lockScalingY = !activeObject.lockScalingY;
                    activeObject.lockUniScaling = !activeObject.lockUniScaling;
                    activeObject.lockRotation = !activeObject.lockRotation;
                    activeObject.lockObject = !activeObject.lockObject;
                    self.render();
                }
            };

            //
            // Active Object
            // ==============================================================
            self.selectActiveObject = function () {
                let activeObject = canvas.getActiveObject();
                if (!activeObject) {
                    return;
                }

                self.selectedObject = activeObject;
                self.selectedObject.text = self.getText();
                self.selectedObject.fontSize = self.getFontSize();
                self.selectedObject.lineHeight = self.getLineHeight();
                self.selectedObject.textAlign = self.getTextAlign();
                self.selectedObject.opacity = self.getOpacity();
                self.selectedObject.fontFamily = self.getFontFamily();
                self.selectedObject.fill = self.getFill();
                self.selectedObject.tint = self.getTint();
            };

            self.deselectActiveObject = function () {
                self.selectedObject = false;
            };

            self.deleteActiveObject = function () {
                let activeObject = canvas.getActiveObject();
                canvas.remove(activeObject);
                self.render();
            };

            //
            // State Managers
            // ==============================================================
            self.isLoading = function () {
                return self.loading;
            };

            self.setLoading = function (value) {
                self.loading = value;
            };

            self.setDirty = function (value) {
                fabricDirtyStatus.setDirty(value);
            };

            self.isDirty = function () {
                return fabricDirtyStatus.isDirty();
            };

            self.setInitalized = function (value) {
                self.initialized = value;
            };

            self.isInitalized = function () {
                return self.initialized;
            };

            //
            // JSON
            // ==============================================================
            self.getJSON = function () {
                let initialCanvasScale = self.canvasScale;
                self.canvasScale = 1;
                self.resetZoom();

                let json = JSON.stringify(canvas.toJSON(self.JSONExportProperties));

                self.canvasScale = initialCanvasScale;
                self.setZoom();

                return json;
            };

            self.loadJSON = function (json) {
                self.setLoading(true);
                canvas.loadFromJSON(json, function () {
                    $timeout(function () {
                        self.setLoading(false);

                        if (!self.editable) {
                            self.disableEditing();
                        }

                        self.render();
                    });
                });
            };

            //
            // Download Canvas
            // ==============================================================
            self.getCanvasData = function () {
                return canvas.toDataURL({
                    width: canvas.getWidth(),
                    height: canvas.getHeight(),
                    multiplier: self.downloadMultipler
                });
            };

            self.getCanvasBlob = function () {
                let base64Data = self.getCanvasData();
                let data = base64Data.replace('data:image/png;base64,', '');
                let blob = b64toBlob(data, 'image/png');

                return URL.createObjectURL(blob);
            };

            self.download = function (name) {
                // Stops active object outline from showing in image
                self.deactivateAll();

                let initialCanvasScale = self.canvasScale;
                self.resetZoom();

                // Click an artifical anchor to 'force' download.
                let link = document.createElement('a');
                link.download = name + '.png';
                link.href = self.getCanvasBlob();
                link.click();

                self.canvasScale = initialCanvasScale;
                self.setZoom();
            };

            //
            // Continuous Rendering
            // ==============================================================
            // Upon initialization re render the canvas
            // to account for fonts loaded from CDN's
            // or other lazy loaded items.

            // Prevent infinite rendering loop
            self.continuousRenderCounter = 0;

            self.stopContinuousRendering = function () {
                $timeout.cancel(self.continuousRenderHandle);
                self.continuousRenderCounter = self.maxContinuousRenderLoops;
            };

            self.startContinuousRendering = function () {
                self.continuousRenderCounter = 0;
                self.continuousRender();
            };

            // Prevents the "not fully rendered up upon init for a few seconds" bug.
            self.continuousRender = function () {
                if (self.userHasClickedCanvas || self.continuousRenderCounter > self.maxContinuousRenderLoops) {
                    return;
                }

                self.continuousRenderHandle = $timeout(function () {
                    self.setZoom();
                    self.render();
                    self.continuousRenderCounter++;
                    self.continuousRender();
                }, self.continuousRenderTimeDelay);
            };

            //
            // Utility
            // ==============================================================
            self.setUserHasClickedCanvas = function (value) {
                self.userHasClickedCanvas = value;
            };

            self.createId = function () {
                return Math.floor(Math.random() * 10000);
            };

            //
            // Toggle Object Selectability
            // ==============================================================
            self.disableEditing = function () {
                canvas.selection = false;
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                });
            };

            self.enableEditing = function () {
                canvas.selection = true;
                canvas.forEachObject(function (object) {
                    object.selectable = true;
                });
            };


            //
            // Set Global Defaults
            // ==============================================================
            self.setCanvasDefaults = function () {
                canvas.selection = self.canvasDefaults.selection;
            };

            self.setWindowDefaults = function () {
                fabricWindow.Object.prototype.transparentCorners = self.windowDefaults.transparentCorners;
                fabricWindow.Object.prototype.rotatingPointOffset = self.windowDefaults.rotatingPointOffset;
                fabricWindow.Object.prototype.padding = self.windowDefaults.padding;
            };

            //
            // Canvas Listeners
            // ============================================================
            self.startCanvasListeners = function () {
                canvas.on('object:selected', function () {
                    self.stopContinuousRendering();
                    $timeout(function () {
                        self.selectActiveObject();
                        self.setDirty(true);
                    });
                });

                canvas.on('selection:created', function () {
                    self.stopContinuousRendering();
                });

                canvas.on('selection:cleared', function () {
                    $timeout(function () {
                        self.deselectActiveObject();
                    });
                });

                canvas.on('after:render', function () {
                    canvas.calcOffset();
                });

                canvas.on('object:modified', function () {
                    self.stopContinuousRendering();
                    $timeout(function () {
                        self.updateActiveObjectOriginals();
                        self.setDirty(true);
                    });
                });
            };

            //
            // Constructor
            // ==============================================================
            self.init = function () {
                canvas = fabricCanvas.getCanvas();
                self.canvasId = fabricCanvas.getCanvasId();
                canvas.clear();

                // For easily accessing the json
                JSONObject = angular.fromJson(self.json);
                self.loadJSON(self.json);

                JSONObject = JSONObject || {};

                self.canvasScale = 1;

                JSONObject.background = JSONObject.background || '#ffffff';
                self.setCanvasBackgroundColor(JSONObject.background);

                // Set the size of the canvas
                JSONObject.width = JSONObject.width || 300;
                self.canvasOriginalWidth = JSONObject.width;

                JSONObject.height = JSONObject.height || 300;
                self.canvasOriginalHeight = JSONObject.height;

                self.setCanvasSize(self.canvasOriginalWidth, self.canvasOriginalHeight);

                self.render();
                self.setDirty(false);
                self.setInitalized(true);

                self.setCanvasDefaults();
                self.setWindowDefaults();
                self.startCanvasListeners();
                self.startContinuousRendering();
                fabricDirtyStatus.startListening();
            };

            self.init();

            return self;

        };
    }
})();
