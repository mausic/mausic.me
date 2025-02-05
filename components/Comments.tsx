"use client";

import { Comments as CommentsComponent } from "pliny/comments";
import { useEffect, useMemo, useState } from "react";
import siteMetadata from "@/data/siteMetadata";
import { useTheme } from "next-themes";

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => {
    console.log(theme);
    console.log(resolvedTheme);
  }, [theme, resolvedTheme]);

  const commentsConfig = useMemo(() => {
    if (!siteMetadata.comments) {
      return;
    }
    if ("giscusConfig" in siteMetadata.comments) {
      return {
        ...siteMetadata.comments,
        giscusConfig: {
          ...siteMetadata.comments.giscusConfig,
          theme:
            resolvedTheme === "dark"
              ? siteMetadata.comments.giscusConfig.darkTheme
              : siteMetadata.comments.giscusConfig.theme,
        },
      };
    }
    return siteMetadata.comments;
  }, [resolvedTheme]);

  return (
    <>
      {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
      {commentsConfig && loadComments && (
        <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
      )}
    </>
  );
}
