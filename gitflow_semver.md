# Workflow with Semver

## Branching Model

- `main`: This is the main branch where the stable code is located.
- `develop`: This branch is our free version and not stable, it receives changes from the `feat` and `fix` branch

- `feat`: These branches are used to add different features and merge with the `develop` branch.

- `fix`: These branches are used to fix bugs found in the `develop` branch and merged with it.

- `release`: These branches are created when the code reaches stable development, with various features and bug fixes, and is merged with the `develop` and `main` branch, always with documentation and changing the version.

## Branching Naming Model

#### Main

`main`

### Develop

`develop`

### Feature

`feat/feat-name`

### Bugfix

`fix/fix-name`

### Release

`release/a.b.c` (a.b.c is a version from semver)

## Workflow

### Feature Development

To start developing you must create a branch from `develop`.

```sh
git checkout -b feat/name-of-feature
```

When you finish adding the features a push should be made to the repository.

```sh
git push origin feat/name-of-feature
```

When finished, make a pull request from the created branch to the `develop` branch. It must be reviewed and approved by the other members of the team to be able to merge.

### Bugfix Development

To start developing you must create a branch from `develop`.

```sh
git checkout -b fix/bug-name
```

When you finish fixed the bugs a push should be made to the repository.

```sh
git push origin fix/bug-name
```

When finished, make a pull request from the created branch to the `develop` branch. It must be reviewed and approved by the other members of the team to be able to merge.

### Release Develoment

When the `develop` branch has enough features and/or bug fixes for a new `release`, a new branch should be created.

```sh
git checkout -b release/a.b.c
```

Once the release branch is ready, a tag must be created that references the latest commit with the updated version.

```sh
git tag -a 1.1.0 -m "version 1.1.0"
```

Push the branch and tag to the repository to merge this branch with main and develop.

```sh
git push origin release/1.1.0
git push origin release/1.1.0 --tags
```

When the release branch is ready, a pull request must be created for `main` and another for `develop`. Then all team members must review to be able to merge.

## Semver

Semver is a version control scheme for software that is used to determine changes to software.

The version format is `MAJOR.MINOR.PATCH`.

- MAJOR version when we make incompatible or breaking changes.
- MINOR version when we add functionality in a backward-compatible manner.
- PATCH version when we make backward-compatible bug fixes.

For any version prior to `1.0.0`, the code is unstable and changes can be made that break compatibility with previous versions.

That's why you start with `0.1.0` and change the MAJOR number to `1.0.0` when you have a stable version.
