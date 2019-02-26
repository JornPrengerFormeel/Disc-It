# Contribution
Want to contribute to the project?
Heres what you have to do first.

### prerequisites
We are using Javascript, html and css.
Used libraries for Javascript are:
- React.js
- Node.js

tutorials and documentation:
* Spotify API: https://developer.spotify.com/documentation/web-api/
* React.js: https://reactjs.org/
* JavaScript: https://javascript.info/

## Where to start?

Check out the [issues](https://github.com/JornPrengerFormeel/Disc-It/issues) page to see what you can help with, or open a new issue if you'd like to discuss a potential bug or suggest an improvement.

Also take a look at the [project](https://github.com/JornPrengerFormeel/Disc-It/projects) page to see the current status of the project with ongoing tasks and to-do lists, pick something you'd like to help with.

Finally, join our [Discord](https://discord.gg/jNTSf6P) to discuss the project with other contributers.

Have fun and thank you for any contribution you make. Remember, you don't have to be a genius to help!

## Using GitHub

https://www.atlassian.com/git/tutorials

Firstly, ensure you have git installed on your PC.

Essentially, contributing to the project has 3 steps:
  1. [Fork](https://help.github.com/en/articles/about-forks) and [clone](https://help.github.com/en/articles/cloning-a-repository) the repository
  2. Make changes in a new branch
  3. Merge changes from your branch into the original repository through a [pull request](https://help.github.com/en/articles/creating-a-pull-request)

If you are unfamiliar with these steps read [Understanding the GitHub flow](https://guides.github.com/introduction/flow/), [Forking Projects](https://guides.github.com/activities/forking/) and [Git Handbook](https://guides.github.com/introduction/git-handbook/).

### Making contributions
It's important to understand how [branches](https://www.atlassian.com/git/tutorials/using-branches) work. After cloning your remote repository to your PC you will be viewing the `master` branch. This branch should be treated as **production**, i.e. for tested fully-functioning code. You shouldn't push changes to `master`, instead, use the `develop` branch which has already been created. To do so, in the terminal run:

```bash
git fetch origin
git checkout develop
```

You should now be tracking the `develop` branch and any commits you make will be made to that branch and not `master`. However, it's best to create a seperate branch off `develop` for any new feature you work on.

```bash
git branch <branch-name>
```

Then switch to the new branch with `git checkout <branch_name>`. You can check your current branch by running `git branch`, the current branch will have an * next to it.

From this point you will commit any changes locally. To push those changes to your forked GitHub repository run

```
git push origin <branch-name>
````

where `branch-name` is the local branch you are working on.

To keep your fork up-to-date with the original see [configuring an upstream remote](https://help.github.com/en/articles/configuring-a-remote-for-a-fork) and [syncing a fork](https://help.github.com/en/articles/syncing-a-fork). The fork is your own hosted repository; any changes you push will not affect the parent repository. Read further below for how to use Pull Requests to itegrate your changes with the original project.

### Pull Requests

[Creating a Pull Request](https://help.github.com/en/articles/creating-a-pull-request)

To integrate your changes into the original repository you must open a Pull Request for the feature you would like to add. Remember to avoid making a Pull Request to the `master` branch. Your changes will be reviewed for any conflicts.

Please explain clearly what you have changed and why, preferably with reference to any issues that you have addressed.

See the [pull request template](./pull_request_template.md) as an example.

You may need to make further changes or your Pull Request may be rejected in favour of another solution or because the changes are incompatible.

Do not be discouraged if your Pull Request is not accepted, all contributions are welcome and considered, no matter how small!