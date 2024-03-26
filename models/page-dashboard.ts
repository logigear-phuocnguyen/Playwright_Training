export class PageDashboard {
    private pageName: string;
    private parentPage: string;
    private numberOfColumns: string;
    private displayAfter: string;
    private isPublished: boolean;

    constructor(pageName: string, parentPage?: string, numberOfColumns?: string, displayAfter?: string, isPublished?: boolean) {
       this.pageName = pageName;
       if (parentPage !== undefined || parentPage != null) {
        this.parentPage = parentPage;
        }
       if (numberOfColumns !== undefined || numberOfColumns != null) {
        this.numberOfColumns = numberOfColumns;
       }
       if (displayAfter !== undefined || displayAfter != null) {
        this.displayAfter = displayAfter;
        }
       if (isPublished !== undefined || isPublished != null) {
            this.isPublished = isPublished;
        }
    }

    public getPageName(): string {
        return this.pageName;
    }

    public getParentPage(): string {
        return this.parentPage;
    }

    public getNumberOfColumns(): string {
        return this.numberOfColumns;
    }

    public getDisplayAfter(): string {
        return this.displayAfter;
    }

    public getIsPublished(): boolean {
        return this.isPublished;
    }

    public setPageName(pageName: string): void {
        this.pageName = pageName;
    }

    public setParentPage(parentPage: string): void {
        this.parentPage = parentPage;
    }

    public setNumberOfColumns(numberOfColumns: string): void {
        this.numberOfColumns = numberOfColumns;
    }

    public setDisplayAfter(displayAfter: string): void {
        this.displayAfter = displayAfter;
    }

    public setIsPublished(isPublished: boolean): void {
        this.isPublished = isPublished;
    }



}