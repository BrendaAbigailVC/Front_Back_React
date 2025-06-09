export interface Product {
    id: number
    name: string
    price: number
    category: string
}

export const products: Product[] = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics" },
    { id: 2, name: "Mouse", price: 20, category: "Accessories" },
    { id: 3, name: "Keyboard", price: 45, category: "Accessories" },
    { id: 4, name: "Monitor", price: 200, category: "Electronics" },
    { id: 5, name: "Chair", price: 150, category: "Furniture" },
]
