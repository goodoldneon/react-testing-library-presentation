import "pptr-testing-library/extend";
import puppeteer from "puppeteer";

let browser: puppeteer.Browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 30,
  });
});

afterAll(async () => {
  await browser.close();
});

test("form submission", async () => {
  // Setup
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  const document = await page.getDocument();

  // User interacts with the page
  const firstNameInput = await document.getByLabelText("First Name");
  await firstNameInput.click();
  await page.keyboard.type("Gordon");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Freeman");
  const submitButton = await document.getByText("Submit");
  await submitButton.click();

  // Ensure that the correct greeting appears
  await document.getByText("Hello Gordon Freeman!");
});
