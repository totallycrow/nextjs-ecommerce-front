import { CartControls } from "./CartControls";
import Link from "next/link";
import Image from "next/image";

// export const ProductTile = ({ item }: IProduct) => {
export const ProductTile = ({ item }: any) => {
  return (
    <div>
      <Link href={"/products/" + item.id}>
        <Image src={item.image} alt="test" width={100} height={100}></Image>
      </Link>
      <CartControls item={item} />
    </div>
  );
};
