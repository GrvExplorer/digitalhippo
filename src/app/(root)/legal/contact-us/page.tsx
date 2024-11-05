import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="pt-10 text-4xl">Contact Us</h1>

      <p className="flex items-end text-2xl">
        contact us if some things wrong happened
      </p>

      <p className="mt-10">Last Updated on Jul 4 2024</p>

      <h2 className="mt-6 text-xl">Business Address:</h2>
      <address>
        <ul>
          <li>Casecobra Software,</li>
          <li>Pandri, Raipur, 492004, CHATTISGARH, INDIA</li>
        </ul>
      </address>

      <p className="mt-2">
        <Link
          href={"mailto:grvexplorer@outlook.com"}
          className="hover:text-blue-800"
        >
          E-mail: grvexplorer@outlook.com
        </Link>
      </p>

      <div className="mt-20 w-fit">
        <p className="mb-10 text-4xl">Product / Service Pricing</p>
        <div className="flex w-80 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <p className="">Base Price</p>
            <p className="text-green-400">+₹140</p>
          </div>

          <div className="flex w-full justify-between">
            <p className="">Soft Polycarbonate</p>
            <p className="text-green-400">+₹30</p>
          </div>

          <div className="flex w-full justify-between">
            <p className="">Textured Finish</p>
            <p className="text-green-400">+₹50</p>
          </div>

          <div className="-mb-1 mt-1 w-full border bg-gray-400"></div>

          <div className="flex w-full justify-between">
            <p className="">Total Price</p>
            <p className="text-green-400">+₹220</p>
          </div>
        </div>
      </div>
    </div>
  );
}
