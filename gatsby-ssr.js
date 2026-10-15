import React from "react";

const pathPrefix = (process.env.PATH_PREFIX || "").replace(/\/$/, "");
const faviconHref = `${pathPrefix}/favicon.png`;

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });
  setHeadComponents([
    <link
      key="favicon"
      rel="icon"
      type="image/png"
      sizes="64x64"
      href={faviconHref}
    />,
  ]);
};
