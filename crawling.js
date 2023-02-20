const puppeteer = require("puppeteer");

async function getData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://datalab.labangba.com/recruit");
  // 로그인 페이지로 이동
  await page.goto(
    "https://datalab.labangba.com/user/sign_in?redirect=%2Frecruit"
  );
  // 로그인 폼 입력
  await page.evaluate(() => {
    // 아이디 입력 요소 선택
    const usernameInput = document.querySelector(
      '.sign_in_form__ZaLrU input[type="text"]'
    );

    // 패스워드 입력 요소 선택
    const passwordInput = document.querySelector(
      '.sign_in_form__ZaLrU input[type="password"]'
    );

    // 선택된 입력 요소에 값을 입력
    usernameInput.value = "kei781@naver.com";
    passwordInput.value = "1q2w3e4r!!+";
    // 로그인 폼 제출
    const button = document.querySelector(
      ".ButtonForm_default___C1Dg.ButtonForm_first__lTZeg"
    );
    button.click();
    console.log("클릭까진완료");
  });
  // 로그인 후에 인증된 사용자만 접근 가능한 페이지로 이동
  await page.goto("https://datalab.labangba.com/recruit");
  const data = await page.evaluate(() => {
    const tableBody = document.querySelector("tbody");
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

  return data;
}

getData().then((data) => console.log(data));
