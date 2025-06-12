export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },        
    };
        export const fetchMovies = async ({ 
            query, 
        }: { 
            query: string; 
        }): Promise<Movie[]> => {
            try {
                console.log('Fetching movies...');
                
                const endpoint = query 
                    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;  // Changed to popular movies endpoint
                
                console.log('Endpoint:', endpoint);
                
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: TMDB_CONFIG.headers,
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch movies: ${response.statusText}`);
                }
                
                
                const data = await response.json();
                console.log('Movies data received:', data.results?.length || 'no results');
                return data.results;
                
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        }
 

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGVhYTRhYjBlMDEwYjJhNWNiMmFjNWM5YzNhYzRmMyIsIm5iZiI6MTc0OTM5NTgxNC42MDYwMDAyLCJzdWIiOiI2ODQ1YTk2NmU5Y2E4YTdiM2MzZmM0YTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0GHelJOK2eZCulEKQvYNbltrpVpu2eX8QpC2n_deVo4'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));