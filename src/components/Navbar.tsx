import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";

const Navbar = () => {
  const user = null;
  return (
    <header className="h-16 sticky z-50 top-0 inset-x-0 bg-whit">
      <MaxWidthWrapper>
        <div className="border-b border-gray-200 ">
          <div className="flex h-16 items-center">
            {/* todo: mobile nav */}

            <div className="ml-4 flex lg:ml-0 ">
              <Link href="/">
                <Icons.logo className="h-10 w-10" />
              </Link>
            </div>

            {/* nav items */}
            <div className="hidden lg:block lg:ml-8 w-full">
              <NavItems />
            </div>

            {/* right side stuff */}
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {user ? (
                  <>
                    <div className="h-8 w-24 bg-red-200"></div>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>

                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  </>
                )}

                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
