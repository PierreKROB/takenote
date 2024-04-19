import React, { useState } from 'react';
import { Box, Text, VStack, Spinner, IconButton, Flex, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Input } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { TiPinOutline } from "react-icons/ti";

// Fonction pour surligner les correspondances dans un texte
const highlightMatches = (text, searchTerm) => {
  const regex = new RegExp(searchTerm, 'gi');
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};

const NotesList = ({ notes, onSelectNote, onDeleteNote, onPinNote, isLoading, selectedNote }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteNote(noteToDelete);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSelectNote = (note) => {
    onSelectNote(note);
  };

  const handlePinNote = (id) => {
    onPinNote(id);
  };

  // Fonction pour rendre le titre et le contenu de la note avec les correspondances surlignées
  const renderHighlightedText = (text) => {
    return { __html: highlightMatches(text, searchTerm) };
  };

  const filteredNotes = notes.filter(note => {
    const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || contentMatch;
  });

  if (isLoading) {
    return (
      <VStack>
        <Spinner size="xl" color="blue.500" />
      </VStack>
    );
  }

  return (
    <VStack spacing={1}>
      <Input
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      {filteredNotes
        .sort((a, b) => b.isPinned - a.isPinned)
        .map(note => (
          <Box
            key={note.id}
            onClick={() => handleSelectNote(note)}
            p={4}
            bg="blue.800"
            color="whiteAlpha.900"
            cursor="pointer"
            _hover={{ bg: 'blue.600' }}
            borderRadius="md"
            position="relative"
            w="280px"
          >
            <Text
              fontWeight="bold"
              isTruncated
              w="calc(100% - 80px)"
              dangerouslySetInnerHTML={renderHighlightedText(note.title)}
            />

            <IconButton
              icon={<TiPinOutline />}
              aria-label="Pin note"
              color={note.isPinned ? "red.500" : "white"}
              variant="ghost"
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              right="60px"
              onClick={(e) => {
                e.stopPropagation();
                handlePinNote(note.id);
              }}
              size="sm"
              isRound
            />
            <IconButton
              icon={<FaTrashAlt />}
              aria-label="Delete note"
              colorScheme="red"
              variant="ghost"
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              right="16px"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note.id);
              }}
              size="sm"
              isRound
            />
          </Box>
        ))}
      
      {/* Modal de confirmation de suppression */}
      <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cette note ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirmDelete}>
              Confirmer
            </Button>
            <Button variant="ghost" onClick={handleCancelDelete}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default NotesList;
