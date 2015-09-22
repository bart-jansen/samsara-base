define(function(require, exports, module) {
    var Engine = require('samsara/core/Engine');
    var Transform = require('samsara/core/Transform');
    var LayoutNode = require('samsara/core/nodes/LayoutNode');
    var Transitionable = require('samsara/core/Transitionable');
    var Wedge = require('app/Wedge');

    // parameters
    var N = 6;                              // number of wedges
    var wedgeSize = [200, 200];             // size of the wedge
    var swivel = new Transitionable(0);     // animation parameter

    // create a 3d context
    var context = Engine.createContext();

    // center the logo with a layout node
    var centerLayout = new LayoutNode({align : [.5,.5]});

    // a reference to the render tree starting from the centerLayout
    var centeredNode = context.add(centerLayout);

    // create N wedges to form the logo
    var rotation = 0;
    for (var index = 0; index < N; index++){
        var wedge = new Wedge({
            size : wedgeSize,
            angle : 2 * Math.PI / N
        });

        // the wedge now listens to changes in swivel
        wedge.input.subscribe(swivel);

        // rotate each wedge circularly
        var rotateLayout = new LayoutNode({
            transform : Transform.rotateZ(rotation)
        });

        // add the wedge to the render tree
        centeredNode.add(rotateLayout).add(wedge);

        rotation += 2 * Math.PI / N;
    }

    // initiate the animation
    swivel.loop([4*Math.PI, 0], {duration : 30000, curve : 'easeInOut'});

    // start samsara
    Engine.start();
});
