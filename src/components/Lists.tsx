import { useState } from 'react';
import { Button, Box, Text } from '@chakra-ui/react'

import List from './../types/List';
import Movie from './../types/Movie';

import ListComponent from './List';
import MovieSearch from './MovieSearch';


export default function Lists() {
  const [lists, setLists] = useState<List[]>([] as List[]);
  const [isAddingList, setIsAddingList] = useState<List | null>(null);
  
  const addList = () => {
    const newLists = [...lists, {
      id: lists.length + 1,
      title: 'New List',
      movies: [] as Movie[]
    } as List];

    setLists(newLists);
  }

  const onAddMovieClick = (list: List) => {
    setIsAddingList(list);
  };

  const onDeleteMovieClick = (list: List, movie: Movie) => {
    list.movies = list.movies.filter((m) => m.id !== movie.id);

    setLists((current) => ([...current]));
  }

  const onDeleteListClick = (list: List) => {
    setLists((current) => current.filter((l) => l.id !== list.id));
  };

  const onMovieSelect = (movie: Movie) => {
    if (isAddingList) {
      isAddingList.movies = [...isAddingList.movies, { ...movie }];
    }

    setLists([...lists]);

    setIsAddingList(null);
  }

  return (
    <Box m={30}>

      <Button size="lg" colorScheme='blue' onClick={() => addList()}>Add Shortlist</Button>

      <Box py={5}>
        {
          lists.length > 0 &&
          lists.map((list) => (
            <ListComponent key={list.id} list={list} onAddMovieClick={onAddMovieClick} onDeleteMovieClick={onDeleteMovieClick} onDeleteListClick={onDeleteListClick}></ListComponent>
          ))
        }

        {
          lists.length === 0 &&
          <Box mt={10} textAlign="center">
              <Text fontSize="3xl">Add a Shortlist</Text>
          </Box>
        }
      </Box>

      {isAddingList && <MovieSearch isOpen={true} title="Add Movie" onSelect={onMovieSelect} onClose={() => setIsAddingList(null)}></MovieSearch>}
    </Box>
  );
}