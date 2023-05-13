export interface IProduct{
    id: string;
    name: string;
    description: string;
    images:string;
    price:string;
    category: 'Еда' | 'Напитки' | 'Алкоголь';
}