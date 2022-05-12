import puppeteer from "puppeteer";
import "pptr-testing-library/extend";

let browser: puppeteer.Browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
  });
});

afterAll(async () => {
  await browser.close();
});

test("test example.com", async () => {
  // Setup
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const document = await page.getDocument();

  // Ensure text appears
  await document.getByText(
    /This domain is for use in illustrative examples in documents/
  );
});
