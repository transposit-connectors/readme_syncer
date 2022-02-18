(params) => {
  var apps = [
    "calendar_placeholder",
    "algorithmia_demo",
    "aws_ecs_ecr_cleanup",
    "personalized_email",
    "cloudwatch_transform_logs",
    "github_transfer",
    "gitable",
    "birthday_reminders",
    "okta_signal",
    "athena_queries_to_slack",
    "applicant_tracker",
    "signal_raffle",
    "cleanup_aws_s3",
    "twilio_sendgrid_demo",
    "pridebot",
    "circleci_router",
    "cal_slack_status",
  ];
  return apps.map((a) => {
    return {
      name: a,
    };
  });
};

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
