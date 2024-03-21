import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

const NoteDetail = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const isNewNote = !note;

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);
  

  const handleSave = () => {
    onSave({ ...note, title, content });
    if (isNewNote) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <Box p="5" borderWidth="1px" borderRadius="lg" bg="gray.700" color="white">
      <FormControl id="noteTitle" isRequired>
        <FormLabel>Titre de la note</FormLabel>
        <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="noteContent" mt="4">
        <FormLabel>Contenu</FormLabel>
        <Textarea placeholder="Contenu de la note" value={content} onChange={(e) => setContent(e.target.value)} />
      </FormControl>
      <Button mt="4" colorScheme="blue" onClick={handleSave}>
        {isNewNote ? 'Créer' : 'Sauvegarder'}
      </Button>
      <Button mt="4" ml="4" colorScheme="red" variant="outline" onClick={onCancel}>
        Annuler
      </Button>
    </Box>
  );
};

export default NoteDetail;
