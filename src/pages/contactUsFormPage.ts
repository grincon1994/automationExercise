import {expect, Page} from "@playwright/test";

export class ContactUsForm {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async contactUsForm(name:string, email:string, subject:string, message:string){

        const contactUsForm = this.page.locator('.contact-form');

        await contactUsForm.getByPlaceholder('Name').fill(name);
        await contactUsForm.getByPlaceholder('Email').fill(email);

        await contactUsForm.getByPlaceholder('Subject').fill(subject);

        await contactUsForm.getByPlaceholder('Your Message Here').fill(message);
    }

    async uploadFile(){

        const contactUsForm = this.page.locator('.contact-form');

        await contactUsForm.locator('input[type=file]').setInputFiles('C:\\Users\\rincog3\\Downloads\\Resume202512190924.pdf');

    }
}