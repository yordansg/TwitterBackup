import React from 'react';
import serialize from 'serialize-javascript';
import config from '../config';

interface PropTypes {
  title: string;
  description: string;
  styles?: Array<{
    id: string;
    cssText: string;
  }>;

  scripts?: string[];
  app: any;
  children: string;
}

const Html = ({
  title,
  description,
  styles = [],
  scripts = [],
  app,
  children,
}: PropTypes) => (
  <html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {scripts.map(script => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}

      {/* <link rel="manifest" href="/site.webmanifest" /> */}
      {styles.map(style => (
        <style
          key={style.id}
          id={style.id}
          dangerouslySetInnerHTML={{ __html: style.cssText }}
        />
      ))}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
      />

      {scripts.map(script => (
        <script key={script} src={script} />
      ))}
    </body>
  </html>
);

export default Html;
