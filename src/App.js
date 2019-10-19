import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import getStyle from "./api/style";
import { getEvents, getCategories } from "./api";
import ReactSlider from "react-slider";
import Select from "react-select";
import colors from "./colors";

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
      categories: [],
      selectedCategory: null
    };
  }

  componentDidMount() {
    getStyle().then(style => this.setState({ style }));
    getCategories()
      .then(categories =>
        categories.categories.map(obj => {
          let categories = {};
          categories.value = obj.id;
          categories.label = obj.title;
          return categories;
        })
      )
      .then(categories => this.setState({ categories }));
    this.setState({ layer: new HeatmapLayer({}) });
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      (nextState.past !== this.state.past ||
        nextState.selectedCategory !== this.state.selectedCategory) &&
      nextState.selectedCategory !== null
    ) {
      getEvents(nextState.selectedCategory.value, nextState.past)
        .then(({ events }) => {
          const data = events
            .flatMap(event => event.geometries)
            .map(e => e.coordinates);
          console.log(data);
          this.setState({
            layer: new HeatmapLayer({
              data,
              colorRange:
                colors[nextState.selectedCategory.value] || colors["default"],
              getPosition: d => d,
              getWeight: d => 10
            })
          });
        })
        .catch(err => {});
    }
  }

  handleChange = option => {
    this.setState({ selectedCategory: option });
  };

  render() {
    const { style, layer, categories, selectedCategory } = this.state;

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
          onAfterChange={past => this.setState({ past })}
          min={1}
          max={365}
        />
        <Select
          value={selectedCategory}
          onChange={this.handleChange}
          options={categories}
        />
      </div>
    );
  }
}

export default App;
