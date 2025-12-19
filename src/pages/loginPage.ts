import {expect, Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async login(username: string, password: string){

        await this.page.goto('https://automationexercise.com/login');

        const loginForm =this.page.locator('.login-form');

        await expect(loginForm).toHaveText('Login to your account');

        await loginForm.getByPlaceholder('Email Address').fill(username);
        await loginForm.getByPlaceholder('Password').fill(password);
        await loginForm.getByRole('button', {name: 'Login'}).click();

    }
}