import { useState } from 'react';

export function usePutRequest(url){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const putData = async (url, data) => {
        try {
            const response = await fetch(`http://localhost:3001${url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const errorMessage = await response.text();
                setError(`Erreur ${response.status}: ${errorMessage}`);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError("Une erreur s'est produite lors de la requête. Veuillez réessayer plus tard.");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, putData };
};

