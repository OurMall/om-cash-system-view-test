export class Product {
    public Name:string;
    public Price:number;
    public Quantity:number;

    constructor(name:string, price:number, quantity:number){
        this.Name = name;
        this.Price = price;
        this.Quantity = quantity;
    }
}