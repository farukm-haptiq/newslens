const { load } = require('cheerio');

export const extractImageURL = (content) => {
  const $ = load(content);
  const img = $('img').first();
  return img.attr('src') || null;
};

export const sanitizeHtml = (html) => {
  // Remove style tags and their content
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove inline styles
  html = html.replace(/ style="[^"]*"/gi, '');

  // Remove CSS imports
  html = html.replace(/@import\s+url$$[^)]+$$;?/gi, '');

  return html;
};

export const fallbackParse = (html, url) => {
  const $ = load(html);
  const title = $('title').text() || '';
  const content = $('body').html() || '';
  const textContent = $('body').text() || '';

  return {
    title,
    content,
    textContent,
    url,
  };
};

export const cleanUpSummary = (data) => {
  // Remove any potential JSON formatting artifacts
  let cleanedData = data.replace(/```json|```/g, '').replace(/[`]/g, '');

  // Remove empty lines and trim whitespace
  cleanedData = cleanedData
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');

  return cleanedData;
};
