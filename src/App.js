import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 1,
  pitch: 0,
  bearing: 0
};

const App = () => {
  const [style, setStyle] = React.useState(false);
  const [layer, setLayer] = React.useState(false);
  const [event, setEvent] = React.useState("fire");

  React.useEffect(() => {
    fetch(
      "https://api.geolonia.com/dev/styles/geolonia-basic-3d?key=YOUR-API-KEY"
    )
      .then(res => res.json())
      .then(setStyle);
  }, []);

  // createLayer on Mount
  React.useEffect(() => {
    const layer = new HeatmapLayer({
      id: "heatmapLayer",
      data: [
        { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10 },
        { COORDINATES: [-123.42177834, 37.78346622], WEIGHT: 10 }
      ]
    });

    setLayer(layer);
  }, []);

  console.log(layer, style);
  return (
    <div className="App">
      {layer && (
        <DeckGL viewState={viewState} layers={[layer]}>
          {style && (
            <StaticMap width={"100%"} height={500} mapStyle={style}></StaticMap>
          )}
        </DeckGL>
      )}
    </div>
  );
};

export default App;
