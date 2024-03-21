import React from 'react';
import { Box, VStack, Text, Button, Divider, Avatar } from '@chakra-ui/react';
import { FaHome, FaTasks, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Spacebar = () => {
    return (
        <Box w="250px" p="5" bg="gray.600" h="100vh">
            <VStack spacing="5">
                <Avatar name="Take Note" src="path/to/your/profile.jpg" />
                <Text fontWeight="bold">Take Note</Text>
                <Divider />
                <VStack w="full" spacing={1}>
                    <Button leftIcon={<FaHome />} w="full" justifyContent="flex-start" variant="ghost" aria-label="Accueil">
                        Accueil
                    </Button>
                    <Button as={Link} to="/notes" leftIcon={<FaStickyNote />} w="full" justifyContent="flex-start" variant="ghost" aria-label="Notes">
                        Notes
                    </Button>;
                    <Button leftIcon={<FaTasks />} w="full" justifyContent="flex-start" variant="ghost" aria-label="Tâches">
                        Tâches
                    </Button>
                    <Button leftIcon={<FaCalendarAlt />} w="full" justifyContent="flex-start" variant="ghost" aria-label="Agenda">
                        Agenda
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default Spacebar;