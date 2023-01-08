export const createHtmlElement = (
  tagName: string = 'div',
  attributes: Record<string, string> = {},
  textContent: string = ''
) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, attribute]) => {
    element.setAttribute(key, attribute);
  });
  element.textContent = textContent;
  return element;
};
