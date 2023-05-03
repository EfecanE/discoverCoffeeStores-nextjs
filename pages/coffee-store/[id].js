import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStoreDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Id: {id}</div>
      <Link href="/">Back to Homepage</Link>
    </>
  );
};

export default CoffeeStoreDetail;
