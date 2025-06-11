// fetchMovies

// fetchMovieDetails

// useFetch(fetchMovies)

import React from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction()
            setData(result);

        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err: new Error('An error occurred.'))
        } finally {
            setLoading(false);
        }
    }
    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }
    React.useEffect(() => {
        if (autoFetch) {
            fetchData();
        }

    }, []);
    return { data, loading, error, refetch: fetchData, reset } 
}

export default useFetch;