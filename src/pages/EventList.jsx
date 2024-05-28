import { Box, Container, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const EventList = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="nav" bg="brand.800" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Events</Text>
            <Flex>
              <Link as={RouterLink} to="/" mx={2}>Home</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" flex="1" py={8}>
        <VStack spacing={4}>
          {events.map(event => (
            <Link as={RouterLink} to={`/events/${event.id}`} key={event.id}>
              <Text fontSize="2xl">{event.name}</Text>
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

export default EventList;