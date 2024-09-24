import { Box } from "@mui/material"
import { MapCard } from "../MapCard/MapCard"
import './MapWithSideContent.scss';
import { getCategoryImages } from "../../utils/categoryImages";

export const MapWithSideContent = ({ resources, children, showSideContent }) => {
  return (
    <section className="map-with-side-content">
      <Box className="map-with-side-content__map">
        <MapCard resources={resources} iconMapping={getCategoryImages()} />
      </Box>
      {showSideContent &&
        <Box className="map-with-side-content__content" sx={{ paddingLeft: 3, paddingRight: 3, paddingTop: 3, boxSizing: "border-box" }}>
          {children}
        </Box>
      }
    </section>
  )
}