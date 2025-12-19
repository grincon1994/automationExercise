import {expect, Page} from '@playwright/test';

export class RegisterAndDeleteUserPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToSignupPage(name:string, email:string) {

        //Navigate to signup page

        await this.page.goto('https://automationexercise.com/login');

        const signupForm = this.page.locator('.signup-form');

        await signupForm.getByPlaceholder('name').fill(name);
        await signupForm.getByPlaceholder('Email Address').fill(email);
        await signupForm.getByRole('button', {name: 'Signup'}).click();

        await this.page.waitForURL('**/signup');

        await expect(this.page.getByText('Enter Account Information')).toBeVisible();

    }


    async fillAccountInformation(password:string, dateOfBirth: {day:string, month:string, year:string}, firstName:string, lastName:string, company:string, address1:string, address2:string, country:string, state:string, city:string, zipcode:string, mobileNumber:string) {

        //fill new user form

        const newUserForm = this.page.locator('.login-form');

        await newUserForm.locator('.radio #id_gender1').check();

        await newUserForm.locator('#password').fill(password);

        await newUserForm.locator('#days').selectOption(dateOfBirth.day);
        await newUserForm.locator('#months').selectOption(dateOfBirth.month);
        await newUserForm.locator('#years').selectOption(dateOfBirth.year);
        
        await newUserForm.getByRole('checkbox', {name: 'Sign up for our newsletter!'}).check();
        await newUserForm.getByRole('checkbox', {name: 'Receive special offers from our partners!'}).check();

        await newUserForm.locator('#first_name').fill(firstName);
        await newUserForm.locator('#last_name').fill(lastName);
        await newUserForm.locator('#company').fill(company);
        await newUserForm.locator('#address1').fill(address1);
        await newUserForm.locator('#address2').fill(address2);
        await newUserForm.locator('#country').selectOption(country);
        await newUserForm.locator('#state').fill(state);
        await newUserForm.locator('#city').fill(city);
        await newUserForm.locator('#zipcode').fill(zipcode);
        await newUserForm.locator('#mobile_number').fill(mobileNumber);

        await newUserForm.getByRole('button', {name: 'Create Account'}).click();
    }

    async deleteAccount() {
        
        await this.page.locator('.shop-menu .nav .fa-trash-o').click();

        await expect(this.page.getByText('Account Deleted!')).toBeVisible();

        await this.page.locator('.pull-right .btn-primary').click();
    }
}

