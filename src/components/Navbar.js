import { Dropdown } from "flowbite-react";
import { FiMenu } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-5 md:px-10 lg:px-20 xl:px-60 py-5 bg-white">
      <div className="flex items-center gap-x-2">
        <img src="/assets/logo.png" alt="icon" />
        <img src="/assets/name.png" alt="logo" />
      </div>

      <div className="hidden lg:flex gap-x-5 xl:gap-x-10">
        <div className="flex items-center gap-x-2">
          <img src="/assets/dashboard.png" alt="dashboard" />
          <p className="text-sm">Dashboard</p>
        </div>

        <div className="flex items-center gap-x-2">
          <img src="/assets/bookings.png" alt="bookings" />
          <p className="text-sm">Bookings</p>
        </div>

        <div className="flex items-center gap-x-2 p-2 rounded-xl bg-gray-200">
          <img src="/assets/customers.png" alt="customers" />
          <p className="text-sm">Customers</p>
        </div>

        <div className="flex items-center gap-x-2">
          <img src="/assets/services.png" alt="services" />
          <p className="text-sm">Services</p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-x-5 xl:gap-x-5">
        <div className="border-2 flex items-center justify-between py-2 px-5 rounded-lg cursor-pointer">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">Buukmenow Demo</p>
            <p className="text-gray-400 text-xs">buukmenow@gmail.com</p>
          </div>

          <RiArrowDropDownLine size={25} />
        </div>
      </div>

      {/* dropdown */}
      <div className="lg:hidden flex">
        <Dropdown arrowIcon={false} inline={true} label={<FiMenu size={30} />}>
          <Dropdown.Header>
            <div className="flex flex-col">
              <p className="font-semibold text-sm">Buukmenow Demo</p>
              <p className="text-gray-400 text-xs">buukmenow@gmail.com</p>
            </div>
          </Dropdown.Header>

          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Bookings</Dropdown.Item>
          <Dropdown.Item>Customers</Dropdown.Item>
          <Dropdown.Item>Services</Dropdown.Item>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
