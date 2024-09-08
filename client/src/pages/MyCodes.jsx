import CodeItem from "../components/CodeItem";
import { useGetMyCodesQuery } from "../redux/slices/authApi";

function MyCodes() {
  const { data: myCodes } = useGetMyCodesQuery();
  console.log(myCodes);
  return myCodes && myCodes.length !== 0 ? (
    <div className=" p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
      {" "}
      {myCodes.map((item, idx) => (
        <CodeItem key={idx} data={item} />
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

export default MyCodes;
