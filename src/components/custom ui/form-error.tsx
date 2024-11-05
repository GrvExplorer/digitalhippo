import { MdWarning } from "react-icons/md";

function FormError({ message }: { message?: string }) {
  return (
    message && (
      <div className="flex items-center gap-4 px-4 py-4 w-full bg-red-200 rounded-lg text-red-800">
        <MdWarning />
        <span className="text-sm font-light">{message}</span>
      </div>
    )
  );
}

export default FormError;
