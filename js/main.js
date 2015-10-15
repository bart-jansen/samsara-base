define(function(require, exports, module) {
    var Engine = require('samsara/core/Engine');
    var Transform = require('samsara/core/Transform');
    var LayoutNode = require('samsara/core/LayoutNode');
    var Transitionable = require('samsara/core/Transitionable');
    var Wedge = require('app/Wedge');

    /* State*/
    var N = 6;                              // number of wedges
    var swivel = new Transitionable(0);     // animation parameter

    // Define the insertion point for Samsara in a provided DOM element.
    // If no element is provided one will be created and appended into
    // the document's `<body>`
    // The `samsara-context` CSS class is added to the element, defining
    // a 3D HTML context.
    var context = Engine.createContext({
        el : document.getElementById('app')
    });

    // Position the origin of the logo at the center.
    var centerLayout = new LayoutNode({align : [.5,.5]});

    // A reference to the render tree starting from the centered point
    var centeredNode = context.add(centerLayout);

    // Create N wedges to form the logo.
    var rotation = 0;
    for (var index = 0; index < N; index++){
        var wedge = new Wedge({
            angle : 2 * Math.PI / N
        });

        // The wedge now listens to changes in swivel
        wedge.input.subscribe(swivel);

        // Rotate each wedge to form a ring
        var rotateLayout = new LayoutNode({
            transform : Transform.rotateZ(rotation)
        });

        // Add the wedge to the render tree
        centeredNode.add(rotateLayout).add(wedge);

        rotation += 2 * Math.PI / N;
    }

    // Initiate the animation
    swivel.loop([4*Math.PI, 0], {duration : 30000, curve : 'easeInOut'});

    // Start the request animation frame
    Engine.start();
});
