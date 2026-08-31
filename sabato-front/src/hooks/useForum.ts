// src/hooks/useForums.js
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environments/api";

export const useForums = () => {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/v1/foro`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar los foros");
                return res.json();
            })
            .then((data) => {
                setForums(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { forums, loading, error };
};
