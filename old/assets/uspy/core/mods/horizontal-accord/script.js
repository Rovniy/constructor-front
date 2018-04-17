(function () {
    'use strict';

    angular.module('AccordionModule', [])
        .directive('ngcAccordion', function () {
            let accordions = [];

            function controller($scope, $element, $attrs) {
                $scope.selectors = {header: ".accordion-tab-header:first", body: ".accordion-tab-body:first"};
                this.name = 'AccordionCtrl';
                let accordion = {
                    index: accordions.length,
                    openedTabIndex: 0,
                    bussy: false,
                    width: 0,
                    height: 0,
                    options: {
                        speed: 200
                    },
                    tabs: [],
                    parentTab: false
                };

                accordion.getBussy = function () {
                    return accordion.bussy;
                };
                accordion.changeIndex = function (index) {
                    accordion.openedTabIndex = index;
                };
                accordion.closeAll = function () {
                    angular.forEach(accordion.tabs, function (tab) {
                        tab.element.find($scope.selectors.body).width(0);
                    });
                };
                accordion.calculateHeight = function () {
                    if ($attrs.ngcAutoheight && $attrs.ngcAutoheight.toLowerCase() === "true") {
                        accordion.height = 10;
                        $element.height(10);
                        let openedTab = {};
                        let w = accordion.calculateWidth();
                        let hh = 0;
                        angular.forEach(accordion.tabs, function (tab) {
                            if (tab.opened) openedTab = tab;
                            accordion.closeAll();
                            let body = tab.element.find($scope.selectors.body);
                            body.width(w);
                            let h = body.height();
                            body.width(0);
                            if (accordion.height - 5 < h) accordion.height = h + 5;
                        });
                        if (openedTab.element)
                            openedTab.element.find($scope.selectors.body).width(w);
                        $element.height(accordion.height);
                    }
                };

                accordion.calculateWidth = function () {
                    let ret = 0;
                    angular.forEach(accordion.tabs, function (tab) {
                        ret += tab.headerWidth;
                    });
                    return $element.width() - ret;
                };

                accordion.widthCorrector = function () {
                    let w = accordion.calculateWidth();
                    if (w > 0)
                        angular.forEach(accordion.tabs, function (tab) {
                            tab.ini(w);
                        });
                };

                accordion.setTabsHeight = function () {
                    let h = accordion.height - 30;
                    angular.forEach(accordion.tabs, function (tab) {
                        tab.setHeight(h);
                    })
                };

                accordion.findByNdx = function (ndx) {
                    angular.forEach(accordion.tabs, function (tab) {
                        if (ndx === tab.ndx) return tab;
                    });
                };
                $scope.accordion = accordion;
                $scope.accordions = accordions;
                this.$scope = $scope;
            }

            function link(scope, element, attrs, ctrl) {
                let ac = scope.accordion;
                ac.name = scope.name;
                ac.width = element.width();
                ac.height = element.height();
                element.addClass('accordioncontainer');
                accordions.push(ac);
                ac.status = {i: ac.openedTabIndex, s: ac.options.speed};
                if (scope.model) scope.model = ac;
                if (scope.mdl) {
                    if (!scope.mdl.speed) scope.mdl.speed = ac.options.speed;
                    if (!scope.mdl.index) scope.mdl.index = ac.openedTabIndex;
                    scope.mdl.bussy = ac.bussy;
                }
                ac.setTabsHeight();
                $(window).resize(function () {
                    if (ac.bussy === false) {
                        scope.$apply(function () {
                            ac.calculateHeight();
                            ac.widthCorrector();

                        });
                    }
                });
                scope.$watch('mdl.index', function (newValue, oldValue) {
                    if (newValue && ac.openedTabIndex !== newValue) {
                        ac.openedTabIndex = parseInt(newValue);
                    }
                });

                scope.$watch('mdl.speed', function (newValue, oldValue) {
                    if (newValue === '') scope.mdl.speed = ac.options.speed;
                    if (newValue && ac.openedTabIndex !== newValue) {
                        let v = parseInt(newValue);
                        if (v && v >= 0 && v != '') {
                            ac.options.speed = v;
                            if (newValue !== v) scope.mdl.speed = v;
                        } else {
                            scope.mdl.speed = ac.options.speed;
                        }
                    }
                });

                scope.$watch('accordion.bussy', function (value, oldValue) {
                    if (scope.mdl) scope.mdl.bussy = value;
                });

                scope.$watch('accordion.openedTabIndex', function (value, oldValue) {
                    if (ac.bussy) {
                        ac.openedTabIndex = oldValue;
                        return;
                    }
                    if (ac.tabs.length > 0) {
                        let w = ac.calculateWidth();
                        let toOpenTab = null;
                        let toCloseTab = null;
                        angular.forEach(ac.tabs, function (tab) {
                            if (tab.index === ac.openedTabIndex) toOpenTab = tab;
                            else {
                                if (tab.opened) {
                                    toCloseTab = tab;
                                }
                            }
                        });
                        if (toOpenTab) {
                            if (toCloseTab) {
                                toCloseTab.close();
                            }
                            toOpenTab.open(w);
                            if (scope.mdl && scope.mdl.index !== value) scope.mdl.index = value;
                        } else {
                            if (toCloseTab) {
                                ac.openedTabIndex = toCloseTab.index;
                            }
                        }
                    }
                });
                scope.accordion.openedTabIndex = 0;
            }
            return {
                controller: controller,
                restrict: 'AEC',
                scope: {
                    name: '@ngcAccordion'
                    , autoHeight: '@ngcAutoheight'
                    , mdl: '=ngcModel'
                },
                link: link
            }
        })
        .directive('ngcAccordionTab', function () {
            function link(scope, element, attrs, ctrl) {
                if (scope.templateUrl) scope.templateUrl = "accordionTabTemplate.html";
                let elemHeader = element.find(ctrl.$scope.selectors.header);
                let elemBody = element.find(ctrl.$scope.selectors.body);
                element.addClass('accordiontab');
                let widgetClass = element.attr('widget-id');
                if (widgetClass) {
                    element.find('.accordion-tab-header').addClass(widgetClass);
                }
                let t = {
                    index: $("~[ngc-accordion-tab]", element).length,
                    widget: element.attr('widget-id'),
                    name: scope.name,
                    headerWidth: 0,
                    opened: false,
                    preOpened: false,
                    element: element
                };
                scope.t = t;
                scope.a = ctrl.$scope.accordion;
                elemBody.width(0);
                t.headerWidth = element.width();

                t.open = function (width) {
                    t.bodyWidth = width;
                    scope.a.bussy = true;
                    t.preOpened = true;
                    $(elemBody).show().animate({"width": width + "px"}, parseInt(scope.a.options.speed), function () {
                        scope.onOpen();
                        scope.$apply(function () {
                            scope.a.bussy = false;
                            angular.forEach(ctrl.$scope.accordions, function (a) {
                                a.widthCorrector();
                            });
                            t.opened = true;
                        });
                    });
                };

                t.close = function () {
                    t.preOpened = false;
                    scope.a.bussy = true;
                    $(elemBody).animate({"width": "0px"}, parseInt(scope.a.options.speed), function () {
                        elemBody.hide();
                        scope.$apply(function () {
                            scope.a.bussy = false;
                            t.opened = false;
                        });
                    });
                };

                t.ini = function (width) {
                    t.bodyWidth = width;
                    if (t.index === scope.a.openedTabIndex) {
                        t.opened = true;
                        t.preOpened = true;
                    }
                    if (t.opened) elemBody.width(width);
                    else elemBody.width(0);

                };

                t.setHeight = function (height) {
                    t.height = height;
                };

                elemHeader.click(function () {
                    if (!scope.a.bussy) {
                        scope.$apply(function () {
                            scope.a.changeIndex(t.index);
                        });
                    }
                });

                scope.a.tabs.push(t);
                if (scope.a.calculateHeight) scope.a.calculateHeight();
                if (scope.a.widthCorrector) scope.a.widthCorrector();
            }
            return {
                require: '^ngcAccordion',
                scope: {name: '@ngcAccordionTab', onOpen: '&ngcAccordionTabOnOpen'},
                link: link,
                transclude: true,
                templateUrl: function (element, attrs) {
                    if (attrs.ngcTemplate) return attrs.ngcTemplate;
                    return 'accordiontemplate.html';
                }
            }
        })

})();
