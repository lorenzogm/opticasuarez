# Task 01: Create root editor and node config files

## Description
Create `.nvmrc`, `.npmrc`, and `.editorconfig` at the repository root.
These are simple config files with no dependencies on other tasks.

## Files to Create

### `.nvmrc`
```
22
```

### `.npmrc`
```
audit=false
auto-install-peers=true
engine-strict=true
fund=false
save=true
save-exact=true
```

### `.editorconfig`
```
root = true

[*]
charset = utf-8
indent_style = tab
indent_size = 2
end_of_line = lf
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true

[*.feature]
indent_size = 4

[*.yml]
indent_style = space
```

## Acceptance Criteria
- [ ] `.nvmrc` exists at root with content `22`
- [ ] `.npmrc` exists at root with pnpm settings
- [ ] `.editorconfig` exists at root matching web-starter
