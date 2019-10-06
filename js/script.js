require([
      "esri/Map",
      "esri/views/SceneView",
      "esri/widgets/Search"
    ], function(
      Map,
      SceneView,
      Search) {

      var map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
      });

      var view = new SceneView({
        scale: 123456789,
        container: "viewDiv",
        map: map,
        popup: {
           actions: [],
           dockEnabled: true,
           dockOptions: {
             buttonEnabled: true,
             breakpoint: false,
             position: "bottom-right",
           }
         }
      });

      var searchWidget = new Search({
        view: view,
        container: "searchDiv"
      });

    });
