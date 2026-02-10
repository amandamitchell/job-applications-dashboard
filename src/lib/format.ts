import {
  CompType,
  EmploymentType,
  EventType,
  InterviewType,
  LocationType,
  ResumeVersion,
  SearchSource,
  Status,
} from "@/generated/prisma/enums";

export function dateToFormField(date: Date | null | undefined): string {
  if (!date) date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export function formFieldToDate(formInput: string | null | undefined): Date {
  const date = new Date();
  if (formInput) {
    const formParts = formInput.split("-");
    date.setFullYear(parseInt(formParts[0]));
    date.setMonth(parseInt(formParts[1]) - 1);
    date.setDate(parseInt(formParts[2]));
  }
  return date;
}

export function formatRecruiterInfo({
  recruiter,
  recruitingCo,
}: {
  recruiter?: string | null;
  recruitingCo?: string | null;
}) {
  if (recruiter && recruitingCo) return `${recruiter} at ${recruitingCo}`;
  if (!recruiter && recruitingCo) return recruitingCo;
  if (recruiter && !recruitingCo) return recruiter;
  return null;
}

export function employmentTypeLabel(employmentType: EmploymentType) {
  switch (employmentType) {
    case EmploymentType.CONTRACT:
      return "Contract";
    case EmploymentType.FTE:
      return "Full Time";
    default:
      return "";
  }
}

export function locationTypeLabel(locationType: LocationType) {
  switch (locationType) {
    case LocationType.HYBRID:
      return "Hybrid";
    case LocationType.ONSITE:
      return "On-Site";
    case LocationType.REMOTE:
      return "Remote";
    default:
      return "";
  }
}

export function compTypeLabel(compType: CompType) {
  switch (compType) {
    case CompType.HOURLY:
      return "Hourly";
    case CompType.YEARLY:
      return "Yearly";
    default:
      return "";
  }
}

export function statusLabel(status: Status) {
  switch (status) {
    case Status.ACCEPTED:
      return "Offer Accepted";
    case Status.APPLIED:
      return "Application Submitted";
    case Status.AUTO_REJECTED:
      return "Auto Rejected";
    case Status.CLOSED:
      return "Position Closed";
    case Status.GHOSTED:
      return "Ghosted";
    case Status.INTERVIEWING:
      return "Interviewing";
    case Status.OFFERED:
      return "Received Offer";
    case Status.RECRUITER_CONVO:
      return "Recruiter Conversation";
    case Status.RECRUITER_SUBMIT:
      return "Applied via Recruiter";
    case Status.REJECTED:
      return "Rejected";
    case Status.WITHDRAWN:
      return "Withdrawn";
    default:
      return "";
  }
}

export function eventTypeLabel(eventType: EventType) {
  switch (eventType) {
    case EventType.APPLICATION:
      return "Applied";
    case EventType.AUTO_REJECTION:
      return "Auto Rejection";
    case EventType.FOLLOW_UP:
      return "Follow Up (Them)";
    case EventType.FOLLOW_UP_SELF:
      return "Follow Up (Me)";
    case EventType.INTERVIEW:
      return "Interview";
    case EventType.OFFER:
      return "Offer";
    case EventType.RECRUITER:
      return "Recruiter Contact";
    case EventType.REJECTION:
      return "Rejection";
    case EventType.SCHEDULE_REQUEST:
      return "Schedule Request";
    case EventType.WITHDRAWAL:
      return "Withdrawal";
    default:
      return "";
  }
}

export function interviewTypeLabel(interviewType: InterviewType) {
  switch (interviewType) {
    case InterviewType.AUTO_CODE:
      return "Automated Code Test";
    case InterviewType.LIVE_CODE:
      return "Live Code Test";
    case InterviewType.MANAGER:
      return "Hiring / Engineering Manager";
    case InterviewType.PRODUCT:
      return "Product / UX Design";
    case InterviewType.RECRUITER:
      return "Recruiter / HR";
    case InterviewType.TAKE_HOME:
      return "Take Home Assessment";
    case InterviewType.TECH:
      return "Tech Discussion";
    default:
      return "";
  }
}

export function searchSourceLabel(searchSource: SearchSource) {
  switch (searchSource) {
    case SearchSource.BUILTIN:
      return "Built In";
    case SearchSource.HIRINGCAFE:
      return "Hiring Cafe";
    case SearchSource.INDEED:
      return "Indeed";
    case SearchSource.INTERNAL:
      return "Internal";
    case SearchSource.LINKEDIN:
      return "LinkedIn";
    case SearchSource.RECRUITER:
      return "via Recruiter";
    case SearchSource.REFERRAL:
      return "via Referral";
    default:
      return "";
  }
}

export function resumeVersionLabel(resumeVersion: ResumeVersion) {
  switch (resumeVersion) {
    case ResumeVersion.ECOMM_2:
      return "E-commerce 2";
    case ResumeVersion.ECOMM_3:
      return "E-commerce 3";
    case ResumeVersion.FRONTEND_2:
      return "Frontend 2";
    case ResumeVersion.FRONTEND_3:
      return "Frontend 3";
    case ResumeVersion.FULLSTACK_2:
      return "Fullstack 2";
    case ResumeVersion.FULLSTACK_3:
      return "Fullstack 3";
    default:
      return "";
  }
}
