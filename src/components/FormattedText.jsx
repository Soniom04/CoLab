import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import DOMPurify from 'dompurify';

const FormattedText = ({ html }) => {
  const cleanHtml = DOMPurify.sanitize(html);

  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'strong':
          case 'b':
            return <span className="font-bold">{domToReact(domNode.children, options)}</span>;
          case 'em':
          case 'i':
            return <span className="italic">{domToReact(domNode.children, options)}</span>;
          case 'u':
            return <span className="underline">{domToReact(domNode.children, options)}</span>;
          case 'p':
            return <p className="mb-2">{domToReact(domNode.children, options)}</p>;
          case 'ul':
            return <ul className="list-disc list-inside mb-2">{domToReact(domNode.children, options)}</ul>;
          case 'ol':
            return <ol className="list-decimal list-inside mb-2">{domToReact(domNode.children, options)}</ol>;
          case 'li':
            return <li className="mb-1">{domToReact(domNode.children, options)}</li>;
          default:
            return;
        }
      }
    }
  };

  return <div className="text-gray-900 leading-[1rem]">{parse(cleanHtml, options)}</div>;
};

export default FormattedText;
