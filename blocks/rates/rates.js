/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

/* eslint-disable no-console */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadSections,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let variation = params.variation ?? "main";

  if (path && path.startsWith('/')) {
    const resp = await fetch("https://author-p130746-e1298459.adobeaemcloud.com/graphql/execute.json/securbank/AccountRatesList");
    if (resp.ok) {
      const main = document.createElement('div');

      const respJson = await resp.json();
      const accountsJson = respJson.data.accountRatesList.items;
  
      accountsJson.forEach(function (account) {
        const accountDiv = document.createElement('div');
        const header = document.createElement('div');
        const rows = document.createElement('div');
        const headerRow = document.createElement('div');

        header.innerHTML = account.accountName;
        headerRow.innerHTML = '<span>Rate</span><span>Product</span>';
        accountDiv.append(header);
        accountDiv.append(rows);
        accountDiv.append(headerRow);

        account.rates.forEach(function(rate) {
          const rateDiv = document.createElement('div');

          rateDiv.innerHTML = `<span>${rate.rate}</span><span>${rate.accountType}</span>`;
          accountDiv.append(rate);
        });

        main.append(accountDiv);
      });

      decorateMain(main);
      await loadSections(main);
      
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.adventure').replaceWith(...fragment.childNodes);
    }
  }
}
