import CodeItem from "../components/CodeItem";
import { useGetAllCodesQuery } from "../redux/slices/authApi";

function AllCodes() {
  const { data: allCodes } = useGetAllCodesQuery();
  console.log(allCodes);
  return allCodes && allCodes.length !== 0 ? (
    <div className=" p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
      {" "}
      {allCodes.allCodes.map((item) => (
        <CodeItem disable="true" key={item._id} data={item} />
      ))}{" "}
    </div>
  ) : (
    <>
      {
        <p className=" flex items-center justify-center h-[calc(100vh-60px)] text-gray-400 font-bold">
          You do not have any saved code{" "}
        </p>
      }
    </>
  );
}

export default AllCodes;
