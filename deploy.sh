git subtree push --prefix dist origin gh-pages
git push origin `git subtree split --prefix dist gh-pages`:production --force