import Image from "next/image";
import Link from "next/link";

// HACK:
function Footer() {
  return (
    <footer className="mx-auto flex flex-col w-full max-w-6xl rounded-lg bg-gray-50 px-4 py-8 shadow-md mt-8">

      <div className="flex justify-center flex-col items-center gap-2 mb-8">
        <Image src={"/favicon.ico"} alt="logo" width={48} height={48} />
        <p className="text-xl font-semibold">DigitalHippo</p>
        <p className="text-sm text-gray-500">© 2024 All right reserved</p>
      </div>

      <div className="flex justify-between w-full">
      <div className="">
        <p className="text-xl font-semibold">REGD. OFFICE ADDRESS</p>
        <address>
          <ul>
            <li>Casecobra Software</li>
            <li>INDIA</li>
          </ul>
        </address>
        <p className="flex items-center">© 2024 All right reserved</p>
      </div>

      <div className="flex gap-16">
        <div className="flex flex-col gap-1">
          <p className="mb-2 text-lg font-medium">Legal</p>

          <Link href={"/legal/terms-of-service"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Terms of service
            </p>
          </Link>
          <Link href={"/legal/cancellation-and-refund"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Cancellation And Refund
            </p>
          </Link>
          <Link href={"/legal/privacy-policy"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Privacy Policy
            </p>
          </Link>
          <Link href={"/legal/cookies-policy"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Cookies Policy
            </p>
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="mb-2 text-lg font-medium">Links</p>
          <Link href={"/become-seller"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Become Seller
            </p>
          </Link>
          <Link href={"/legal/shipment-and-delivery"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Shipment And Delivery
            </p>
          </Link>
          <Link href={"/legal/contact-us"}>
            <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
              Contact Us
            </p>
          </Link>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
