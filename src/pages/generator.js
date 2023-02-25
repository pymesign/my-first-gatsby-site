// Step 1: Import React
import * as React from "react";
import Layout from "./components/Layout";
import Seo from "./components/Seo";
import Meme from "./components/Meme";
import "./Style.css";

// Step 2: Define your component
const MemePage = () => {
  return (
    <Layout pageTitle="Meme Generator">
      <p>You can generate your meme here.</p>
      <Meme />
    </Layout>
  );
};

export const Head = () => <Seo title="Meme Generator" />;

// Step 3: Export your component
export default MemePage;
