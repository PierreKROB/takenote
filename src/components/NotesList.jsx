import React from 'react';
import { Box, Text, Button, VStack, Spinner } from '@chakra-ui/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const NotesList = ({ notes, onSelectNote, onDeleteNote, isLoading }) => {

    const handleDeleteNote = (id) => {
        onDeleteNote(id);
    };

    const handleSelectNote = (note) => {
        onSelectNote(note); 
    };
    
    if (isLoading) {
        return (
            <VStack>
                <Spinner size="xl" />
            </VStack>
        );
    }

    return (
        <VStack>
            {notes.map(note => (
                <Box key={note.id} w="100%" p={4} borderWidth="1px" borderColor="gray.200" cursor="pointer">
                    <Text fontWeight="bold" mb={2}>{note.title}</Text>
                    <Text noOfLines={1} mb={2}>{note.content}</Text>
                    <Button leftIcon={<FaEdit />} size="sm" colorScheme="blue" mr={"3"} onClick={() => handleSelectNote(note)}>
                        Edit
                    </Button>
                    <Button leftIcon={<FaTrashAlt />} size="sm" colorScheme="red" onClick={() => handleDeleteNote(note.id)}>
                        Delete
                    </Button>
                </Box>
            ))}
        </VStack>
    );
};

export default NotesList;
