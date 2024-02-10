import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <header className="h-16 sticky z-50 top-0 inset-x-0 bg-white">
      <MaxWidthWrapper>
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            {/* todo: mobile nav */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Icons.logo className="h-10 w-10" />
              </Link>
            </div>

            {/* nav items */}
            <div className="hidden lg:block lg:ml-8 lg:self-stretch">
              <NavItems />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
