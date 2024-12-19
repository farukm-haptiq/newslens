import { JSDOM } from 'jsdom';

export const extractImageURL = (htmlContent) => {
  const dom = new JSDOM(htmlContent); // Parse the HTML
  const document = dom.window.document;

  // Find the first <img> tag within the article
  const imageElement = document.querySelector('img');

  // Return the image URL if the <img> tag is found
  if (imageElement && imageElement.src) {
    return imageElement.src;
  }

  return 'No image found in the HTML content.';
};
