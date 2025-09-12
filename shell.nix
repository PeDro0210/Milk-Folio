{ pkgs, ... }:
{
  packages = with pkgs; [
    # svelte dev
    svelte-language-server
    nodejs
    node2nix
  ];
}
