# GitHub file copy via Slack slash command

Transposit is an excellent tool to create operations that modularize frequently-used API calls in many apps. In addition, it's very simple to create a Slack command in Transposit that automates a common task. This app demonstrates combining these two features into a single Slack command that copies a GitHub file from one repo to another (or to another path in the same repo, or to another branch).

## Step through Transposit

  * Fork the app [https://console.transposit.com/t/transposit-sample/github_transfer](https://console.transposit.com/t/transposit-sample/github_transfer) (find the Fork button at the top of the editor view)

## Set up Slack

  * Go to your Slack apps and create a new app.
  * Select Slash Commands from the list of Slack features. Create a new command named `/github-transfer`.
  * Go back to Transposit to get the Request URL. Go to **Deploy > Endpoints** and copy the webhook URL. Paste it into the Slack command's **Request URL** field. Give it a short description and usage hint if desired.
  * Save your command.
  * Click **Install App** in the sidebar to install it into your workspace.
  * Test the app in Slack by typing `/github-transfer`. You should receive the "Please configure your user" message.

## Do more!

  * Try deploying the `transfer_file` operation for use in another connector!
