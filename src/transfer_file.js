({app_name, from_app, dry_run}) => {
  var CryptoJS = require("crypto-js");
  let docs_branch = env.get('docs_branch');
  var app = {
    "owner": "transposit-connectors",
    "repo": app_name,
    "branch": "master",
    "path": "README.md"
  };
  var docs = {
    "owner": "transposit",
    "repo": "www",
    "branch": docs_branch,
    "path": `src/apps/a/${app_name}.md`
  };

  var github_user = api.run('github.get_user_authenticated', {})[0];

  var app_blob = api.run("this.find_blob_object", { owner: app.owner, path: app.path, repo: app.repo, branch: app.branch })[0];
  var docs_blob = api.run("this.find_blob_object", { owner: docs.owner, path: docs.path, repo: docs.repo, branch: docs.branch })[0];
  
  var fm_content = api.run("sample_app_helper.generate_frontmatter_for_app", {sample_app_url: `https://console.transposit.com/t/transposit-sample/${app_name}`})[0].frontmatter;
  var fm = docs_blob ? api.run('front_matter_parser.parse', {"$body.content": docs_blob.content})[0]
    : {frontmatter: fm_content};

  let source_blob, target_sha, source, target;
  if (from_app) {
    var content = decode(app_blob.content);
    var match = content.match(/^\s*(# [^\n]*)\s*([\s\S]*)/);
    if (match) {
      app_blob.content = encode(`---\n${fm.frontmatter}\n---\n${match[2]}`);
    } else {
	  app_blob.content = encode(`---\n${fm.frontmatter}\n---\n${content}`);      
    }
    source_blob = app_blob;
    source = app;
    target = docs;
    target_sha = docs_blob ? docs_blob.sha : '';
  } else {
    docs_blob.content = encode(`# ${fm.attributes.title}\n\n${fm.body}`);
    source_blob = docs_blob;
    source = docs;
    target = app;
    target_sha = app_blob.sha;
  }

  // check to see that source file exists:
  if (source_blob == null) {
    return "Invalid source";
  }
  var userEmail = user_setting.get('committer_email');
  var commitEmail = userEmail ? userEmail : github_user.email;
  if (commitEmail == null) {
    return "Please set an email address: " + env.getBuiltin().appUrl;
  }
  var body = { committer: { name: github_user.login, email: commitEmail},
    message: `Copied from ${source.owner}/${source.repo} on branch ${source.branch}`,
    branch: target.branch,
    content: source_blob.content
  };

  let new_sha = compute_sha(source_blob);

  if (new_sha === target_sha) {
    if (dry_run) {
      return (`${app_name}: skipped commit since files are the same`);
    } else {
	  return `${app_name}: skipped commit since files are the same`;
    }
  }
  body["sha"] = target_sha;
  try {
    if (dry_run) {
      console.log(decode(body.content));
    } else {
      api.run("github.add_file_to_repo", { owner: target.owner, path: target.path, repo: target.repo, $body: body });      
    }
  } catch(e) {
    return e;
  }
  return `Copied from https://github.com/${source.owner}/${source.repo}/blob/${source.branch}/${source.path} to https://github.com/${target.owner}/${target.repo}/blob/${target.branch}/${target.path}`;

  function decode(content) {
    var parsedWordArray = CryptoJS.enc.Base64.parse(content.replace(/\n/g,""));
    var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    return parsedStr;
  }

  function encode(content) {
    var wordArray = CryptoJS.enc.Utf8.parse(content);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    return base64;
  }

  function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  }
  
  function compute_sha(content) {
    let decoded = decode(content.content);
    let header = `blob ${byteCount(decoded)}\0`;
    let store = header + decoded;
    return CryptoJS.SHA1(store).toString();
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */
