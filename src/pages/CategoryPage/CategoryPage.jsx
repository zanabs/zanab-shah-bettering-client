import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "redaxios";
import { MapWithSideContent } from "../../components/MapWithSideContent/MapWithSideContent";
import { ResourcesList } from "../../components/ResourcesList/ResourcesList";

export const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { categoryId, cityName } = useParams();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await axios.get(`${apiUrl}/resources?categoryId=${categoryId}`);
        const categoryFilteredResources = response.data.filter(resource => resource.properties.type === categoryId);

        setResources(categoryFilteredResources);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    getResources();
  }, [categoryId]);

  return (
    <MapWithSideContent resources={resources} showSideContent={true}>
      <ResourcesList resources={resources} categoryId={categoryId} cityName={cityName} />
    </MapWithSideContent>
  );
};
