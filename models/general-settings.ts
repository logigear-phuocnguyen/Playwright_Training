export class GeneralSetting {
    private name: string;
    private itemType: string;
    private relatedData: string;
    private isDistinct: boolean;

    constructor(name: string, itemType: string, relatedData: string, isDistinct?: boolean){
        this.name = name;
        this.itemType = itemType;
        this.relatedData = relatedData;
        if(isDistinct != undefined || isDistinct != null) this.isDistinct = isDistinct;
    }

    public getName(): string {
        return this.name;
    }

    public getItemType(): string{
        return this.itemType;
    }

    public getRelatedData(): string{
        return this.relatedData;
    }

    public getIsDistinct(): boolean{
        return this.isDistinct;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setItemType(itemType: string): void {
        this.itemType = itemType;
    }

    public setRelatedData(relatedData: string): void {
        this.relatedData = relatedData;
    }

    public setIsDistinct(isDistinct: boolean): void {
        this.isDistinct = isDistinct;
    }
}
