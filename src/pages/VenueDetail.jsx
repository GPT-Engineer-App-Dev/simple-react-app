import { Box, Container, Flex, Text, VStack, Link, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useVenues, useAddVenue } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: venues, error, isLoading } = useVenues();
  const { mutate: deleteVenue } = useAddVenue();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading venue</Text>;

  const venue = venues.find(venue => venue.id === parseInt(id));

  if (!venue) return <Text>Venue not found</Text>;

  const handleDelete = () => {
    deleteVenue({ id: venue.id });
    navigate("/venues");
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="nav" bg="brand.800" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Venue Details</Text>
            <Flex>
              <Link as={RouterLink} to="/venues" mx={2}>Back to Venues</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" flex="1" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">{venue.name}</Text>
          <Text>{venue.description}</Text>
          <Text>{venue.location}</Text>
          <Button colorScheme="red" onClick={handleDelete}>Delete Venue</Button>
        </VStack>
      </Container>

      <Box as="footer" bg="brand.900" color="white" py={4}>
        <Container maxW="container.lg">
          <Text textAlign="center">&copy; 2023 My Website. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default VenueDetail;