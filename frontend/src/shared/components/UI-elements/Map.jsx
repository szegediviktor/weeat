import { useRef, useEffect } from "react";

import "./map.css";

const Map = (props) => {
    const mapRef = useRef();

    useEffect(() => {
        new window.ol.Map({
            target: mapRef.current.id,
            layers: [
                new window.ol.layer.Tile({
                    source: new window.ol.source.OSM(),
                }),
            ],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([
                    props.center.lng,
                    props.center.lat,
                ]),
                zoom: props.zoom,
            }),
        });
    }, [props.center, props.zoom]);

    return (
        <div
            ref={mapRef}
            id="map"
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};

export default Map;
