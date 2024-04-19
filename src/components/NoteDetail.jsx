import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

const NoteDetail = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (note && note.id) {
      resetTimeout();
    }
  };
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (note && note.id) {
      resetTimeout();
    }
  };

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(handleSave, 1000); // Modifier ici le délai selon vos besoins
    setTimeoutId(newTimeoutId);
  };

  const handleCancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    onCancel();
  };

  return (
    <Box p="5" borderWidth="1px" borderRadius="lg" bg="blue.800" color="whiteAlpha.900">
      <FormControl id="noteTitle" isRequired>
        <FormLabel>Titre de la note</FormLabel>
        <Input placeholder="Titre" value={title} onChange={handleTitleChange} bg="blue.900" borderColor="blue.500" _hover={{ borderColor: "blue.300" }} />
      </FormControl>
      <FormControl id="noteContent" mt="2">
        <FormLabel>Contenu</FormLabel>
        <Textarea placeholder="Contenu de la note" value={content} onChange={handleContentChange} bg="blue.900" borderColor="blue.500" _hover={{ borderColor: "blue.300" }} />
      </FormControl>
      <Button mt="3" colorScheme="blue" onClick={handleSave} disabled={!note?.id}>
        {note?.id ? 'Sauvegarder' : 'Créer'}
      </Button>
      <Button mt="3" ml="2" colorScheme="red" variant="ghost" onClick={handleCancel}>
        Annuler
      </Button>
    </Box>
  );
};

export default NoteDetail;
