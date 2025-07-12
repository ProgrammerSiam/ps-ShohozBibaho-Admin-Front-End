import toast from "react-hot-toast";
import Swal from "sweetalert2";

const handleDelete = async ({
  id,
  deleteAction,
  fetchAction,
  dispatch,
  currentPage,
  query,
}) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete it!",
    color: "black",
    background: "white",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await dispatch(deleteAction(id));

        if (response?.payload?.success) {
          await dispatch(fetchAction({ currentPage, ...query }));
          toast.success(response.payload.message);
        } else {
          toast.error(
            response.payload?.response?.data?.message ||
              "Failed! Please try again",
          );
        }
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred!");
      }
    }
  });
};

export default handleDelete;
