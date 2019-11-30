# Lesson-01 - Git and GitHub
Date: 28.11.2019

## Set up your Environment:
Register your name and email:
```
git config --global user.name <NAME>
git config --global user.email <EMAIL>
```

Display UTF-8 characters in filenames, if you're having problems seeing them\
`git config --global core.quotepath off`

Auto-converting CRLF line endings into LF when you add a file to the index for Windows users\
`git config --global core.autocrlf true`

When "true", git rejects irreversible conversions\
`git config --global safecrlf true`

To check what the values currently are\
`git config --list`

## Essential Commands:
`git init` - initiate git repository\
`git status` - check current status\
`git add <file name>` - add file to staging (Stage the file)
one can use `git add .` or `git add -A` to commit all the files in the folder.

`git reset <name>` - get file out of the staging area
`git commit -m <text>` - commit the changes in staging area, where `-m` stands for 'message' to indicate the purpose of the commit
*NB: try to write commit message in imperative present tense*

No worries if you realized that something is forgotten:\
`git commit --amend -m "new message"` - if you want to alter your commit message\
`git commit --amend --no-edit` - if you want to change commit without editing the message

## Branches and checkout command
`git branch` - see what branches are available\
`git checkout <branch>` - switch to a branch\
`git chechout -b <new_branch>` - create new branch based on current HEAD and switch to it\
`git checkout -b <new-branch> <existing-branch>` - same, but use existing branch instead of HEAD

## Logging changes
`git log` - see log of commits\
`git log --pretty=oneline` - print on one line\
Other `--pretty` options below:\
```
git log --pretty=oneline --max-count=2
git log --pretty=oneline --since='5 minutes ago'
git log --pretty=oneline --until='5 minutes ago'
git log --pretty=oneline --author=<your name>
git log --pretty=oneline --all
```
Put it all together:\
`git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short`

Where:
		`--pretty="..."` - defines the output format\
		`%h` - is the abbreviated hash of the commit\
		`%d` - commit decorations (e.g. branch heads or tags)\
		`%ad` - is the commit date\
		`%s` - is the comment\
		`%an` - is the name of the author\
		`--graph` - tells git to display the commit tree in the form of an ASCII graph layout\
		`--date=short` - keeps the date format short and nice\

`gitk` - cool command to track the changes visualy.

## What's the Difference
`git diff` - see the difference in unstaged and last commit\
`git diff --staged` - see the diff between staged and previous version
`git diff HEAD HEAD^` - diff between current commit and previous one

## Get Help
```
git help
git help push
```

## ((Still working on this one)) Clone project
```
	git clone git@github.com:UserName/RepoName.git
	git push origin master
```
