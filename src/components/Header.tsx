import { Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <header className="main-header">
      <Heading as="h1" size="lg">Movie Shortlist</Heading>
    </header>
  );
}