/**
 * Test if the page has a canonical link defined
 */
import { Page } from "puppeteer";

interface Parameters {
  page: Page;
  logSuccess: Function;
  logFailure: Function;
}

export default function ({page, logSuccess, logFailure}: Parameters): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const canonical = await page.$("link[rel=\"canonical\"]");
      if (canonical === null || canonical === undefined) {
        logFailure("no canonical link present");
        resolve(false);
      } else {
        logSuccess("canonical link present");
        resolve(true);
      }
    } catch (error) {
      console.log(error);
      reject("error occured while checking for canonical link");
    }
  });
}