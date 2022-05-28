import { FeatureCollection } from "geojson";
import type { NextPage } from "next";
import { useRef } from "react";
import type { GeoJSONSource, MapRef } from "react-map-gl";
import { Layer, Map, Source } from "react-map-gl";
import { MAPBOX_TOKEN } from "../constants";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

interface Props {
  data: FeatureCollection;
}

const ReactMap: NextPage<Props> = ({ data }) => {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: any) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current!.getSource("logs") as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current!.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 43.75,
          longitude: 11.75,
          zoom: 0.23,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
        onMoveEnd={(e) => console.log(e)}
      >
        {data && (
          <Source
            id="earthquakes"
            type="geojson"
            data={data}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        )}
      </Map>
    </>
  );
};

export default ReactMap;
