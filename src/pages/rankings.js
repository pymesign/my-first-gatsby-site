// Step 1: Import React
import * as React from "react";
import Layout from "./components/Layout";
import Seo from "./components/Seo";
import TopFiveList from "./components/TopFiveList";
import "./App.css";

// Step 2: Define your component
const RankingsPage = () => {
  return (
    <Layout pageTitle="Rankings">
      <p>Vote your favorite list.</p>
      <TopFiveList title="Mi lista" />
    </Layout>
  );
};

export const Head = () => <Seo title="Rankings" />;

// Step 3: Export your component
export default RankingsPage;
