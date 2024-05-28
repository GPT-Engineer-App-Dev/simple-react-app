import { Box, Container, Flex, Text, VStack, Link, Button } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const VenueList = () => {
  const { data: venues, error, isLoading } = useVenues();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading venues</Text>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="nav" bg="brand.800" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Venues</Text>
            <Flex>
              <Link as={RouterLink} to="/" mx={2}>Home</Link>
              <Link as={RouterLink} to="/venues/new" mx={2}>Add Venue</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" flex="1" py={8}>
        <VStack spacing={4}>
          {venues.map(venue => (
            <Link as={RouterLink} to={`/venues/${venue.id}`} key={venue.id}>
              <Text fontSize="2xl">{venue.name}</Text>
            </Link>
          ))}
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

export default VenueList;