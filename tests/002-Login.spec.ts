import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';

test('login with correct credentials', async({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.login('joh5344n@ex234425ample.com', 'password123');
    
    await expect(page.locator('.shop-menu .nav .fa-user')).toBeVisible();
    
})

test('login with incorrect credentials', async ({page}) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.login('joh52425@ample.com', 'password2123');

    await expect(page.locator('.login-form').getByText('Your email or password is incorrect!')).toBeVisible();


})