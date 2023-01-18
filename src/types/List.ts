import Movie from './Movie';

export default interface List {
    id: number;
    title: string;
    movies: Movie[];
};