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
  const main = document.createElement('div');
  main.innerHTML = "Loading Rates";

  const resp = await fetch("https://publish-p130746-e1298459.adobeaemcloud.com/graphql/execute.json/securbank/AccountRatesList");
  if (resp.ok) {
    const respJson = await resp.json();
    const accountsJson = respJson.data.accountRatesList.items;

    // Clear main div
    main.innerHTML = "";

    accountsJson.forEach(function (account) {
      const accountDiv = document.createElement('div');
      const header = document.createElement('div');
      const rows = document.createElement('div');
      const headerRow = document.createElement('div');

      header.classList.add("header");
      rows.classList.add("rates");

      header.addEventListener('click', function() {
        this.parentNode.classList.add("open");
      });

      header.innerHTML = account.accountName;
      headerRow.innerHTML = '<span>Rate</span><span>Product</span>';
      accountDiv.append(header);
      accountDiv.append(rows);
      rows.append(headerRow);

      account.rates.forEach(function(rate) {
        const rateDiv = document.createElement('div');

        rateDiv.innerHTML = `<span>${rate.rate}</span><span>${rate.accountType}</span>`;
        rows.append(rateDiv);
      });

      main.append(accountDiv);
    });

    decorateMain(main);
    await loadSections(main);
  }

  return main;
}

export default async function decorate(block) {
  const fragment = await loadFragment();
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.rates').replaceWith(...fragment.childNodes);
    }
  }
}
