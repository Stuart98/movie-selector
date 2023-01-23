import { useState, useCallback } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Heading, IconButton, Button, Flex, Box, Spacer, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

import List from '../types/List';
import Movie from '../types/Movie';

import MovieItem from './MovieItem';
import InlineEditor from './InlineEditor';

type Props = {
  list: List; // the List to display
  onAddMovieClick: Function | null;
  onDeleteMovieClick: Function | null;
  onDeleteListClick: Function;
}

export default function ListComponent({ list, onAddMovieClick, onDeleteMovieClick, onDeleteListClick }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const onEditListName = () => {
    setIsEditing(true);
  };

  const onInlineEditorSave = (value: string) => {
    list.title = value;
  }

  const onInlineEditorClose = () => {
    setIsEditing(false);
  }

  const onDeleteListClickHandler = useCallback((list: List) => () => {
    onDeleteListClick(list);
  }, []);

  const onDeleteMovieClickHandler = (movie: Movie) => {
    onDeleteMovieClick && onDeleteMovieClick(list, movie);
  }

  return (

    <Card key={list.id} mb={10}>
      <CardHeader>
        <Flex alignItems="center">
          <Box>
            <Heading size='md'>
              {list.title}
              <IconButton ml={5} aria-label='Edit List Title' icon={<EditIcon />} size="xs" onClick={onEditListName} />
              <IconButton ml={5} aria-label='Delete List' icon={<DeleteIcon />} size="xs" onClick={onDeleteListClickHandler(list)} />
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme='blue' size="md" onClick={(e) => onAddMovieClick && onAddMovieClick(list as List, e)}><AddIcon mr={3} /> Add Movie</Button>
          </Box>
        </Flex>
        
      </CardHeader>

      <CardBody pt={0}>
        <Box whiteSpace="nowrap" overflowX="auto">
          {list.movies.length > 0 && list.movies.map((movie) => (
            <Box display="inline-block" w={250} m={1} key={movie.id}>
              <MovieItem key={movie.id} movie={movie} onDeleteMovieClick={onDeleteMovieClickHandler}></MovieItem>
            </Box>
          ))}

          {list.movies.length === 0 &&
            <Box textAlign="center">
                <Text fontSize="xl">Add a Movie or Show</Text>
            </Box>
          }
        </Box>

        {isEditing && <InlineEditor isOpen={true} title="Edit Title" initialValue={list.title} onSave={onInlineEditorSave} onClose={onInlineEditorClose} />}
      </CardBody>
    </Card>
  );
}