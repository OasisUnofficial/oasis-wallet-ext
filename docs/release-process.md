# Release Process

## Determine the New Version
Extension versions may not have suffixes like "-rc1".
We are incrementing patch versions to differentiate release candidate builds.

For example, the 1.0 release will start with a build at version 1.0.0.
Version 1.0.0 is, at first, a release candidate.
If changes are needed, we move to the next build at version 1.0.1.
Version 1.0.1 is also a release candidate at first.
If no changes are needed, 1.0.1 becomes the first public release of 1.0.

## Set the New Version Throughout
You must update:

- `package.json`
- `public/manifest.json`

## Add a Change Log Section
Here's the [Change Log](../CHANGELOG.md).

If there is an "Unreleased Changes" section, rename it to the new version.
Do not include a "v" prefix in the heading.

Add any other user-facing changes since the last release that aren't entered.
Suggested sections:

- Breaking changes
- New features
- Bug fixes
- Little things
- Documentation changes

Items may include a link to GitHub issues if there is a relevant one, e.g. in bug fixes.
We especially encourage linking externally reported issues.

If you feel like it, move one Change Log item to a section on top titled "Spotlight change".

## Propose the New Version
Commit the version changes and Change Log update with a message in the format
`Prepare release <VERSION>`, ideally separate from any other changes.

Open a pull request (PR) for the changes.

When this PR gets merged into `master`, the chosen version is permanently associated with the merge
commit.

## Prepare a Git Tag

Create a signed git tag for the new version and push it to the origin repository:

```sh
VERSION=`cat public/manifest.json | jq .version -r`
git tag --sign --message="Version $VERSION" v$VERSION
git push origin v$VERSION
```

## Prepare an Unsigned Archive
Clean the output directory, build, and package:

```sh
VERSION=`cat public/manifest.json | jq .version -r`
rm -rf dist/
yarn install --frozen-lockfile
yarn buildProd
zip -r oasis-wallet-$VERSION.zip dist/
```

Note: The zip file has no Git commit hash.

## Add a Pre-Release on GitHub
Create a tag and create a
[new release](https://github.com/oasisprotocol/oasis-wallet-ext/releases/new) on GitHub.

Enter `ROSE Wallet <VERSION> Release Candidate` for the title.

Our Change Log is a file under version control, so all we do is put the link in the description:

```md
See the [Change Log](CHANGELOG.md) for what's new in this release.

_Note: This is an internal release candidate._
```

Add the unsigned archive as an asset.

Check the box to indicate that this is a pre-release.

## Submit Package for Review

_This step is for our web store account admins._
_Contact an admin if you don't have access._

Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/),
browse to the _ROSE Wallet_ item,
select _Package_ in the side bar and
choose _Upload new package_.

## Update GitHub Pre-Release
Change the title:

```diff
-ROSE Wallet <VERSION> Release Candidate
+ROSE Wallet <VERSION>
```

Change the description:

```diff
-_Note: This is an internal release candidate._
+_NOTE: These are developer builds. To download the **official builds**, go to [Chrome Web Store](https://chrome.google.com/webstore/detail/oasis-wallet/ppdadbejkmjnefldpcdjhnkpbjkikoip)._
```

Uncheck the pre-release box.
