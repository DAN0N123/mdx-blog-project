import { getBlogPostList } from "@/helpers/file-helpers";
import BlogSummaryCard from "../BlogSummaryCard/BlogSummaryCard";
import React from "react";

async function BlogSummaryCardList() {
  const blogPostList = await getBlogPostList();

  return (
    <>
      {blogPostList.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn}
        ></BlogSummaryCard>
      ))}
    </>
  );
}

export default BlogSummaryCardList;
