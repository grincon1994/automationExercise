import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { ProductsPage } from '../src/pages/productsPage';

test('Verify all products', async ({page}) => {

    const goToHomePage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await goToHomePage.goto();

    await productsPage.navigateToProductsPage();

    await expect(page.locator('#sale_image')).toBeVisible();

    page.once('dialog', dialog => dialog.dismiss());

    await expect(page.locator('.features_items')).toBeVisible();

    await page.locator('.product-image-wrapper .fa-plus-square').first().click();

    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');

    await expect(page.locator('.product-information')).toBeVisible();

})

test('Search Products', async ({page}) => {

    const goToHomePage = new LoginPage(page);

    const productsPage = new ProductsPage(page);

    await goToHomePage.goto();

    await productsPage.navigateToProductsPage();

    await page.locator('#advertisement #search_product').fill('Winter Top');

    await page.locator('#advertisement #submit_search').click();

    

})