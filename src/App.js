import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import getStyle from "./api/style";
import { getEvents } from "./api";
import ReactSlider from "react-slider";

// Viewport settings
const viewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 1,
  pitch: 0,
  bearing: 0
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: false,
      layer: false,
      past: 0,
      event: "aaa"
    };
  }

  componentDidMount() {
    getStyle().then(style => this.setState({ style }));
    this.setState({ layer: new HeatmapLayer({}) });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.past !== this.state.past) {
      getEvents(8, 36)
        .then(({ events }) => {
          const points = events
            .flatMap(event => event.geometries)
            .map(e => e.coordinates);
          console.log(points);
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { style, layer } = this.state;
    return (
      <div className="App">
        {layer && (
          <DeckGL viewState={viewState} layers={[layer]}>
            {style && (
              <StaticMap
                width={"100%"}
                height={500}
                mapStyle={style}
              ></StaticMap>
            )}
          </DeckGL>
        )}
        <div
          style={{ position: "fixed", bottom: 0, zIndex: 100, width: "100%" }}
        ></div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={past => this.setState({ past })}
        />
      </div>
    );
  }
}

export default App;
