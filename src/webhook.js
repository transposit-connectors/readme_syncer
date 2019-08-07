/**
 * This operation is an example of a JavaScript operation deployed as a Webhook
 * and configured to work with Slack.
 *
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/building/webhooks
 */
({ http_event }) => {
  const parsed_body = http_event.parsed_body;
  const workspaceId = parsed_body.team_id;
  const userId = parsed_body.user_id;
  const response_url = parsed_body.response_url;

  setImmediate(() => {
    let user = api.user({type: "slack", workspaceId, userId});
    if (user) {
      console.log(user);
      var text_match = /(\S+) (\S+)/.exec(parsed_body.text.trim());
      if (text_match) {
		let message = api.run('this.transfer_file', { source_url: text_match[1], target_url: text_match[2], user: user })[0];
        api.run("slack_webhook.post_to_response_url", {
          response_url: response_url,
          post_body: {text: message}
        });      
      } else {
        api.run("slack_webhook.post_to_response_url", {
          response_url: response_url,
          post_body: {text: "Couldn't parse the source and target urls."}
        });      
      }
    } else {
      api.run("slack_webhook.post_to_response_url", {
        response_url: response_url,
        post_body: {text: 'Please configure your user at https://github-transfer-pkk36.transposit.io'}
      });      
    }
  });
  return { status_code: 200 };
}
