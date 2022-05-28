import { FeatureCollection } from "geojson";
import { useRef } from "react";
import type { GeoJSONSource, MapRef } from "react-map-gl";
import { Layer, Map, Source } from "react-map-gl";
import { MAPBOX_TOKEN } from "../constants";
import { makeFeatures } from "../utils";
import { LogEntry } from "../utils/types";
import useGetLogs from "../utils/useGetLogs";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

export default function ReactMap() {
  const [logs, error] = useGetLogs();
  const logEntries = logs as LogEntry[];
  const data = makeFeatures(logEntries) as FeatureCollection;
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
      {error && (
        <div>
          <pre>{JSON.stringify(error)}</pre>
        </div>
      )}
      {data && (
        <Map
          initialViewState={{
            latitude: 40.67,
            longitude: -103.59,
            zoom: 3,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
          ref={mapRef}
        >
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
        </Map>
      )}
    </>
  );
}
