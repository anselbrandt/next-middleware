// import { scaleLinear } from "d3-scale";
import type { NextPage } from "next";
import React, { Dispatch, memo, SetStateAction } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num: number) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

// const colorScale = scaleLinear()
//   .domain([0.29, 0.68])
//   .range(["#ffedea", "#ff5233"]);

interface Props {
  setTooltipContent: Dispatch<SetStateAction<string>>;
}

const SimpleMap: NextPage<Props> = ({ setTooltipContent }: Props) => {
  return (
    <>
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{ scale: 25 }}
        width={600}
        height={400}
      >
        <ZoomableGroup center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={"#F5F4F6"}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(SimpleMap);
