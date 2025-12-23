import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { RegisterAndDeleteUserPage } from '../src/pages/registerAndDeleteUserPage';


test('Login out of the account', async ({page}) => {
    const login = new LoginPage(page);
    await login.login('joh5344n@ex234425ample.com', 'password123');

    await page.locator('.shop-menu .nav .fa-lock').click();

    await expect(page).toHaveURL('https://automationexercise.com/login');
    
})

test('Register with same Email', async ({page}) =>{

    const registerWithSameEmail = new RegisterAndDeleteUserPage(page);
    await registerWithSameEmail.navigateToSignupPage('joh5344n', 'joh5344n@ex234425ample.com');

    await expect(page.locator('.signup-form p')).toHaveText('Email Address already exist!');
})