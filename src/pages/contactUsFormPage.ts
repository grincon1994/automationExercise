import {expect, Page} from "@playwright/test";

export class ContactUsForm {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async contactUsForm(){

        const contactUsForm = this.page.locator('.contact-form');

        await contactUsForm.getByPlaceholder('Name').fill('erpapi');

        await contactUsForm.getByPlaceholder('Email').fill('rodriguez');

        await contactUsForm.getByPlaceholder('Subject').fill('playwright practice');

        await contactUsForm.getByPlaceholder('Your Message Here').fill('hablame papi todo bien mira eres gei jajajajaj');
    }

    async uploadFile(){

    }
}