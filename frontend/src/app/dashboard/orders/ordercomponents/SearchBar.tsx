import { MdSearch } from "react-icons/md";

export default function SearchBar() {
    return (
      <div className="pb-[1rem] flex justify-between items-center">
        <div className="flex items-center space-x-2 border box-shadow w-full rounded-lg">
          <MdSearch className="text-[2rem] ml-3" />
          <input
            type="text"
            placeholder="Search your orders here"
            className="pr-4 py-4 rounded-md w-full outline-none text-md placeholder:font-semibold"
          />
        </div>
      </div>
    );
  }
  