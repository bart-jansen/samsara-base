define(function(require, exports, module) {
    var View = require('samsara/core/View');
    var Transform = require('samsara/core/Transform');
    var Surface = require('samsara/core/Surface');
    var ContainerSurface = require('samsara/core/ContainerSurface');
    var LayoutNode = require('samsara/core/LayoutNode');

    /**
     * A wedge is a angular section of a circle. It's created
     *  by placing a circle centered at the lower left corner
     *  of a containing <div>, shearing the containing <div> to
     *  the desired angle, and applying the inverse shear to the
     *  circle.
     *
     */
    var Wedge = View.extend({
        defaults : {
            angle : 0
        },
        initialize : function(options){
            // containing surface to apply skew to
            var skewedContainer = new ContainerSurface({
                proportions : [1/3, undefined],
                aspectRatio : 1,
                properties : {
                    overflow : 'hidden',
                    border: '1px solid transparent',
                    pointerEvents: 'none'
                }
            });

            // a circle to apply inverse skew to
            var wedge = new Surface({
                origin : [.5,.5],
                properties : {
                    borderRadius : '50%',
                    borderColor : 'rgba(255,255,255,' + 0.9 + ')',
                    borderStyle : 'solid'
                }
            });

            wedge.on('resize', function(size){
                wedge.setProperties({
                    borderWidth : Math.round(size[0]/3) + 'px'
                })
            });

            // animation from the View's input
            var crazySpinningThing = new LayoutNode({
                transform : this.input.map(function(swivel){
                    // experiment here! it's fun.
                    return Transform.composeMany(
                        Transform.rotateZ(   2 * swivel),
                        Transform.rotateX( 1.5 * swivel),
                        Transform.rotateY(  -2 * swivel),
                        Transform.rotateX(-0.5 * swivel)
                    );
                })
            });

            var skewAngle = Math.PI/2 - options.angle;

            var skew = new LayoutNode({
                transform : Transform.skewX(skewAngle)
            });

            var antiSkew = new LayoutNode({
                transform : Transform.skewX(-skewAngle)
            });

            // add the wedge to the container's inner render tree
            skewedContainer.add(antiSkew).add(wedge);

            // add the container to the render tree with animation
            this.add(skew)
                .add(crazySpinningThing)
                .add(skewedContainer);
        }
    });

    module.exports = Wedge;
});
