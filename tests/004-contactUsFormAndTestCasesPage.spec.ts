import {test, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/loginPage';
import {ContactUsForm} from '../src/pages/contactUsFormPage';


test.skip('Contact Us form', async ({page}) => {
    
    const gotoHomePage = new LoginPage(page);

    const contactUsForm = new ContactUsForm(page);

    await gotoHomePage.goto();

    await expect(page.locator('#slider-carousel')).toBeVisible();

    await page.locator('.navbar-nav .fa-envelope').click();

    await contactUsForm.contactUsForm('erpapi', 'test123@gmail.com', 'playwright practice', 'hablame papi todo bien mira eres gei jajajjaaja');

    await expect(page.locator('.contact-form h2')).toContainText('Get In Touch');

    await contactUsForm.uploadFile();

    try {
        page.on('dialog', async dialog => {
        await dialog.accept('Press OK to proceed!'); // or dialog.dismiss()
        });
    }

    catch (e) {
        console.log(`No dialog appeared: ${e}`);
    }
    
    await page.locator('.contact-form').getByRole('button', {name: 'Submit'}).click();

    await expect(page.locator('.contact-form')).toContainText('Success! Your details have been submitted successfully.');

    await page.locator('.navbar-nav .fa-home').click();

    await expect(page.locator('#slider-carousel')).toBeVisible();

});

test('Test Cases page', async ({page}) => {
    const gotoHomePage = new LoginPage(page);

    await gotoHomePage.goto();

    await expect(page.locator('#slider-carousel')).toBeVisible();

    await page.locator('.navbar-nav a', {hasText: 'Test Cases'}).click();

    await expect(page.locator('#form')).toBeVisible();

    await expect(page.locator('#form h2')).toHaveText('Test Cases');
})