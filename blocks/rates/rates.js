export default async function decorate(block) {
  const props = [...block.children];
  const path = props[1]?.textContent.trim();
  const highlightIndex = Number(props[2]?.textContent.trim());
  const cachebuster = Math.floor(Math.random() * 1000);

  
}
