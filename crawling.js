const puppeteer = require("puppeteer");

async function getData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://datalab.labangba.com/recruit");

  // 로그인 페이지로 이동
  await page.goto(
    "https://datalab.labangba.com/user/sign_in?redirect=%2Frecruit"
  );
  await page.waitForSelector('.sign_in_form__ZaLrU input[type="text"]');
  await page.waitForSelector('.sign_in_form__ZaLrU input[type="password"]');
  await page.waitForSelector(
    ".ButtonForm_default___C1Dg.ButtonForm_first__lTZeg"
  );

  await page.type(
    '.sign_in_form__ZaLrU input[type="text"]',
    "kei781@naver.com"
  );
  await page.type('.sign_in_form__ZaLrU input[type="password"]', "1q2w3e4r!!+");
  await page.click(".ButtonForm_default___C1Dg.ButtonForm_first__lTZeg");

  // 로그인 후에 인증된 사용자만 접근 가능한 페이지로 이동
  await page.waitForNavigation();
  await page.waitForSelector(".Table_table___jpMW tbody");
  const data = await page.evaluate(() => {
    const tableBody = document.querySelector(".Table_table___jpMW tbody");
    const rows = tableBody.querySelectorAll("tr");

    return Array.from(rows, (row) => {
      const index = row.querySelector("td:nth-child(1)");
      const title = row.querySelector("td:nth-child(2) > a > span:first-child");
      const site = row.querySelector("td:nth-child(2) > a > span:last-child");
      const category = row.querySelector("td:nth-child(3)");
      const date = row.querySelector(
        "td:nth-child(4) > div > span:first-child"
      );
      const hour = row.querySelector("td:nth-child(4) > div > span:last-child");
      const views = row.querySelector("td:nth-child(5) > span ");
      const sold = row.querySelector("td:nth-child(6) > span ");
      const revenue = row.querySelector("td:nth-child(7) > span ");
      const products = row.querySelector("td:nth-child(8)");

      const viewsMatch = views?.textContent?.match(/(\d+(?:[.]\d+)?)(만)?/);
      const soldMatch = sold?.textContent?.match(/(\d+(?:[.]\d+)?)(만)?/);
      const revenueMatch = revenue?.textContent?.match(/(\d+(?:[.]\d+)?)(억)?/);
      return {
        index: Number(index?.textContent),
        title: title?.textContent,
        site: site?.textContent,
        link: title?.parentNode?.href,
        category: category?.textContent,
        time: { date: date?.textContent, hour: hour?.textContent },
        views: viewsMatch ? Number(viewsMatch[1] * 10000) : null,
        sold: soldMatch ? Number(soldMatch[1] * 10000) : null,
        revenue: revenueMatch
          ? Number(parseInt(revenueMatch[1] * 100000000))
          : null,
        products: Number(products?.textContent?.replace(/,/g, "")),
      };
    });
  });
  await browser.close();
  console.log(data);
  return data;
}

module.exports = {
  getData,
};
getData().then((data) => console.log(data));
