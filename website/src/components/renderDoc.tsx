import * as React from 'react';

export const RenderDoc = ({ html }: { html: string }) => {
  let __html = html;
  if (process.env.NODE_ENV !== 'development') {
    __html = html.replace(
      /http:\/\/10\.196\.200\.185:8416\/svg/g,
      'https://ximing.ren/plantuml/svg'
    );
  }
  return (
    <div
      className="doc-container"
      dangerouslySetInnerHTML={{
        __html,
      }}
    ></div>
  );
};
