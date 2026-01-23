import {
  productsTable,
  productCategoriesTable,
  productSpecificatonsTable,
  productReviewsTable,
  productImagesTable,
} from '@infra/database/drizzle/schemas';
import {
  DateProp,
  NumericId,
  Product,
  ProductCategory,
  ProductCategoryCategory,
  ProductDescription,
  ProductImage,
  ProductImageUrl,
  ProductName,
  ProductPrice,
  ProductReview,
  ProductReviewRate,
  ProductSpecification,
  ProductSpecificationInformation,
  ProductSpecificationLabel,
  Uuid,
} from '@src/app/entities';

export interface DrizzleProduct {
  product: typeof productsTable.$inferSelect;
  categories: (typeof productCategoriesTable.$inferSelect)[];
  specifications: (typeof productSpecificatonsTable.$inferSelect)[];
  reviews: (typeof productReviewsTable.$inferSelect)[];
  images: (typeof productImagesTable.$inferSelect)[];
}

export class DrizzleProductMapper {
  public static toEntity({
    product,
    images,
    categories,
    specifications,
    reviews,
  }: DrizzleProduct): Product {
    const {
      id,
      name,
      description,
      manufacturerId,
      price,
      createdAt,
      updatedAt,
    } = product;

    return Product.with({
      id: new NumericId(id),
      name: new ProductName(name),
      description: new ProductDescription(description),
      manufacturerId: new Uuid(manufacturerId),
      price: new ProductPrice(price),
      createdAt: new DateProp(createdAt),
      updatedAt: new DateProp(updatedAt),
      categories: categories.map((category) => {
        return ProductCategory.with({
          id: new NumericId(category.id),
          category: new ProductCategoryCategory(category.category),
          updatedAt: new DateProp(category.updatedAt),
          createdAt: new DateProp(category.createdAt),
        });
      }),
      images: images.map((image) => {
        return ProductImage.with({
          id: new NumericId(image.id),
          position: new NumericId(image.position),
          url: new ProductImageUrl(image.url),
          updatedAt: new DateProp(image.updatedAt),
          createdAt: new DateProp(image.createdAt),
        });
      }),
      reviews: reviews.map((review) => {
        return ProductReview.with({
          id: new NumericId(review.id),
          description: review.description,
          rate: new ProductReviewRate(review.rate),
          productId: new NumericId(review.productId),
          userId: new Uuid(review.userId),
          updatedAt: new DateProp(review.updatedAt),
          createdAt: new DateProp(review.createdAt),
        });
      }),
      specifications: specifications.map((specification) => {
        return ProductSpecification.with({
          id: new NumericId(specification.id),
          label: new ProductSpecificationLabel(specification.label),
          information: new ProductSpecificationInformation(
            specification.information,
          ),
          updatedAt: new DateProp(specification.updatedAt),
          createdAt: new DateProp(specification.createdAt),
        });
      }),
    });
  }

  public static toDrizzle(product: Product) {
    return {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        manufacturerId: product.manufacturerId,
        updatedAt: product.updatedAt,
        createdAt: product.createdAt,
      },
      categories: product.categories.map((category) => {
        return {
          productId: product.id,
          id: category.id,
          category: category.category,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      }),
      images: product.images.map((image) => {
        return {
          id: image.id,
          productId: product.id,
          position: image.position,
          url: image.url,
          updatedAt: image.updatedAt,
          createdAt: image.createdAt,
        };
      }),
      reviews: product.reviews.map((review) => {
        return {
          id: review.id,
          rate: review.rate,
          description: review.description,
          productId: review.product_id,
          userId: review.user_id,
          updatedAt: review.updatedAt,
          createdAt: review.createdAt,
        };
      }),
      specifications: product.specifications.map((specification) => {
        return {
          id: specification.id,
          label: specification.label,
          information: specification.information,
          productId: product.id,
          createdAt: specification.createdAt,
          updatedAt: specification.updatedAt,
        };
      }),
    };
  }
}
