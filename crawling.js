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
    const result = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowData = [];
      cells.forEach((cell) => {
        rowData.push(cell.textContent);
      });
      result.push(rowData);
    });
    return result;
  });
  await browser.close();
  console.log(data);
  return data;
}
module.exports = {
  getData,
};
getData().then((data) => console.log(data));
