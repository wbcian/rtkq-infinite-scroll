import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetCardsQuery } from "../lib/api/cardsApi";
import Card from "./Card";

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Container = styled.div`
  max-width: 800px;
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
    border-top: 6px solid #3498db;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const CardList: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const loader = useRef<HTMLDivElement>(null);

  const { data, error, isLoading, isFetching } = useGetCardsQuery({
    page,
    limit: 10
  });

  const handleObserver = (entries: IntersectionObserverEntry[]): void => {
    const target = entries[0];
    if (target.isIntersecting && data?.hasMore && !isFetching) {
      setPage(data.nextPage);
    }
  };

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
  }, [data, isFetching]);

  if (isLoading && !data) {
    return <LoadingMessage>Loading cards...</LoadingMessage>;
  }

  if (error) {
    console.error("Error loading cards:", error);
    return (
      <ErrorMessage>
        Error loading cards:{" "}
        {"status" in error ? error.status : "message" in error ? error.message : "Unknown error"}
      </ErrorMessage>
    );
  }

  return (
    <Container>
      <h1>Card Gallery</h1>

      <CardGrid>
        {data?.data.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardGrid>

      <div ref={loader} style={{ height: "20px", margin: "20px 0" }}>
        {isFetching && <LoadingIndicator />}
        {!data?.hasMore && <LoadingMessage>No more cards to load</LoadingMessage>}
      </div>
    </Container>
  );
};

export default CardList;
