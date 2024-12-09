export default async function decorate(block) {
  const props = [...block.children];
  const path = props[0]?.textContent.trim();
  const cachebuster = Math.floor(Math.random() * 1000);

  const main = document.createElement('div');
  main.innerHTML = "Loading Author";

  if(!path) {
    return;
  }

  const url = `https://publish-p130746-e1298459.adobeaemcloud.com/graphql/execute.json/securbank/AuthorByPath;path=${path};variation=main?ts=${cachebuster}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    return;
  }

  const respJson = await resp.json();
  const authorJson = respJson.data.articleByPath.item;

  // Clear main div
  main.innerHTML = "";

  const name = document.createElement('div');

  name.classList.add("author-name");
  name.innerHTML = authorJson.name;
  
  main.append(name);

  block.innerHTML = "";
  block.append(main);
}
