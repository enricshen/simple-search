require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search"
], function(Map, MapView, FeatureLayer, Search) {
  var map = new Map({
    basemap: "hybrid",
    
  });

  var view = new MapView({
    center: [174.8, -41.29], // The center of the map as lon/lat
    scale: 400000,
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
      
      title: "<h6>Who do I call?</h6>",
      content: 
              "<ul><li>Your Local Council: <a href='http://{TA_URL}' target='_blank'>{TAName}</a></li>" +  
              "<li>Your Regional council: <a href='http://{Region_URL}' target='_blank'>{RegionName}</a></li><ul>",
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
