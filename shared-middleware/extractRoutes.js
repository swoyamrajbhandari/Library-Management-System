async function extractRoutes(app, basePath){
    let routes = []

    function transverse(stack, basePath) {
        stack.forEach((layer) => {
            if (layer.route) {    //A "layer" can be a route or a router.
                // It is a route
                const fullPath = basePath + layer.route.path  // If layer.route exists, it’s a direct route (like app.get("/user/list")).
                const methods = Object.keys(layer.route.methods).map((m) => m.toUpperCase())  //layer.route.path → the route path.
                                                                                             // layer.route.methods → an object like { get: true, post: false }. 
                                                                                            // Convert methods to uppercase strings: "GET", "POST".

                methods.forEach((method) => {
                    routes.push({method, path: fullPath})   // Add each { method, path } pair to the routes array. 
                                                 // For example, app.route("/books").get(...).post(...) becomes two entries.
                })

            } else if (layer.name === "router" && layer.handle.stack) {   //layer.handle stack = all nested routes
                // Nested router, i.e. used express.Router() in another router
                let prefix = "";

                if (layer.path) { //If you mount routers with a string prefix → layer.path exists (for ex, app('/auth', getlist))
                    prefix = layer.path
                } else if (layer.regexp && layer.regexp.fast_slash) {
                    prefix = ''
                }

            
                transverse(layer.handle.stack, basePath + prefix);
            }
        })

    }

    transverse(app.router?.stack, basePath)
    return routes
    


}

export default extractRoutes