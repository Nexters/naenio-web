import React from 'react';
import { Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import GlobalFonts from "./fonts/fonts";


const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <Routes>
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
