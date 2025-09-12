{

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    naersk.url = "github:nix-community/naersk";

  };
  outputs =
    {
      self,
      nixpkgs,
      naersk,
    }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          naerskLib = pkgs.callPackage naersk { };

          rust_base_lib = with pkgs; [
            dbus
          ];

          rust_std_bin = with pkgs; [
            cmake
            clang
            pkg-config
            cargo
            rustc
            rust-analyzer
            clippy
            rustfmt
            taplo-lsp # lsp for cargo.toml
          ];
        in
        {

          # setup for rust backend
          default = naerskLib.buildPackage {

            src = ./milk-backend/.;

            buildInputs = rust_base_lib;
            nativeBuildInputs = rust_std_bin;

            LD_LIBRARY_PATH = rust_base_lib;

            LIBCLANG_PATH = "${pkgs.llvmPackages_15.libclang.lib}/lib";
          };

        }
      );
    };
}
