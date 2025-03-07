import { useRef, useEffect } from "react";
import styled from "styled-components";
import { useGetAnimeCardsInfiniteQuery } from "../lib/api/cardsApi";
import AnimeCard from "./AnimeCard";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff3333;
  background-color: #ffeeee;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #ff6b6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #ffd166);
  }
`;

const AnimeCardList = () => {
  const loader = useRef(null);

  // Using the infiniteQuery hook
  const { data, error, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetAnimeCardsInfiniteQuery({
      limit: 8
    });

  // Intersection observer handler
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  // Setup observer when component mounts
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (isLoading && !data) {
    return <LoadingMessage>Loading anime cards...</LoadingMessage>;
  }

  if (error) {
    console.error("Error loading anime cards:", error);
    return (
      <ErrorMessage>
        Error loading anime cards: {error.status || error.message || "Unknown error"}
      </ErrorMessage>
    );
  }

  // Get all items from all pages
  const allItems = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <Container>
      <Header>Anime Collection</Header>

      <CardGrid>
        {allItems.map((card) => (
          <AnimeCard key={card.id} card={card} />
        ))}
      </CardGrid>

      <div ref={loader} style={{ height: "20px", margin: "20px 0" }}>
        {isFetching && <LoadingIndicator />}
        {!hasNextPage && allItems.length > 0 && (
          <LoadingMessage>You've reached the end of the collection</LoadingMessage>
        )}
      </div>
    </Container>
  );
};

export default AnimeCardList;
