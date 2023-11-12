import { toast } from "react-toastify";
export const notify = (message) =>{
    toast.dark(message, {
      position: "top-center",
      });
}
