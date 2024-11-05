import { MdCheckCircle } from "react-icons/md";

function FormSuccess({ message }: { message?: string }) {
  return (
    message && (
      <div className="flex gap-4 items-center px-4 py-4 w-full bg-green-200 rounded-lg text-green-600">
        <MdCheckCircle color="green" />
        <span className="text-sm font-light">{message}</span>
      </div>
    )
  );
}

export default FormSuccess;
