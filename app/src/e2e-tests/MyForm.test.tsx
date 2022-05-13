import "pptr-testing-library/extend";
import puppeteer from "puppeteer";

let browser: puppeteer.Browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    // slowMo: 30,
  });
});

afterAll(async () => {
  await browser.close();
});

test("test example.com", async () => {
  // Setup
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  const document = await page.getDocument();

  // User interacts with the page
  await (await document.getByLabelText("First Name")).click();
  await page.keyboard.type("Sofia");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Lamb");
  await (await document.getByText("Submit")).click();

  // Ensure that the correct greeting appears
  await document.getByText("Hello Sofia Lamb!");
});
