import styled from "styled-components";
import React from "react";

interface AnimeCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    animeType?: string;
    episodes?: number;
    rating?: string | number;
    releaseYear?: number;
    studio?: string;
    year?: number;
  };
}

const AnimeCardContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #ffd166, #06d6a0, #118ab2, #073b4c);
    z-index: 10;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 320px;
  overflow: hidden;
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${AnimeCardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const AnimeType = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 5;
`;

const ContentContainer = styled.div`
  padding: 16px;
  position: relative;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: #333;
  font-weight: 700;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: #666;
`;

const Description = styled.p`
  margin: 12px 0 0 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
`;

const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #ffd700;
  color: #333;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.8rem;

  &::before {
    content: "★";
    margin-right: 4px;
  }
`;

const AnimeCard: React.FC<AnimeCardProps> = ({ card }) => {
  return (
    <AnimeCardContainer>
      <ImageContainer>
        <AnimeImage src={card.imageUrl} alt={card.title} />
        {card.animeType && <AnimeType>{card.animeType}</AnimeType>}
      </ImageContainer>
      <ContentContainer>
        <Title>{card.title}</Title>
        <InfoRow>
          <div>{card.episodes || 0} episodes</div>
          <div>{card.releaseYear || card.year || 2020}</div>
        </InfoRow>
        <RatingBadge>{card.rating}</RatingBadge>
        <Description>{card.description}</Description>
      </ContentContainer>
    </AnimeCardContainer>
  );
};

export default AnimeCard;
