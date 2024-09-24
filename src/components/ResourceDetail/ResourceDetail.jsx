import { Box, Chip, Typography } from "@mui/material";

export const ResourceDetail = ({ resource }) => {
    const getTags = () => {
        const tags = [];
        const properties = resource?.properties;

        if (properties?.halal_food_offered) {
            tags.push({ label: "Halal", color: "#FF8C00" });
        }
        if (properties?.vegan_options) {
            tags.push({ label: "Vegan Options", color: "#006400" });
        }
        if (properties?.gluten_free_options) {
            tags.push({ label: "Gluten-Free Options", color: "#8B4513" });
        }
        if (properties?.absolutely_free) {
            tags.push({ label: "No-Cost to User", color: "#2E8B57" });
        }
        if (properties?.kosher_food_offered) {
            tags.push({ label: "Kosher-Certified", color: "#B8860B" });
        }

        if (properties?.serves_all_genders) {
            tags.push({ label: "Serves all genders", color: "#006400" });
        }

        if (properties?.men_only) {
            tags.push({ label: "Men's services only", color: "#FF8C00" });
        }

        if (properties?.women_only) {
            tags.push({ label: "Women's services only", color: "#8B4513" });
        }

        if (properties?.food_available) {
            tags.push({ label: "Serves food", color: "#B8860B" });
        }

        if (properties?.sliding_scale) {
            tags.push({ label: "Serves food", color: "#B8860B" });
        }

        if (properties?.families_welcome) {
            tags.push({ label: "Sliding-scale", color: "#2E8B57" });
        }

        if (properties?.public) {
            tags.push({ label: "Public", color: "#6B4513" });
        } else if (properties?.private) {
            tags.push({ label: "Private", color: "#8B4513" });
        }

        if (properties?.translation_services_available) {
            tags.push({ label: "Translation services available", color: "#6B4519" })
        }
        return tags;
    };

    return (
        <section>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h4" component="h1">
                    {resource.properties.program_name}
                </Typography>
                <Typography variant="h5" component="h2">
                    Description
                </Typography>
                <p>{resource.properties.description || resource.properties.category}</p>
                <Typography variant="h5" component="h2">
                    Features
                </Typography>
                <Box>
                    {getTags().map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag.label}
                            sx={{ bgcolor: tag.color, color: "#fff", fontWeight: "bold" }} // Dark background and white text
                        />
                    ))}
                </Box>
            </Box>
        </section>
    );
}