import { useState } from "react";
import { useNavigate } from "react-router";

export default function PostJob() {
  //STATES
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: 0,
    jobType: "",
    jobDescription: "",
    jobQualifications: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });

  //HANDLE POST CALL
  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gigshub-backend-nine.vercel.app/api/post-job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            salary: Number(formData.salary),
          }),
        }
      );

      if (response.ok) {
        setMessage({
          show: true,
          message: "Job Added.",
          type: "success",
        });
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: 0,
          jobType: "",
          jobDescription: "",
          jobQualifications: "",
        });
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 3000);
        // navigate("/")
      }
    } catch (error) {
      console.log("UNABLE TO POST THE DATA", error);
      setMessage({
        show: true,
        message: "Unable to add the job.",
        type: "warning",
      });
      setTimeout(() => {
        setMessage({ ...message, show: false });
      }, 3000);
    }
  };

  return (
    <>
      <main className="container my-4">
        <h1>Post a Job</h1>
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
        <form onSubmit={handlePost}>
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle"
              className="form-control"
              required
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              className="form-control"
              required
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="form-control"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <input
              type="number"
              id="salary"
              className="form-control"
              required
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobType" className="form-label">
              Job Type:
            </label>
            <select
              id="jobType"
              className="form-select"
              required
              value={formData.jobType}
              onChange={(e) =>
                setFormData({ ...formData, jobType: e.target.value })
              }
            >
              <option value="">Select Job Type</option>
              <option value="Full-time (On-site)">Full-time (On-site)</option>
              <option value="Part-time (On-site)">Part-time (On-site)</option>
              <option value="Full-time (Remote)">Full-time (Remote)</option>
              <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="jobDes" className="form-label">
              Job Description:
            </label>
            <textarea
              id="jobDes"
              cols="30"
              rows="4"
              className="form-control"
              required
              value={formData.jobDescription}
              onChange={(e) =>
                setFormData({ ...formData, jobDescription: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="jobQualifications" className="form-label">
              Job Qualifications:
            </label>
            <textarea
              id="jobQualifications"
              cols="30"
              rows="4"
              className="form-control"
              required
              value={formData.jobQualifications}
              onChange={(e) =>
                setFormData({ ...formData, jobQualifications: e.target.value })
              }
            ></textarea>
          </div>
          <button className="btn btn-primary px-3" type="submit">
            Post Job
          </button>
        </form>
      </main>
    </>
  );
}
