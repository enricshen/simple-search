require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search"
], function(Map, MapView, FeatureLayer, Search) {
  var map = new Map({
    basemap: "satellite",
    ground: "world-elevation"
  });

  var view = new MapView({
    center: [174.52176, -41.1858], // The center of the map as lon/lat
    scale: 1000000,
    container: "viewDiv",
    map: map,
    popup: {
      actions: [],
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        breakpoint: false,
        position: "top-center"
      }
    }
  });

  var featureLayerDistricts = new FeatureLayer({
    url:
      "https://services1.arcgis.com/TWsoAGve3wb3oFHK/arcgis/rest/services/NZ_Address_Test/FeatureServer/0",
    popupTemplate: {
      //autocasts as new PopupTemplate()
      
      title: "<h4>Who do you call?</h4>",
      content: "Call these people" +
              "<ul><li>Your local council is {TAName}</li>" +
              "<li>Your regional council is {RegionName}</li><ul>",
      overwriteActions: true
    }
  });

  var searchWidget = new Search({
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
        placeholder: "Search for your address"
      }
    ]
  });
});
