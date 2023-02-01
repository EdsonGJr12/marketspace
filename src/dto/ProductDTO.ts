export type ProductDTO = {
    id: string;
    name: string;
    description: string;
    price: number;
    is_active: boolean;
    is_new: boolean;
    product_images: {
        path: string;
        id: string;
    }[];
    user: {
        avatar: string;
    }
}