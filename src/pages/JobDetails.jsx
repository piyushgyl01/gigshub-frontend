import { useParams } from "react-router";
import useFetch from "../useFetch";

export default function JobDetails() {
  //USEPARAMS
  const { jobID } = useParams();

  //FETCH DATA WITH USE-FETCH
  const { data, loading, error, refetch } = useFetch(
    "https://gigshub-backend-nine.vercel.app/api/get-job"
  );

  //FINDING JOB
  const foundJob = data?.find((job) => job._id === jobID);
  return (
    <>
      <main className="container my-4">
        {/* LOADING STATES */}
        {loading && (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <p>Error occured while fetching the data...</p>}
        {/* JOB DETAILS DISPLAY */}
        { foundJob && (<>
        <h1>{foundJob?.jobTitle}</h1>
        <div className="col-md-12" key={foundJob?._id}>
          <div class="card mb-4 p-2">
            <div class="card-body">
              <p class="card-text">
                <strong>Company Name: </strong>
                {foundJob?.companyName}
              </p>
              <p class="card-text">
                <strong>Location: </strong>
                {foundJob?.location}
              </p>
              <p class="card-text">
                <strong>Job Type: </strong>
                {foundJob?.jobType}
              </p>
              <p class="card-text">
                <strong>Description: </strong>
                {foundJob?.jobDescription}
              </p>
              <p class="card-text">
                <strong>Qualifications:: </strong>
                {foundJob?.jobQualifications}
              </p>
            </div>
          </div>
        </div></>)}
      </main>
    </>
  );
}
