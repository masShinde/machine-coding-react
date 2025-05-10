import { useEffect, useState } from "react";
import type { PaginationPropTypes, ProductType } from "./PaginationPropTypes";
import Product from "./components/Product";
import "./styles.css";
import { cachedFetchProducts } from "./utils";
import { PaginationContainer } from "./components/PaginationContainer";

function Pagination(props: PaginationPropTypes) {
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    limit: 15,
    skip: 0,
  });

  const [numberOfPages, setNumberOfPages] = useState(0);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const params = `limit=${queryParams?.limit}&skip=${queryParams?.skip}`;

    cachedFetchProducts(params).then((data: any) => {
      setNumberOfPages(Math.ceil(data?.total / 15));
      setProducts(data?.products);
    });
  }, [selectedPage]);

  const onPageChangeHandler = (index: number) => {
    setQueryParams({
      ...queryParams,
      skip: index * queryParams?.limit,
    });
    setSelectedPage(index);
  };

  return (
    <>
      <div className="container">
        <div className="products-container">
          {products?.map((product) => {
            const { title, images, description, price } = product;
            return (
              <Product
                img={images?.[0] ?? ""}
                title={title}
                description={description}
                price={price}
              />
            );
          })}
        </div>
        <PaginationContainer
            totalPages={numberOfPages}
            selectedPage={selectedPage}
            onPageChangeHandler={onPageChangeHandler}
        />
      </div>
    </>
  );
}

export default Pagination;
