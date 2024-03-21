import React, { useState, useEffect } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import NotesList from '../components/NotesList';
import NoteDetail from '../components/NoteDetail';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3001/notes')
            .then(response => response.json())
            .then(data => {
                setNotes(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch notes:', error);
                setIsLoading(false);
                toast({
                    title: 'Erreur de chargement',
                    description: "Un problème est survenu lors du chargement des notes.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [toast]);

    const handleSelectNote = (note) => {
        setSelectedNote(note);
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
                }
                setSelectedNote(null);
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

    return (
        <>

            <Flex direction={{ base: 'column', lg: 'row' }}>
                <Flex w={{ base: '100%', lg: '30%' }} p={4} overflowY="auto">
                    <NotesList notes={notes} onSelectNote={handleSelectNote} onDeleteNote={handleDeleteNote} isLoading={isLoading} />
                </Flex>
                <Flex flex="1" p={4}>
                    {selectedNote ? (
                        <NoteDetail note={selectedNote} onSave={handleSaveNote} onCancel={handleCancelEdit} />
                    ) : (
                        <NoteDetail onSave={handleSaveNote} onCancel={handleCancelEdit} />
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default NotesPage;
