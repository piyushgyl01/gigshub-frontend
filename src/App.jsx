import { useState } from "react";
import { Link } from "react-router";
import useFetch from "./useFetch";

export default function App() {
  //STATES
  const [searchFilter, setSearchFilter] = useState("");
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });

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
        setMessage({
          show: true,
          message: "Job Deleted.",
          type: "success",
        });
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 3000);
      }
    } catch (error) {
      console.log("ERROR OCCURRED WHILE DELETING THE JOB", error);
      setMessage({
        show: true,
        message: "Unable to delete the job.",
        type: "warning",
      });
      setTimeout(() => {
        setMessage({ ...message, show: false });
      }, 3000);
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
        {message.show && (
          <div className="row">
            <div className="col-md-12">
              <p
                className={
                  message.type === "warning"
                    ? "bg-danger-subtle p-3 rounded"
                    : "bg-success-subtle p-3 rounded"
                }
              >
                {message.message}
              </p>
            </div>
          </div>
        )}

        {/* DISPLAYING JOBS */}
        {filteredData?.length > 0 ? (
          <>
            <h1>All Jobs</h1>
            <div className="row">
              {filteredData?.map((job) => (
                <div className="col-md-4" key={job._id}>
                  <div class="card mb-4 p-2">
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
                      <div className="row mb-2">
                        <Link
                          to={`/${job.jobTitle}/${job._id}`}
                          class="card-link btn btn-primary px-4"
                        >
                          See Details
                        </Link>
                      </div>
                      <div className="row">
                        <button
                          class="card-link btn btn-danger px-4"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No Jobs Found</p>
        )}
      </main>
    </>
  );
}
