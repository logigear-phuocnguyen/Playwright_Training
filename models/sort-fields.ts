export class SortFields{
    private fields: string[];

    constructor(fields: string[]){
        this.fields = fields;
    }

    public getFields(): string[]{
        return this.fields;
    }

    public setFields(fields: string[]){
        this.fields = fields;1
    }
}