Small script for querying SQS qeue messages and storing them in to json files

**work-in-progress**, thus no license yet

```bash
node ./getMessages <qeue_name>
```

queue messages are stored for closer inspection in the `message` folder.

Setup:

```bash
npm install
```

copy one of the templates in the `.private` folder and save it without the `template` prefix

 * `aws-profile.json`: use an aws-cli profile (i.e. `default`)
 * `aws-credentials.json`: *alternatively* store your accessKey and acessKeySecret here
