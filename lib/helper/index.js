import { JSDOM } from 'jsdom';

export const extractImageURL = (htmlContent) => {
  const dom = new JSDOM(htmlContent); // Parse the HTML
  const document = dom.window.document;

  const imageElement = document.querySelector('img');

  if (imageElement && imageElement.src) {
    // console.log('Image URL found:', imageElement.src);
    return imageElement.src;
  }

  // console.log('No image found or image has no src attribute.');
  return null;
};
