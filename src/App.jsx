import { useState } from "react";
import { Link } from "react-router";
import useFetch from "./useFetch";

export default function App() {
  //STATES
  const [searchFilter, setSearchFilter] = useState("");

  //FETCH DATA WITH USE-FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://gigshub-backend-nine.vercel.app/api/get-job"
  );

  //SEARCH FILTER FUNCTION
  const filteredData =
    searchFilter === ""
      ? data
      : data?.filter((job) =>
          job.jobTitle.toLowerCase().includes(searchFilter.toLowerCase())
        );

  //HANDLE DELETE FUCNTION
  const handleDelete = async (id) => {
    try {
      const reponse = await fetch(
        `https://gigshub-backend-nine.vercel.app/api/delete-job/${id}`,
        {
          method: "DELETE",
        }
      );

      if (reponse.ok) {
        await refetch();
      }
    } catch (error) {
      console.log("ERROR OCCURRED WHILE DELETING THE JOB", error);
    }
  };

  return (
    <>
      <main className="container my-3">
        {/* SEARCH FILTER */}
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              id="searchInput"
              placeholder="Search by job title..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="form-control my-4"
            />
          </div>
          <div className="col-md-6"></div>
        </div>

        {/* LOADING STATES */}
        {loading && (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <p>Error occured while fetching the data...</p>}

        {/* DISPLAYING JOBS */}
        {filteredData?.length > 0 ? (
          <>
            <h1>All Jobs</h1>
            <div className="row">
              {filteredData?.map((job) => (
                <div className="col-md-4" key={job._id}>
                  <div class="card mb-4">
                    <div class="card-body">
                      <h3 class="card-title">{job.jobTitle}</h3>
                      <p class="card-text">
                        <strong>Company Name: </strong>
                        {job.companyName}
                      </p>
                      <p class="card-text">
                        <strong>Location: </strong>
                        {job.location}
                      </p>
                      <p class="card-text">
                        <strong>Job Type: </strong>
                        {job.jobType}
                      </p>
                      <Link
                        to={`/${job.jobTitle}/${job._id}`}
                        class="card-link btn btn-primary px-5"
                      >
                        See Details
                      </Link>
                      <button
                        class="card-link btn btn-danger px-5"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No Results Found</p>
        )}
      </main>
    </>
  );
}
