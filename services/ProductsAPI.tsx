import axios from "axios";

export interface IFetchedData {
  [id: string]: IProduct;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const host = "https://fakestoreapi.com/";

export default class ProductsAPI {
  public static async getAllProducts<T>(): Promise<T | Error> {
    return await this.errorHandler(() => this.get("products"));
  }

  public static async errorHandler<T>(callback: any) {
    console.log("start handler");
    try {
      const res = await callback();
      return res as T;
    } catch (err) {
      return err as Error;
    }
  }

  public static async get<T>(endpoint: string): Promise<T | Error> {
    const targetURL = host + endpoint;
    console.log(targetURL);
    try {
      const data = await axios.get(targetURL).then((res) => res.data);
      return data;
    } catch (err) {
      return err as Error;
    }
  }

  public static async getMultipleProducts(ids: Array<string>) {
    const targetURL = "products/";
    const combinedURL = host + targetURL;

    try {
      const fetchedData = await axios.all(
        ids.map((id: string) =>
          axios.get(combinedURL + id).then((res) => res.data)
        )
      );
      let formattedData: IFetchedData = {};
      fetchedData.forEach((item) => {
        console.log("FETCHED DATA MAP");
        console.log(item);

        formattedData[item.id] = item;
      });

      console.log(formattedData);
      return formattedData;
    } catch (err) {
      return err;
    }
  }

  public static fetcher = (url: string) =>
    axios.get(url).then((res) => res.data);
}
// https://fakestoreapi.com/products/categories
