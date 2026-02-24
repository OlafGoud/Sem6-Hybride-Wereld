

init
```
pio init
```


add script to platformio.ini
```
extra_scripts = pre:extra_script.py
```
file extra_script.py
```
import os
Import("env")

# include toolchain paths
env.Replace(COMPILATIONDB_INCLUDE_TOOLCHAIN=True)

# override compilation DB path
env.Replace(COMPILATIONDB_PATH=os.path.join("$BUILD_DIR", "compile_commands.json"))
```

compile
```
pio run -e uno -t compiledb
```

make link
```
ln -s .pio/build/uno/compile_commands.json compile_commands.json
```

verify
```
ls -l compile_commands.json
```

make `.vscode/settings.json`
```
{
  "clangd.arguments": [
    "--background-index",
    "--clang-tidy",
    "--completion-style=detailed",
    "--header-insertion=iwyu"
  ]
}
```

restart lanuage server `Ctrl + Shift + P` -> `clangd: Restart language server`.