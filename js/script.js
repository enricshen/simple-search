require(["esri/Map", 
         "esri/views/SceneView", 
         "esri/layers/FeatureLayer",
         "esri/widgets/Search"], function(
  Map,
  SceneView,
  FeatureLayer,
  Search
) {
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
        position: "bottom-right"
      }
    }
  });
  
  var featureLayerDistricts = new FeatureLayer({
          url:
            "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/CongressionalDistricts/FeatureServer/0",
          popupTemplate: {
            // autocasts as new PopupTemplate()
            title: "Congressional District {DISTRICTID} </br>{NAME},{PARTY}",
            overwriteActions: true
          }
        });
  

  var searchWidget = new Search({
    view: view,
    container: "searchDiv",
    sources: [
            {
              layer: featureLayerDistricts,
              searchFields: ["DISTRICTID"],
              displayField: "DISTRICTID",
              exactMatch: false,
              outFields: ["DISTRICTID", "NAME", "PARTY"],
              name: "Congressional Districts",
              placeholder: "example: 3708"
            }
      ]
  });
});
