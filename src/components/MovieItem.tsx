import { useState, useCallback } from 'react';

import { Card, CardBody, Heading, Badge, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import Movie from '../types/Movie';
import YouTubePlayer from './YouTubePlayer';


type Props = {
  movie: Movie;
  onDeleteMovieClick: Function;
}

export default function MovieItem({ movie, onDeleteMovieClick }: Props) {
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  const onDeleteMovieClickHandler = useCallback((movie: Movie) => () => {
    onDeleteMovieClick(movie);
  }, []);

  return (

    <Card key={movie.id} m={3} className="movie-item">
      <CardBody>
        {movie.poster_path && <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} />}
        <Heading size="sm">
          {movie.title} <Badge colorScheme="purple">{movie.media_type}</Badge>
        </Heading>
        {movie.release_date && <Text className="date" mb={3}>{movie.release_date.split('-')[0]}</Text>}
        
        <Flex>
          {movie.trailer && <Button size="sm" onClick={() => setShowPlayer(true)}>Trailer</Button>}
          <Spacer></Spacer>
          <IconButton ml={5} aria-label='Delete List' icon={<DeleteIcon />} size="sm" onClick={onDeleteMovieClickHandler(movie)} />
        </Flex>

        <Modal isOpen={showPlayer} size="xl" onClose={() => setShowPlayer(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{movie.title}</ModalHeader>
            <ModalCloseButton />
            <YouTubePlayer title={movie.title} videoKey={movie.trailer ? movie.trailer.key : ''}></YouTubePlayer>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}