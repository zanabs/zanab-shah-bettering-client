import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { default as axios } from "axios";
import { MapWithSideContent } from "../../components/MapWithSideContent/MapWithSideContent";
import { ResourceDetail } from "../../components/ResourceDetail/ResourceDetail";

export const ResourceDetailPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { resourceId, categoryId } = useParams();
  const [resource, setResource] = useState(undefined);

  useEffect(() => {
    const getResource = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources/${categoryId}/${resourceId}`);
        console.log("Server response:", response.data);
        setResource(response.data);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };

    getResource();
  }, [resourceId, categoryId]);

  return (
    <>
      {resource && (
        <MapWithSideContent resources={[resource]} showSideContent={resource}>
          <ResourceDetail resource={resource} />
        </MapWithSideContent>
      )}
    </>
  );
};
