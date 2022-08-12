import React from 'react';
import { Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import "./Font.css";


const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
