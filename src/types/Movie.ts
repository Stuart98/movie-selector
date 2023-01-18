import Trailer from './Trailer';

export default interface Movie {
    id: number;
    imdbId: string;
    title: string;
    name: string | null;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    media_type: string;
    trailer: Trailer | null
};