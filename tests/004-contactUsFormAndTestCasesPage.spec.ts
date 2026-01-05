import {test, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/loginPage';
import {ContactUsForm} from '../src/pages/contactUsFormPage';


test('Contact Us form', async ({page}) => {
    
    const gotoHomePage = new LoginPage(page);

    const contactUsForm = new ContactUsForm(page);

    await gotoHomePage.goto();

    await expect(page.locator('#slider-carousel')).toBeVisible();

    await page.locator('.navbar-nav .fa-envelope').click();

    await contactUsForm.contactUsForm();

    await expect(page.locator('.contact-form h2')).toContainText('Get In Touch');

});