export default async function decorate(block) {
  const props = [...block.children];
  const path = props[0]?.textContent.trim();
  const cachebuster = Math.floor(Math.random() * 1000);

  const main = document.createElement('div');
  main.innerHTML = "Loading Blog";

  if(!path) {
    return;
  }

  const url = `https://publish-p130746-e1298459.adobeaemcloud.com/graphql/execute.json/securbank/ArticleByPath;path=${path};variation=main?ts=${cachebuster}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    return;
  }

  const respJson = await resp.json();
  const articleJson = respJson.data.articleByPath.item;

  // Clear main div
  main.innerHTML = "";

  const header = document.createElement('h1');
  const author = document.createElement('h2');
  const content = document.createElement('div');

  header.classList.add("header");
  author.classList.add("author");
  content.classList.add("content");

  header.innerHTML = articleJson.headline;
  author.innerHTML = `By ${articleJson.author.name}`;
  content.innerHTML = articleJson.main.html;
  
  main.append(header, author, content);

  block.closest('.blog-wrapper').classList.add(path ? "single" : "list");
  block.closest('.blog').replaceWith(...main.childNodes);
}
