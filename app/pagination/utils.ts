

export function cacheFunction(fn: Function){
    let cache: Record<string, any> = {}

    return async (params: string) => {
        const cachedValue = cache[params];
        if (cachedValue) {
          if (cachedValue?.expiryTime < new Date().getTime()) {
            delete cache[params];
          } else {
            return cachedValue["data"];
          }
        }
        return fn(params).then((data: any) => {
            cache = {
                ...cache,
                [params]: { expiryTime: new Date().getTime() + 60000, data:  data},
              };
              return data
        })
    }
}

export async function fetchProducts(params: string) {
    const data = await fetch("https://dummyjson.com/products?" + params).then(
      (res) => res.json()
    );
    return data;
}

export const cachedFetchProducts = cacheFunction(fetchProducts)