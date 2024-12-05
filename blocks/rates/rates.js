export default async function decorate(block) {
  const props = [...block.children];

  const main = document.createElement('div');
  main.innerHTML = "Loading Rates";

  const resp = await fetch("https://publish-p130746-e1298459.adobeaemcloud.com/graphql/execute.json/securbank/AccountRatesList");
  if (!resp.ok) {
    return;
  }

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
      this.parentNode.classList.toggle("open");
    });

    header.innerHTML = account.accountName;
    headerRow.innerHTML = '<span class="rate">Rate</span><span class="product">Product</span>';
    accountDiv.append(header);
    accountDiv.append(rows);
    rows.append(headerRow);

    account.rates.forEach(function(rate) {
      const rateDiv = document.createElement('div');

      rateDiv.innerHTML = `<span class="rate">${rate.rate}</span><span class="product">${rate.accountType}</span>`;
      rows.append(rateDiv);
    });

    main.append(accountDiv);
  });

  block.append(main);
}
