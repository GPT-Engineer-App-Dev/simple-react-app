import { Box, Container, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEvents, useComments } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useComments();

  if (eventsLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventsError) return <Text>Error loading event</Text>;
  if (commentsError) return <Text>Error loading comments</Text>;

  const event = events.find(event => event.id === parseInt(id));

  if (!event) return <Text>Event not found</Text>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="nav" bg="brand.800" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Event Details</Text>
            <Flex>
              <Link as={RouterLink} to="/events" mx={2}>Back to Events</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" flex="1" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">{event.name}</Text>
          <Text>{event.description}</Text>
          <Text>{event.date}</Text>
          <Text>Venue: {event.venue_id}</Text>
          <Text fontSize="xl" mt={4}>Comments</Text>
          {comments.filter(comment => comment.event_id === event.id).map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Text>{comment.content}</Text>
            </Box>
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

export default EventDetail;