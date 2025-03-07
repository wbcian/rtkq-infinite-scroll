import { useState } from "react";
import styled from "styled-components";
import CardList from "./CardList";
import AnimeCardList from "./AnimeCardList";
import React from "react";

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: ${(props) =>
    props.active ? "linear-gradient(90deg, #3498db, #2980b9)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  border-bottom: ${(props) => (props.active ? "2px solid #2980b9" : "2px solid transparent")};
  margin-right: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &:hover {
    background: ${(props) =>
      props.active ? "linear-gradient(90deg, #3498db, #2980b9)" : "#f5f5f5"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const TabDescription = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;

  h2 {
    margin-top: 0;
    color: #333;
    font-size: 1.3rem;
  }

  p {
    color: #666;
    margin-bottom: 0;
  }

  code {
    background-color: #e0e0e0;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9rem;
  }
`;

const TabButton: React.FC<TabProps> = ({ active, onClick, children }) => (
  <Tab active={active} onClick={onClick}>
    {children}
  </Tab>
);

const TabContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Container>
      <TabsContainer>
        <TabButton active={activeTab === 0} onClick={() => setActiveTab(0)}>
          Standard Approach
        </TabButton>
        <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
          Anime Cards Approach
        </TabButton>
      </TabsContainer>

      {activeTab === 0 && (
        <>
          <TabDescription>
            <h2>Manual Infinite Scroll with RTK Query</h2>
            <p>
              This approach uses a standard RTK Query endpoint with custom merging logic for
              pagination.
            </p>
            <p>Key implementation details:</p>
            <ul>
              <li>
                Uses <code>builder.query</code> with <code>merge</code> and{" "}
                <code>serializeQueryArgs</code>
              </li>
              <li>Manually tracks pagination state with useState</li>
              <li>Uses IntersectionObserver to detect when to load more</li>
            </ul>
          </TabDescription>
          <CardList />
        </>
      )}

      {activeTab === 1 && (
        <>
          <TabDescription>
            <h2>Alternative Approach with Custom Page Structure</h2>
            <p>
              This approach also uses standard RTK Query but with a different pattern for
              maintaining page history.
            </p>
            <p>Key implementation details:</p>
            <ul>
              <li>
                Uses <code>builder.query</code> with a more sophisticated <code>merge</code>{" "}
                function
              </li>
              <li>
                Maintains a <code>pages</code> array in the cache for page history
              </li>
              <li>Visual display focuses on anime-style cards with different styling</li>
              <li>
                Shows how different UI approaches can be used with the same core RTK Query pattern
              </li>
            </ul>
          </TabDescription>
          <AnimeCardList />
        </>
      )}
    </Container>
  );
};

export default TabContainer;
