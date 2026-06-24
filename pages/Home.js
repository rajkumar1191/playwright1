export class Home{
    constructor(page){
        this.page = page;

        this.welcomeHeader = page.locator('#welcome-message');
        this.profileCard = page.locator('.profile-card');

        this.logoutButton = page.getByRole('button',{name: 'Logout'})

        this.settingsTab = page.locator('#settings-nav-item');


        this.statusAlert = page.locator('.status-banner');
    }


    async navigateTo(localFilePath){
        await this.page.goto(`file://${localFilePath}`)
    }

    async executeLogout(){
        await this.logoutButton.click();

        await this.page.waitForLoadState('networkidle');
    }
}