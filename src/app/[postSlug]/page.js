import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { cache, lazy, Suspense } from "react";
import CodeSnippet from "@/components/CodeSnippet";
const DivisionGroupsDemo = lazy(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = lazy(() =>
  import("@/components/CircularColorsDemo")
);

const cachedLoadBlogPost = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const post = await cachedLoadBlogPost(postSlug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract || "A detailed blog post",
  };
}

export default function BlogPost({ params }) {
  const { postSlug } = params;
  return (
    <article className={styles.wrapper}>
      {" "}
      <Suspense>
        {" "}
        <BlogPostContent slug={postSlug} />{" "}
      </Suspense>{" "}
    </article>
  );
}

async function BlogPostContent({ slug }) {
  const post = await cachedLoadBlogPost(slug);
  return (
    <>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </>
  );
}
