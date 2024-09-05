#!/usr/bin/env bash

# Get CPU architecture.
arch=$(uname -m)
case "$arch" in
    x86_64) arch="amd64" ;;
    aarch64) arch="arm64" ;;
    *)
        echo "Unsupported CPU architecture: $arch"
        exit 1
        ;;
esac

# Get OS. Use it to determine asset needed.
os=$(uname -s)
case "$(uname -s)" in
    Darwin) asset_name="validator-darwin-$arch" ;;
    Linuxn) asset_name="validator-linux-$arch" ;;
    *)
        echo "Unsupported operating system: $os"
        exit 1
        ;;
esac

# Find latest release assets, filter out SBOMs, hashes, and filter to the one
# for the CPU architecture and OS.
curl -sLO $(curl -s https://api.github.com/repos/validator-labs/validatorctl/releases/latest \
  | grep -oP '"browser_download_url": "\K[^"]+' \
  | grep -v sha256 | grep $asset_name)
chmod +x $asset_name

dest="/usr/local/bin/validatorctl"
sudo mv $asset_name $dest
echo "Installed validatorctl to $dest."
