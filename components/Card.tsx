import styled from "styled-components";
import React from "react";

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
}

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 8px 0;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`;

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <CardContainer>
      <CardImage src={card.imageUrl} alt={card.title} />
      <CardTitle>{card.title}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
    </CardContainer>
  );
};

export default Card;
