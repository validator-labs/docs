---
title: Download & Install
sidebar_position: 1
---

## MacOS & Linux

### Installing from release binaries

Download and install the latest release for your OS and CPU architecture from [GitHub Releases](https://github.com/validator-labs/validatorctl/releases).

You can use [this helper script](https://raw.githubusercontent.com/validator-labs/docs/main/scripts/get_validator.sh) to install the latest version of the binary to `/usr/local/bin/validatorctl`:

```shell
curl -L https://raw.githubusercontent.com/validator-labs/docs/main/scripts/get_validator.sh | bash
```

### Installing with `go install`

To install, run:

```shell
go install github.com/validator-labs/validatorctl@latest
```

:::note

The MacOS build is currently only available for arm64 and the Linux build is currently only available for amd64.

:::

## Windows

Download the latest Windows release from [GitHub Releases](https://github.com/validator-labs/validatorctl/releases/latest).

You can run these commands to download the latest version of the binary into the current directory.

```powershell
# Get the latest release information from GitHub API
$releaseInfo = Invoke-RestMethod -Uri 'https://api.github.com/repos/validator-labs/validatorctl/releases/latest'

# Extract the download URL for the Windows executable
$downloadUrl = "https://github.com/validator-labs/validatorctl/releases/download/$($releaseInfo.tag_name)/validator-windows-amd64"

# Download the latest release
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri $downloadUrl -OutFile validatorctl.exe
```

You can then move the binary to anywhere on your PATH.

:::note

The Windows build is only available for amd64.

:::
