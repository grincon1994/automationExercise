import {expect, Page} from "@playwright/test";

export class ProductsPage {

    readonly page: Page;

    constructor(page:Page) {
        this.page = page
    }


    async navigateToProductsPage() {
        await this.page.locator('.navbar-nav .card_travel').click();
    }



}