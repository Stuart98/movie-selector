import { Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <header className="main-header">
      <Heading as="h1" size="lg">Movie Shortlister</Heading>
      <Heading as="h2" size="sm">Create shortlists of movies and TV shows for your kids to choose</Heading>
    </header>
  );
}