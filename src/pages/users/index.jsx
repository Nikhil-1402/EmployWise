import React, { useState, useEffect } from "react";
import { Navbar, Pagination, UserCard } from "../../components";
import { fetchUsers } from "../../api/apiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsers(pageNumber);
        setUsers(response.data);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [pageNumber, refresh]);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.data.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <section className="users">
        <div className="inner-users max-w-[100rem] mx-auto px-[5%] py-8 min-h-[85vh] flex flex-col">
          <div className="header flex flex-col items-center justify-between mb-5">
            <h2 className="text-xl font-bold mb-3 text-left w-full uppercase">
              Users
            </h2>
            <div className="search-filter flex md:flex-row flex-col justify-between items-center w-full">
              <div className="field md:w-1/2 w-full md:mb-0 mb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="appearance-none rounded-md py-2.5 px-3 border-2 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:max-w-sm w-full"
                />
              </div>
              <div className="filter md:w-1/2 w-full flex justify-end">
                <select className="border-2 border-gray-300 p-2 rounded md:ml-2 md:max-w-xs w-full">
                  <option value="">All</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="cards grid xl:grid-cols-3 sm:grid-cols-2 gap-5 mb-10">
            {searchQuery !== "" ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div className="" key={user.id}>
                    <UserCard user={user} onRefresh={handleRefresh} />
                  </div>
                ))
              ) : (
                <div className=" h-full w-full flex justify-center items-center">
                  <p className="text-2xl w-full font-semibold text-gray-500/80">
                    Sorry no data available
                  </p>
                </div>
              )
            ) : (
              users?.data?.map((user) => (
                <div className="" key={user.id}>
                  <UserCard user={user} onRefresh={handleRefresh} />
                </div>
              ))
            )}
          </div>
          <Pagination totalPages={2} onPageChange={handlePageChange} />
        </div>
      </section>
    </>
  );
};

export { Users };
