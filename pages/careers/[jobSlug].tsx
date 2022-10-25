/* Job description page:
  gives a description of the job
  qualifications, ect.

  contains a quick submit application form at the bottom of the page
  */
import { useRouter } from "next/router";
import { jobs } from "../../lib/basicInfo";
import { dashedToCamel } from "../../lib/helper";

export default function JobPage() {
  const router = useRouter();
  const { jobSlug } = router.query;
  let job = jobs.empty;
  jobSlug && (job = jobs[dashedToCamel(jobSlug)]);

  return (
    <div>
      <h2>{job.title}</h2>
    </div>
  );
}
