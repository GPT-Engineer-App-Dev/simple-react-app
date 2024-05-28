import { Box, Container, Flex, Text, VStack, Input, Button, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useAddVenue } from "../integrations/supabase/index.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const AddVenue = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: addVenue } = useAddVenue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addVenue({ name, location, description });
    navigate("/venues");
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="nav" bg="brand.800" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Add Venue</Text>
            <Flex>
              <Link as={RouterLink} to="/venues" mx={2}>Back to Venues</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" flex="1" py={8}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button type="submit" colorScheme="teal">Add Venue</Button>
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

export default AddVenue;