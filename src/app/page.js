import React from "react";
import { Suspense } from "react";
import BlogSummaryCardList from "@/components/BlogSummaryCardList";
import styles from "./homepage.module.css";
import Spinner from "@/components/Spinner";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata() {
  return {
    title: BLOG_TITLE,
    description: "A wonderful blog about JavaScript",
  };
}

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      <Suspense fallback={<Spinner />}>
        <BlogSummaryCardList />
      </Suspense>
    </div>
  );
}

export default Home;
