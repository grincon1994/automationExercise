import {test, expect} from '@playwright/test';
import { RegisterAndDeleteUserPage } from '../src/pages/registerAndDeleteUserPage';

test('Register new User test', async ({page}) => {

    const registerAndDeleteUserPage = new RegisterAndDeleteUserPage(page);

    await registerAndDeleteUserPage.navigateToSignupPage('jo235rqew234h532n', 'joh53434n@ex234425ample.com');

    await registerAndDeleteUserPage.fillAccountInformation(
        'password123',
        {day: '1', month: '1', year: '2000'},
        'Jo2354hn',
        'Dogsdfe',
        'compsdfgany',
        'addsdfgess1',
        'addsdsdgess2',
        'Canada',
        'statefg',
        'city',
        '12345',
        '1234567890'
    );
    
    await expect(page.getByText('Account Created!')).toBeVisible();

    await page.waitForTimeout(500);

    await page.locator('.pull-right .btn-primary').click();

    await expect(page.locator('.shop-menu .nav .fa-user')).toBeVisible();

    registerAndDeleteUserPage.deleteAccount();

    await expect(page.getByText('Account Deleted!')).toBeVisible();
})