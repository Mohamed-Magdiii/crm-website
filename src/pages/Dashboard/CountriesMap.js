import React from "react";
import {
  Card, CardBody, CardTitle, CardSubtitle
} from "reactstrap";
import { VectorMap } from "react-jvectormap";

const CountriesMap = () => {
  const config = {
    width: "100%",
    value: "world_mill",
    height: "250px",
    color: "rgb(98, 110, 212)",
  };
  const map = React.createRef(null);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>World Map</CardTitle>
          <CardSubtitle className="mb-3">
                    Example of vector map.
          </CardSubtitle>

          <div id="world-map-markers" className="vector-map-height countries-map">
            <div style={{
              width: config.width,
              height: config.height 
            }}>
              <VectorMap
                map={config.value}
                backgroundColor="transparent"
                ref={map}
                containerStyle={{
                  width: "100%",
                  height: "80%",
                }}
                regionStyle={{
                  initial: {
                    fill: config.color,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 0,
                  },
                  hover: {
                    "fill-opacity": 0.8,
                    cursor: "pointer",
                  },
                  selected: {
                    fill: "#2938bc", //what colour clicked country will be
                  },
                  selectedHover: {},
                }}
                containerClassName="map"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CountriesMap;