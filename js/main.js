define(function(require, exports, module) {
    var Engine = require('samsara/core/Engine');
    var Surface = require('samsara/core/Surface');
    var ContainerSurface = require('samsara/surfaces/ContainerSurface');
    var SizeNode = require('samsara/core/nodes/SizeNode');
    var LayoutNode = require('samsara/core/nodes/LayoutNode');
    var Transitionable = require('samsara/core/Transitionable');
    var Transform = require('samsara/core/Transform');
    var View = require('samsara/core/View');

    var Wedge = View.extend({
        defaults : {
            size : [200,200],
            angle : 0
        },
        initialize : function(options){
            var skewedContainer = new ContainerSurface({
                size : options.size,
                properties : {
                    overflow : 'hidden',
                    border: '1px solid transparent',
                    pointerEvents: 'none'
                }
            });

            var wedge = new Surface({
                size : options.size,
                origin : [.5,.5],
                properties : {
                    borderRadius : '50%',
                    borderWidth :  options.size[0]/3 + 'px',
                    borderColor : 'rgba(255,255,255,' + 0.9 + ')',
                    borderStyle : 'solid'
                }
            });

            var skew = new LayoutNode({
                transform : swivel.map(function(angle){
                    return Transform.composeMany(
                        Transform.skewY(Math.PI/6),
                        Transform.rotateZ(2*angle),
                        Transform.rotateX(1.5*angle),
                        Transform.rotateY(angle),
                        Transform.rotateX(-0.5*angle)
                    );
                })
            });


            var antiSkew = new LayoutNode({
                transform : Transform.skewY(-Math.PI/6)
            });

            skewedContainer.add(antiSkew).add(wedge);

            this.add(skew).add(skewedContainer);
        }
    });

    var swivel = new Transitionable(0);

    var context = Engine.createContext();
    var centerLayout = new LayoutNode({align : [.5,.5]});
    var centeredNode = context.add(centerLayout);

    var N = 6;
    var angle = 0;
    for (var index = 0; index < N; index++){
        var wedge = new Wedge({size : [200,200]});

        var rotateNode = new LayoutNode({
            transform : Transform.rotateZ(angle)
        });

        centeredNode.add(rotateNode).add(wedge);
        angle += Math.PI/3;
    }

    window.setTimeout(function(){
        swivel.loop([4*Math.PI, 0], {duration : 30000, curve : 'easeInOut'});
    }, 100);

    Engine.start();
});
