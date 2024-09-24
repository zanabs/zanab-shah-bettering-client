import { Button } from "@mui/material";
import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import './MarkerWithInfoWindow.scss';

export const MarkerWithInfoWindow = ({ position, pinImage, onGetDirectionsClick, resource }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onClick={handleMarkerClick}
      >
        <Pin background="white" scale={1.4} >
          {pinImage}
        </Pin>
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} className="marker-with-info-window">
          <h2>{resource.properties.program_name}</h2>

          <Button onClick={onGetDirectionsClick}>Get Directions</Button>
        </InfoWindow>
      )}
    </>
  );
};