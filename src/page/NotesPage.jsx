import React, { useState, useEffect } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import NotesList from '../components/NotesList';
import NoteDetail from '../components/NoteDetail';
import { useGetRequest } from '../utils/hooks/useGetRequest';
import { usePutRequest } from '../utils/hooks/usePutRequest';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoading, data, error } = useGetRequest('/notes');
    const { loading: putting, error: putError, success: putSuccess, putData } = usePutRequest('/notes');
    const toast = useToast();

    useEffect(() => {
        if (data) {
            setNotes(data);
        }
    }, [data]);

    const handleSelectNote = (note) => {
        setSelectedNote(note);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePinNote = async (id) => {
        const noteToPin = notes.find(note => note.id === id);
        if (noteToPin) {
            const updatedNote = { ...noteToPin, isPinned: !noteToPin.isPinned };
            await putData(`/notes/${id}`, updatedNote);
            
            if (!putError) {
                setNotes(currentNotes =>
                    currentNotes.map(note =>
                        note.id === id ? updatedNote : note
                    )
                );
                toast({
                    title: `Note ${updatedNote.isPinned ? 'épinglée' : 'désépinglée'}`,
                    description: `La note a été ${updatedNote.isPinned ? 'épinglée' : 'désépinglée'} avec succès.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Erreur lors de l\'épinglage',
                    description: putError,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleSaveNote = (note) => {
        const isUpdate = note.id;
        const method = isUpdate ? 'PUT' : 'POST';
        const url = `http://localhost:3001/notes${isUpdate ? `/${note.id}` : ''}`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...note,
                title: note.title || 'Nouvelle Note',
                content: note.content || ''
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (isUpdate) {
                    setNotes(notes.map(n => n.id === note.id ? data : n));
                } else {
                    setNotes([...notes, data]);
                    setSelectedNote(null); // Réinitialise la note sélectionnée après la création d'une nouvelle note
                }
                toast({
                    title: isUpdate ? 'Note mise à jour.' : 'Note créée.',
                    description: isUpdate ? "La note a été mise à jour avec succès." : "Une nouvelle note a été créée avec succès.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                console.error('Failed to save the note:', error);
                toast({
                    title: 'Erreur de sauvegarde',
                    description: "Un problème est survenu lors de la sauvegarde de la note.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    };


    const handleDeleteNote = (id) => {
        fetch(`http://localhost:3001/notes/${id}`, { method: 'DELETE' })
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    const handleCancelEdit = () => {
        setSelectedNote(null);
    };

    if (error) {
        toast({
            title: 'Erreur de chargement',
            description: "Un problème est survenu lors du chargement des notes.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }

    return (
        <>
        <Flex direction={{ base: 'column', lg: 'row' }} h="100vh">
            <Flex w="300px" p={4} overflowY="auto" bg="blue.800" color="whiteAlpha.900">
                <NotesList notes={notes} onSelectNote={handleSelectNote} onDeleteNote={handleDeleteNote} onPinNote={handlePinNote} isLoading={isLoading} onSearch={handleSearch} />
            </Flex>
            <Flex flex="1" p={2} h="100vh">
                <Box w="100%" h="100%">
                    <NoteDetail note={selectedNote} onSave={handleSaveNote} onCancel={handleCancelEdit} searchTerm={searchTerm} />
                </Box>
            </Flex>
        </Flex>

    </>
    );
};

export default NotesPage;
