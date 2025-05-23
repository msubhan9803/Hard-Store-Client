// Products
export interface Product {
    id?: number;
    _id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collections?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];
    skuArray?: any[];
    variantIndex?: any;
    starAvg?: any;
    totalReviews?: any;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
    imagesPreview: Array<string>;
    isAvailable: boolean;
    isThumbnailImageIndex: number;
    variantColor: string;
    variantIndex: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}