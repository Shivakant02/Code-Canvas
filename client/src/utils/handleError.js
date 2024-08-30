import toast from "react-hot-toast";

export const handleError = (error) => {
  console.log(error?.data?.message);
  toast.error(error?.data?.message);
};
