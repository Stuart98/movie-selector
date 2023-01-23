import { useState, useCallback } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

    Button,
    Input,
    List,
    ListItem,
    Text,
    Badge,
} from '@chakra-ui/react';

import Movie from './../types/Movie';
import Trailer from './../types/Trailer';

type Props = {
    isOpen: boolean;
    title: string | null;
    onSelect: (movie: Movie) => void;
    onClose: () => void;
};

type SearchAPIResponse = {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
};

type TrailerAPIResponse = {
    page: number;
    results: Trailer[];
    total_results: number;
    total_pages: number;
};

export default function MovieSearch(props: Props) {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Movie[]>([] as Movie[]);

    // search for a movie or tv show
    const search = async (query: string): Promise<SearchAPIResponse> => {
        const API_KEY = '72afa62f9d07c3dcd73afcdbc6b69feb';
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;
        
        const response = await fetch(url, {
            method: 'GET'
        });

        return response.json();
    }

    // tries to fetch a Trailer for the given movie
    const getTrailer = async (movie: Movie): Promise<Trailer> => {
        const API_KEY = '72afa62f9d07c3dcd73afcdbc6b69feb';
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json() as TrailerAPIResponse;

        // get only the trailers and sort by official (so official: true is first);
        const processedResults = data.results
            .filter((video: any) => video.type === 'Trailer')
            .sort((a: any, b: any) => b.official - a.official);
        
        return processedResults[0];
    };

    // filter out the results that are not movies or tv shows, and normalise the title field (TV Shows use the name field instead of title)
    const processResults = (results: Movie[]): Movie[] => {
        return results
            .filter((movie: Movie) => ['movie', 'tv'].indexOf(movie.media_type) >= 0)
            .map((movie: Movie) => ({ ...movie, title: movie.title || movie.name } as Movie)); // normalise the title field
    };

    // handler for click on a result item. try and find a trailer then call the onSelect handler
    const onSearchResultClick = useCallback((movie: Movie) => async () => {
        const trailer = await getTrailer(movie);

        if (trailer) {
            movie.trailer = trailer;
        }

        props.onSelect(movie);
    }, []);

    // handler for input change. search for the query and update the search results
    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);

        const results = await search(query) as SearchAPIResponse;

        const searchResults = processResults(results.results || []);

        setSearchResults(searchResults);
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                {props.title && <ModalHeader>{props.title}</ModalHeader>}
                <ModalBody>
                    <Input placeholder="Start typing a movie or show name..." onChange={onInputChange}></Input>

                    {searchResults.length > 0 && 
                        <List className="movie-search-list" spacing={3}>
                            {
                                searchResults.map((movie: Movie) => (
                                    <ListItem className="movie-search-result" key={movie.id}>
                                        <button onClick={onSearchResultClick(movie)}>
                                            {movie.poster_path && <img src={`http://image.tmdb.org/t/p/w45${movie.poster_path}`} />}
                                            <div className="wrapper">
                                                <Text className="title">{movie.title}<Badge ml={3} colorScheme="purple">{movie.media_type}</Badge></Text>
                                                {movie.release_date && <Text className="date">{movie.release_date.split('-')[0]}</Text>}
                                                <Text className="overview">{movie.overview}</Text>
                                            </div>
                                        </button>
                                    </ListItem>
                                ))
                            }
                        </List>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}