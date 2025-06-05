# rules
## package install
Since the root directory of frontend components is `./src/frontend` and I use `pnpm`,
To install some package, you must execute `pushd frontend && pnpm add <some-package> && popd`.
If you need to execute `npx`, you must execute `pushd frontend && pnpm dlx  <some-exectuion> && popd` instead of it.