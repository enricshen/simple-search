require([
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search"
], function(Map, MapView, WebMap, FeatureLayer, Search) {
  const map = new WebMap({
    portalItem: {
            // autocasts as new PortalItem()
            id: "6103daec36d4442c8762f5423ce79a67"
          }
    
  });

  const view = new MapView({
    center: [174.8, -41.29], // The center of the map as lon/lat
    scale: 2000000,
    container: "viewDiv",
    map: map,
     // Disable mouse-wheel and single-touch map navigation.
    navigation: {
      mouseWheelZoomEnabled: false,
      browserTouchPanEnabled: false
    },
    popup: {
      actions: [],
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        breakpoint: false,
        position: "top-center"
      }
    },
   
  });
  
  
        // Listen to events that have been disallowed for the view navigation.
        view.on("mouse-wheel", function(e) {
          warnUser(
            "To zoom in please double-click the map or use zoom in/out buttons."
          );
        });

        // Trap attempted single touch panning.
        const pointers = new Map(); // javascript map
        view.on("pointer-down", function(event) {
          if (event.pointerType !== "touch") {
            return;
          }
          pointers.set(event.pointerId, { x: event.x, y: event.y });
        });

        view.on(["pointer-up", "pointer-leave"], function(event) {
          if (event.pointerType !== "touch") {
            return;
          }
          pointers.delete(event.pointerId);
        });

        view.on("pointer-move", function(event) {
          if (event.pointerType !== "touch") {
            return;
          }
          if (pointers.size !== 1) {
            return;
          }
          const distance = Math.sqrt(
            Math.pow(event.x - pointers.get(event.pointerId).x, 2) +
              Math.pow(event.y - pointers.get(event.pointerId).y, 2)
          );
          if (distance < 20) {
            return;
          }
          warnUser("Please use two fingers to pan the map.");
        });

        // Display a warning.
        let timeout;
        function warnUser(warning) {
          const warningDiv = document.getElementById("warning");
          warningDiv.innerHTML = '<div class="message">' + warning + "</div>";
          warningDiv.style.opacity = 1;
          if (timeout) {
            window.clearTimeout(timeout);
          }
          timeout = window.setTimeout(function() {
            warningDiv.style.opacity = 0;
            warningDiv.innerHTML = "";
          }, 4000);
        }   


  const featureLayerDistricts = new FeatureLayer({
    url:
      "https://services1.arcgis.com/TWsoAGve3wb3oFHK/arcgis/rest/services/NZ_Address_Test/FeatureServer/0",
    popupTemplate: {
      //autocasts as new PopupTemplate()
      
      title: "{Address}",
      content: 
              "<ul><li>Your Local Council: <a href='http://{TA_URL}' target='_blank'>{TAName}</a></li>" +  
              "<li>Your Regional Council: <a href='http://{Region_URL}' target='_blank'>{RegionName}</a></li><ul>",
      overwriteActions: true
    }
  });

  const searchWidget = new Search({
    view: view,
    container: "searchDiv",
    allPlaceholder: "Address Search",
    includeDefaultSources: false,
    sources: [
      {
        layer: featureLayerDistricts,
        searchFields: ["Address"],
        displayField: "Address",
        exactMatch: false,
        outFields: ["Address", "TAName", "RegionName"],
        name: "Address",
        placeholder: "Search for your address",
        //zoomScale: 50000,
        resultSymbol: {
            type: "simple-marker",
            outline: { cap: "round", width: 1.25, color: [36, 36, 36, 0.86] },
            size: 10,
            color: [230, 152, 0, 0.81]
          }
      }
    ]
  });
});


